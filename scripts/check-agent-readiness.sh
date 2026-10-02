#!/usr/bin/env bash
# Post-deploy verification for the agent-readiness work (docs/agent-readiness.md).
# Usage: bash scripts/check-agent-readiness.sh [https://mzahran.tech]

set -u
BASE="${1:-https://mzahran.tech}"
fail=0

check() { # check <label> <expected-fragment> <actual>
  if [[ "$3" == *"$2"* ]]; then
    echo "PASS  $1"
  else
    echo "FAIL  $1"
    echo "      expected fragment: $2"
    echo "      got: ${3:0:300}"
    fail=1
  fi
}

echo "== Link headers on homepage =="
hdrs=$(curl -sSI "$BASE/")
check "Link: api-catalog"  'rel="api-catalog"'  "$hdrs"
check "Link: service-desc" 'rel="service-desc"' "$hdrs"
check "Link: service-doc"  'rel="service-doc"'  "$hdrs"
check "Link: describedby"  'rel="describedby"'  "$hdrs"

echo "== Content Signals in robots.txt =="
check "Content-Signal directive" "Content-Signal:" "$(curl -sS "$BASE/robots.txt")"

echo "== Well-known endpoints =="
code=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/.well-known/api-catalog")
check "api-catalog status" "200" "$code"
api_ct=$(curl -sSI "$BASE/.well-known/api-catalog" | tr -d '\r' | tr '[:upper:]' '[:lower:]' | grep -i '^content-type:')
check "api-catalog content-type" "application/linkset+json" "$api_ct"
check "api-catalog linkset body" '"linkset"' "$(curl -sS "$BASE/.well-known/api-catalog")"

for path in .well-known/mcp/server-card.json .well-known/agent-skills/index.json .well-known/ai-catalog.json auth.md; do
  code=$(curl -sS -o /dev/null -w '%{http_code}' "$BASE/$path")
  check "$path returns 200" "200" "$code"
done

ard=$(curl -sSI "$BASE/.well-known/ai-catalog.json" | tr -d '\r' | tr '[:upper:]' '[:lower:]')
check "ai-catalog CORS" "access-control-allow-origin: *" "$(echo "$ard" | grep 'access-control-allow-origin' || echo MISSING)"

echo "== Markdown for Agents =="
md=$(curl -sS -D - -o /dev/null -H "Accept: text/markdown" "$BASE/" | tr -d '\r')
check "text/markdown on Accept" "text/markdown" "$(echo "$md" | grep -i '^content-type:' || echo MISSING)"
html=$(curl -sS -D - -o /dev/null "$BASE/" | tr -d '\r' | grep -i '^content-type:')
check "HTML stays default" "text/html" "$html"

echo "== Skill digests match published artifacts =="
# Hash the LIVE artifacts (local working copies may be CRLF on Windows).
idx=$(curl -sS "$BASE/.well-known/agent-skills/index.json")
for s in mzahran-profile mzahran-resume mzahran-projects; do
  live_hash=$(curl -sS "$BASE/.well-known/agent-skills/$s/SKILL.md" | sha256sum | cut -d' ' -f1)
  check "$s digest" "sha256:$live_hash" "$idx"
done

echo
if [ "$fail" -eq 0 ]; then
  echo "All local checks passed. Now run the isitagentready scan:"
  echo "  curl -X POST https://isitagentready.com/api/scan -H 'Content-Type: application/json' -d '{\"url\": \"$BASE\"}'"
else
  echo "Some checks failed — see above. (If Link/CORS/markdown headers fail, the server may have its own .htaccess: merge public/.htaccess into it.)"
fi
exit $fail

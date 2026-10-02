# Agent readiness (isitagentready.com fixes)

What was implemented for each audit finding, and what can only be done
outside the repo. Verify after deploy: `bash scripts/check-agent-readiness.sh`.

## In-repo (auto-deploys to Hostinger with the next push)

| Audit finding | Fix | Files |
|---|---|---|
| Link response headers (RFC 8288) | `Link:` header with `api-catalog`, `service-desc`, `service-doc`, `describedby` relations, set on every response; plus HTML `<link>` equivalents in `<head>` | `public/.htaccess`, `index.html` |
| Content Signals in robots.txt | `Content-Signal: ai-train=yes, search=yes, ai-input=yes` (matches the site's welcome-all-AI-crawlers policy; flip to `no` if preferences change) | `public/robots.txt` |
| API Catalog (RFC 9727) | `/.well-known/api-catalog` linkset document; served as `application/linkset+json` via `ForceType` | `public/.well-known/api-catalog`, `public/.htaccess` |
| MCP Server Card | `/.well-known/mcp/server-card.json` describing the site's WebMCP tools (no network MCP endpoint exists; transport is `webmcp` in-browser) | `public/.well-known/mcp/server-card.json` |
| Agent Skills index | `/.well-known/agent-skills/index.json` with three `skill-md` entries; `sha256` digests match the published SKILL.md files | `public/.well-known/agent-skills/` |
| ARD manifest | `/.well-known/ai-catalog.json` with `specVersion`, `host` (did:web), 5 entries with `urn:air:` identifiers and `representativeQueries`; served with `Access-Control-Allow-Origin: *` | `public/.well-known/ai-catalog.json`, `public/.htaccess` |
| auth.md | `/auth.md` declaring fully public access — no registration, credentials, or OAuth. `/.well-known/oauth-authorization-server`, `/.well-known/openid-configuration`, and `/.well-known/oauth-protected-resource` are intentionally NOT published: the site has no protected APIs and issues no tokens, so that metadata would be false | `public/auth.md` |
| Markdown for Agents | `Accept: text/markdown` on `/` rewrites to `llms.txt` served as `Content-Type: text/markdown` with `x-markdown-tokens`; browsers still get HTML | `public/.htaccess` |
| WebMCP | Five tools (`get-profile`, `get-experience`, `list-projects`, `get-resume`, `get-contact`) registered via `document.modelContext.registerTool()` (falls back to `navigator.modelContext`) on page load; inert where the API is absent | `src/webmcp.js`, `src/main.jsx` |

## Outside the repo (manual)

### DNS-AID — see `docs/dns-aid.md`

Add the `_index._agents` HTTPS/SVCB record in the Hostinger DNS zone and
enable DNSSEC. Cannot be done from code.

### If headers still don't appear after deploy

If `public_html` on the Hostinger server already contains an `.htaccess`
managed from hPanel (common: HTTPS redirects, PHP defaults), Hostinger's
deploy may leave it in place alongside — or overwrite — the repo's copy. If
the verification script reports missing `Link`/CORS/markdown headers, merge
the directives from `public/.htaccess` into the server-side file via hPanel's
File Manager.

## Digest maintenance

`/.well-known/agent-skills/index.json` pins `sha256` digests of the three
SKILL.md artifacts. If you edit a SKILL.md, regenerate its digest:

```sh
sha256sum public/.well-known/agent-skills/mzahran-profile/SKILL.md
# put "sha256:<hash>" into index.json
```

`x-markdown-tokens` in `.htaccess` is an approximation (llms.txt chars / 4);
update it when llms.txt changes materially.

# auth.md — Agent authentication for mzahran.tech

This site is fully public. AI agents do **not** need to register, obtain
credentials, or authenticate to access any resource on mzahran.tech.

## Who this site is for

Autonomous agents, assistants, and crawlers that want to answer questions
about Mohamed Zahran (frontend engineer at RICOH Europe), fetch his resume,
or retrieve his contact details.

## Authentication requirements

- Registration endpoint: none
- Supported methods: none (anonymous access)
- Credential types: none
- Scopes: none — every resource below is publicly readable over HTTPS

## Public resources

- Machine-readable profile: https://mzahran.tech/agents.json
- Site summary for LLMs: https://mzahran.tech/llms.txt
- Resume (PDF): https://mzahran.tech/resume.pdf
- Agent skills index: https://mzahran.tech/.well-known/agent-skills/index.json
- MCP server card (WebMCP tools): https://mzahran.tech/.well-known/mcp/server-card.json
- API catalog (RFC 9727): https://mzahran.tech/.well-known/api-catalog
- ARD manifest: https://mzahran.tech/.well-known/ai-catalog.json

## Notes

- Content usage preferences are declared in
  https://mzahran.tech/robots.txt via `Content-Signal` (ai-train=yes,
  search=yes, ai-input=yes).
- The in-browser WebMCP tools require no credentials; they run client-side
  when the site is open in a WebMCP-capable browser.
- For anything beyond public data (partnerships, private work samples),
  email info@mzahran.tech.

There is intentionally no `/.well-known/oauth-authorization-server` or
`/.well-known/oauth-protected-resource` metadata: this site exposes no
protected APIs and issues no tokens.

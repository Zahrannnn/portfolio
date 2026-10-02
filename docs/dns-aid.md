# DNS-AID — DNS-based agent discovery for mzahran.tech

This cannot be published from the repo: it requires DNS records in the
Hostinger zone for **mzahran.tech**. Until these exist, the isitagentready
"DNS for AI Discovery (DNS-AID)" check keeps failing.

Reference: draft-mozleywilliams-dnsop-dnsaid, RFC 9460 (SVCB/HTTPS).

## Records to add (hPanel → Domains → DNS / Nameservers)

| Type | Name | Value |
|------|------|-------|
| HTTPS | `_index._agents` | `1 mzahran.tech. alpn="h2,h3"` |
| SVCB | `_a2a._agents` | `1 mzahran.tech. alpn="a2a" port=443 mandatory=alpn,port` |

Notes:

- In hPanel, enter the name without the domain suffix: `_index._agents` and
  `_a2a._agents`. TTL 3600 is fine.
- **Hostinger's DNS editor does not support these record types.** As of
  October 2026 it only offers A, MX, AAAA, CNAME, SRV, and TXT — no SVCB or
  HTTPS records. To publish DNS-AID, move DNS to a provider that supports
  them (Cloudflare supports HTTPS/SVCB records on the free plan, as do deSEC,
  PowerDNS, and BIND) and point mzahran.tech's nameservers there. Keep the
  existing A/CNAME/MX records replicated at the new provider before
  switching.
- The `_a2a` record advertises an A2A agent endpoint. The portfolio does not
  currently run an A2A server — only add that record once one exists, or
  point `alpn` at the capability you actually operate. The `_index` record
  alone satisfies the discovery entrypoint check.

## DNSSEC

Validating resolvers must receive authenticated data:

1. hPanel → Domains → mzahran.tech → **DNSSEC** → enable. Hostinger signs the
   zone and shows the DS record.
2. If the domain is registered at another registrar, copy the DS record into
   that registrar's DNSSEC settings to complete the chain of trust.
3. Verify with: `dig +dnssec _index._agents.mzahran.tech HTTPS @1.1.1.1`
   (look for the `ad` flag in the response).

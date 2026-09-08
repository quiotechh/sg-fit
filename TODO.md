# TODO

## Rate limiting (deferred — low priority pre-launch)

**What:** No route in the app currently limits how many times a user/IP can
hit it per second/minute. No middleware, no per-route throttling anywhere.

**Where it matters most, if it ever becomes a problem:**
- `addComment` / `toggleLike` (community) — spam flooding
- `/api/checkout/paystack`, `/api/community/subscribe` — repeated hits load
  Paystack's API unnecessarily, could trigger Paystack-side rate limits that
  affect real customers too
- Login (`/api/auth/[...all]`) — automated credential-stuffing bots scan
  every website indiscriminately, not just "interesting" targets
- `getUploadUrl` — repeated calls generate many unused presigned URLs

**Why deferred:** Small pre-launch app, not a high-value target. Not worth
the complexity/cost right now.

**When to revisit:** After launch, if real abuse is observed (spam posts,
suspicious login attempt volume in the audit log, etc.), or simply as a
proactive hardening pass once traffic is real.

**How to implement when the time comes:**
1. Cheapest first step: enable Cloudflare's free Bot Fight Mode / rate
   limiting rules at the dashboard level (zero code) — but this only works
   once the site's actual domain DNS is proxied through Cloudflare (separate
   from the R2 bucket, which doesn't require this).
2. If more control is needed: `@upstash/ratelimit` (Redis-based, free tier)
   applied to the specific sensitive routes listed above.

### Step-by-step: putting the domain on Cloudflare + enabling protection

Do this once a real domain is bought and hosting (Railway or otherwise) is finalized.

1. **Log into Cloudflare** (same account already used for R2) → dashboard → **"Add a Site"**.
2. Type the domain (e.g. `sgfitwellness.com`) → choose the **Free plan**.
3. Cloudflare scans existing DNS records automatically → review them → continue.
4. Cloudflare shows **two nameservers** (e.g. `xxx.ns.cloudflare.com`) — go to
   wherever the domain was bought (registrar) → find "Nameservers" / "DNS
   settings" → replace the existing nameservers with Cloudflare's two.
5. Wait for activation — Cloudflare emails when the domain is active (can take
   a few minutes to a few hours, rarely up to 24h).
6. Once active → **DNS tab** in Cloudflare → add/edit the record pointing to
   the host:
   - For Railway: add a **CNAME** record with the value Railway gives under
     its project's **Custom Domain** settings.
   - Make sure the little cloud icon next to the record is **orange
     (Proxied)**, not grey (DNS only) — grey means traffic bypasses
     Cloudflare entirely and none of the protection below applies.
7. **Enable Bot Fight Mode:** Security tab → Bots → turn on **"Bot Fight
   Mode"** (free).
8. **Optional — rate limiting rules:** Security → WAF → Rate limiting rules →
   create a rule, e.g. "more than 20 requests/minute from one IP to
   `/api/auth/*`" → action: Block or Challenge. Free plan allows a limited
   number of custom rules — check the current quota when setting this up,
   since Cloudflare's free-tier limits change over time.

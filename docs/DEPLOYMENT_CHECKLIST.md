# Deployment Checklist

Two Railway services: **backend** (Spring Boot, JDK 17, Nixpacks) and **frontend** (Vite static build, `npx serve`). Custom domain `vectorweave.com` (GoDaddy).

## Architecture
```
GoDaddy DNS ──► Railway frontend (serve dist)
                     │  VITE_BACKEND_URL
                     ▼
                Railway backend (Spring Boot)
                     │  JDBC
                     ▼
                Supabase Postgres + Supabase Auth (JWT)
```

## 🔴 Do first (security)
- [ ] **Rotate the Supabase DB password** — it is committed in `database/RLS_SETUP_GUIDE.md` (plaintext). Remove it from the file and from git history.
- [ ] Audit git history for any other committed secrets (`.env`, Stripe keys, JWT secret).
- [ ] Confirm `.env` files are gitignored.

## Backend deployment

### Build/run config (present)
- `backend/railway.json` → Nixpacks builder, start `java -Xmx512m -Xms256m -jar build/libs/*.jar`.
- `backend/nixpacks.toml` → JDK 17, `./gradlew bootJar --no-daemon -x test`.

### Required environment variables (backend)
| Var | Used by | Notes |
|-----|---------|-------|
| `SUPABASE_URL` | `application.properties` datasource URL | JDBC URL (dev profile) |
| `SUPABASE_USERNAME` | datasource | Postgres user |
| `SUPABASE_PASSWORD` | datasource | **rotate!** |
| `DATABASE_URL` | `application-prod.properties` | If using prod profile (`jdbc:${DATABASE_URL}`) |
| `SUPABASE_JWT_SECRET` | `SupabaseJwtValidator` | **Required or app fails to boot** |
| `STRIPE_SECRET_KEY` | `StripeService.init()` | ⚠️ **App currently fails to boot if empty** — fix to lazy-init (see below) |
| `STRIPE_WEBHOOK_SECRET` | `StripeController` | Only when payments enabled |
| `PORT` | server | Railway injects |
| `FRONTEND_URL` / `cors.allowed.origins` | `SecurityConfig` CORS | Set to the deployed frontend origin(s), comma-separated |
| `SPRING_PROFILES_ACTIVE` | profile select | Set `prod` if using `application-prod.properties` |

### ⚠️ Boot blockers to fix before deploy
1. **Stripe key coupling** — make `StripeService.init()` not throw when key is empty (see `BACKEND_IMPLEMENTATION_STATUS.md` §5). Otherwise backend won't start for internal-only v1.
2. **Profile / datasource mismatch** — dev uses `SUPABASE_URL` as the JDBC URL; prod uses `DATABASE_URL`. Decide which profile Railway runs and set the matching vars. Don't set both half-way.
3. **CORS** — remove hardcoded `@CrossOrigin("localhost:5173")` on `CustomerController`/`ManagerController` or the deployed frontend origin will be blocked. Rely on `cors.allowed.origins`.

### Health check
- `GET /api/test/**`, `/api/customers/test`, `/api/orders/test` are public — use one as the Railway healthcheck path.

## Frontend deployment

### Required environment variables (frontend, build-time `VITE_`)
| Var | Notes |
|-----|-------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `VITE_BACKEND_URL` | Deployed backend base URL (e.g. `https://api.vectorweave.com`) |

- Build: `npm run build` (tsc + vite). Serve: `npx serve dist -s -l $PORT` (script exists in `frontend/package.json`).
- Remove the `/test` `ConnectionTest` route before prod.

## Database (Supabase)
- [ ] Confirm which connection the backend uses (session vs transaction pooler). For Railway, the **Supabase pooler** host is usually required.
- [ ] `ddl-auto=update` will create tables on first boot — verify tables appear.
- [ ] Apply **real** RLS SQL (the referenced `setup_rls.sql` is missing; table names in the guide are wrong — see `DATABASE_SCHEMA_ANALYSIS.md`).
- [ ] Add unique constraints/indexes on Supabase mappings.
- [ ] Seed standard backbones (after backbone model exists).

## Domain / DNS (GoDaddy → Railway)
Current symptom: `vectorweave.com` shows "parked free, courtesy of GoDaddy" → **DNS not pointing to Railway / parking not removed**.

Steps:
1. In Railway → frontend service → **Settings → Networking → Custom Domain** → add `www.vectorweave.com`. Railway shows a CNAME target (e.g. `xxxx.up.railway.app`) and may show a TXT verify record.
2. In GoDaddy DNS:
   - [ ] **Remove domain Forwarding/Parking** (Products → Domain → Forwarding → delete). Parking overrides DNS.
   - [ ] Add **CNAME** `www` → the Railway target.
   - [ ] Add the **TXT** `_railway-verify` record if Railway provides one.
   - [ ] Root domain: GoDaddy rejects CNAME on `@`. Either use **Forwarding `vectorweave.com` → `https://www.vectorweave.com` (301)**, or set an A record only if Railway gives an IP (it usually gives CNAME, so prefer www + root-forward).
3. In Railway, add both `www.vectorweave.com` and (if forwarding) verify the apex resolves. Wait for verification + SSL issuance.
4. Set frontend `VITE_BACKEND_URL` and backend `cors.allowed.origins` to the final domain(s).
5. Propagation: 5–30 min typical (up to 48h). Verify with `nslookup www.vectorweave.com`.

## Pre-launch verification
- [ ] Backend boots (no Stripe/JWT startup crash); healthcheck green.
- [ ] Sign up → customer row created → sign in → `/profile` loads.
- [ ] Create order → appears in `/orders` (real data, not zeros once wired).
- [ ] Cross-user access returns 403.
- [ ] Custom domain resolves with valid HTTPS; no CORS errors in console.
- [ ] `/test` route + `ConnectionTest` removed.

## Monitoring & logging
- Set `spring.jpa.show-sql=false` in prod (already in prod profile).
- Use Railway logs; consider adding request logging + an error tracker (e.g. Sentry) for beta.
- Set restart policy (already `ON_FAILURE`, 10 retries).

## Effort estimate
- Secret rotation + CORS + Stripe lazy-init: ~0.5 day
- Profile/datasource alignment + DB verify: ~0.5 day
- DNS cutover: ~1–2 hours active + propagation wait
- RLS + indexes: ~0.5 day

**Risk: MEDIUM–HIGH** — the boot blockers (Stripe key, CORS, datasource profile) and DNS are the most likely to stall the launch.

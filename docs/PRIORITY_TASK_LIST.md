# Priority Task List (2-Week Beta)

Goal: **end-to-end ordering live on `vectorweave.com`**, beta users can sign up, build orders, see their history, and the owner can view/process all orders. Payments stay internal (no Stripe for beta).

Legend — Effort: S(≤2h) M(≤1d) L(1–2d). Risk: 🟢 low / 🟡 med / 🔴 high.

---

## P0 — Critical path (blocks launch)

| # | Task | Effort | Risk | Depends on | Files |
|---|------|--------|------|-----------|-------|
| 1 | **Rotate leaked Supabase DB password**; scrub `RLS_SETUP_GUIDE.md` + git history | S | 🔴 | — | `database/RLS_SETUP_GUIDE.md` |
| 2 | **Stripe lazy-init** so backend boots without key | S | 🔴 | — | `service/StripeService.java` |
| 3 | **Fix CORS**: remove hardcoded `@CrossOrigin`, use `cors.allowed.origins` | S | 🟡 | — | `controller/CustomerController.java`, `ManagerController.java` |
| 4 | **Align datasource profile** (dev `SUPABASE_URL` vs prod `DATABASE_URL`); set Railway envs | M | 🔴 | — | `application*.properties` |
| 5 | **Deploy backend to Railway**; healthcheck green | M | 🟡 | 2,3,4 | `railway.json`, `nixpacks.toml` |
| 6 | **Deploy frontend to Railway**; set `VITE_*` | M | 🟡 | 5 | `frontend/package.json` |
| 7 | **GoDaddy DNS cutover** (remove parking, CNAME www, verify, SSL) | M | 🔴 | 5,6 | — |
| 8 | **Persist user backbones** (entity + `POST /api/customers/backbones/{id}` + wire `submitBackboneUpload`) | L | 🔴 | — | `CustomerService`, `useOrderForm.ts` |
| 9 | **Server-side price + DNA validation** on `POST /api/orders` (don't trust client price) | M | 🔴 | — | `OrderService.java` |
| 10 | **ensureCustomer bootstrap** on login (avoid orphaned Supabase users) | M | 🟡 | — | `AuthPage.tsx`, `lib/customer.ts` |

## P1 — High priority (beta feature-complete)

| # | Task | Effort | Risk | Depends on | Files |
|---|------|--------|------|-----------|-------|
| 11 | **Order detail endpoint** `GET /api/orders/detail/{orderId}` (fragments/mutations/backbone) | M | 🟡 | — | `OrderController`, `OrderService` |
| 12 | **Order detail page** `/orders/:id` + wire "View" button | M | 🟢 | 11 | `OrdersListPage.tsx`, new `OrderDetailPage.tsx` |
| 13 | **Profile dashboard real data** (counts, spent, recent) | M | 🟢 | — | `ProfilePage.tsx` |
| 14 | **Admin/owner endpoints** (list all orders, detail, status update) + **Manager role guard** | L | 🟡 | — | `ManagerController`, `ManagerService`, `SecurityConfig` |
| 15 | **Admin/owner page** `/admin` (guarded) — list + filter + status controls | L | 🟡 | 14 | new `AdminPage.tsx` |
| 16 | **Expand OrderStatus** enum (add Cancelled/On-Hold) + UI badges | M | 🟢 | 14 | `model/Order.java`, `OrdersListPage.tsx` |
| 17 | **ProtectedRoute wrapper** + wrap authed routes; manager guard for `/admin` | M | 🟢 | — | new `ProtectedRoute.tsx`, `App.tsx` |
| 18 | **PDF order summary** (client-side jsPDF) + download button | M | 🟢 | 11,12 | new util, `OrderDetailPage.tsx` |
| 19 | **Internal processing export** (JSON/CSV) from admin page (Phase 1 manual) | M | 🟡 | 14 | `ManagerController` |
| 20 | **Apply real RLS + indexes** (correct table names) | M | 🟡 | 4 | new `database/setup_rls.sql` |

## P2 — Medium (polish / UX)

| # | Task | Effort | Risk | Depends on |
|---|------|--------|------|-----------|
| 21 | Design-system token layer + Tailwind mapping + primitives | L | 🟡 | — |
| 22 | Refactor Header/Footer + critical authed pages to tokens | L | 🟡 | 21 |
| 23 | Landing: remove image box; keep hero art + scalloped edges; restyle | M | 🟢 | 21 |
| 24 | Refactor marketing/content pages (services, FAQ, contact, how-to) | L | 🟢 | 21 |
| 25 | Style 404; remove `/test` `ConnectionTest` | S | 🟢 | — |
| 26 | Forgot-password + remember-me (real) | M | 🟢 | — |

## P3 — Low / future

| # | Task | Effort |
|---|------|--------|
| 27 | Enable Stripe payments (keys, webhook, price-unit fix) | L |
| 28 | Real-time processing integration (poll/queue/callback) | L |
| 29 | Email notifications (order status) | M |
| 30 | Automated tests (see `TESTING_STRATEGY.md`) | L |
| 31 | Migrate `ddl-auto` → Flyway/Liquibase | M |
| 32 | Address CRUD + delivery on profile | M |

---

## Suggested 2-week sequence

**Week 1 — get it live + data integrity**
- Days 1–2: P0 #1–4 (security, boot blockers, config).
- Day 3: P0 #5–7 (deploy backend/frontend, DNS cutover).
- Days 4–5: P0 #8–10 (backbone persistence, server validation, ensureCustomer).

**Week 2 — feature-complete beta + owner workflow**
- Days 6–7: P1 #11–13 (order detail + profile data).
- Days 8–9: P1 #14–17 (admin endpoints + page, role guard, ProtectedRoute, status).
- Day 10: P1 #18–20 (PDF, export, RLS) + buffer.
- Ongoing/parallel: P2 styling as time permits (do **not** let it block functional beta).

## Dependency graph (key)
```
1,2,3,4 ─► 5 ─► 6 ─► 7            (deploy chain)
8 ─► order flow reuse
11 ─► 12 ─► 18                    (detail → PDF)
14 ─► 15, 16, 19                 (admin backend → admin UI/export/status)
21 ─► 22,23,24                   (tokens → refactors)
```

## Beta-readiness definition of done
- Custom domain live w/ HTTPS, no CORS errors.
- Sign up / sign in / order / view history all work with real data.
- Backbones persist and are reusable.
- Owner can view all orders and advance status.
- Prices validated server-side; no leaked secrets.

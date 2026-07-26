# Implementation Prompts

Copy-paste prompts for an AI coding model (Cascade / Devin), one per task in `PRIORITY_TASK_LIST.md`. Each is self-contained with context, files, and acceptance criteria. Recommended model: **Claude Sonnet** for multi-file tasks; **SWE-1.6** for the smaller S-effort ones to save quota.

> Shared context to paste at the top of any session:
> "VectorWeave is a plasmid-construction ecommerce app. Frontend: React + Vite + TypeScript in `frontend/`. Backend: Java Spring Boot in `backend/` (package `com.ezvector.backend`), JPA entities auto-migrate via `ddl-auto=update`. Auth: Supabase (frontend) + Supabase JWT validation (backend); a `Customer` is linked to a Supabase user via `CustomerSupabaseMapping`. Do not change product content, only what I ask."

---

## P0 — Critical path

### #1 Rotate leaked secret
```
`database/RLS_SETUP_GUIDE.md` contains a real Supabase DB username/password in plaintext. Remove all hardcoded credentials from that file, replace with placeholders like <SET_IN_ENV>, and add a note that credentials live only in environment variables. Then list the exact git commands I need to run to purge these secrets from git history (git filter-repo or BFG). Do not invent new secrets.
Acceptance: no credentials remain in the repo; I have a clear history-scrub command list.
```

### #2 Stripe lazy-init (unblock boot)
```
In `backend/src/main/java/com/ezvector/backend/service/StripeService.java`, the @PostConstruct init() throws IllegalStateException when STRIPE_SECRET_KEY is empty, which prevents the whole app from starting. Change it so the app boots without a Stripe key: if the key is present set Stripe.apiKey and log info; if absent, log a warning and leave payments disabled. In StripeController.createCheckoutSession, return HTTP 503 with a clear message if Stripe is not configured. Do not remove any existing payment logic.
Acceptance: backend starts with no STRIPE_SECRET_KEY set; checkout returns 503 when unconfigured.
```

### #3 Fix CORS
```
Remove the hardcoded `@CrossOrigin(origins = "http://localhost:5173")` annotations from `CustomerController.java` and `ManagerController.java`. CORS must come solely from `SecurityConfig.corsConfigurationSource()` which reads `cors.allowed.origins`. Verify no other controller hardcodes CORS.
Acceptance: no @CrossOrigin annotations remain; CORS is env-driven.
```

### #4 Align datasource profile
```
The backend has two datasource configs: `application.properties` (uses SUPABASE_URL/USERNAME/PASSWORD) and `application-prod.properties` (uses DATABASE_URL). I will deploy on Railway with Supabase Postgres. Recommend which profile to use, reconcile the two files so there's one clear production path, and tell me the exact environment variables to set on Railway (including SPRING_PROFILES_ACTIVE, SUPABASE_JWT_SECRET, PORT, cors.allowed.origins). Do not commit any secret values.
Acceptance: one unambiguous prod datasource config + an env-var list.
```

### #8 Persist user backbones
```
Users must be able to create a backbone that persists and is reusable across orders. Today `useOrderForm.submitBackboneUpload` in `frontend/src/hooks/useOrderForm.ts` only adds to local state, and there's no backend write path (`CustomerService.getUserBackbones` reads Fragment where isBackbone=true, but nothing writes those).
Implement:
1. Backend: add a persistent backbone (recommend a new `Backbone` JPA entity: id, name, sequence, customerId, createdAt, optional isStandard) + repository. Add `POST /api/customers/backbones/{supabaseUserId}` (ownership-checked via AuthorizationHelper) that saves a backbone and returns it. Update `getUserBackbones` to read from the new table.
2. Frontend: in `submitBackboneUpload`, call a new `orderService.createBackbone(userId, {name, sequence})`, then refetch backbones.
Acceptance: a created backbone survives refresh and appears in the BackboneSelector on a new order.
```

### #9 Server-side price + DNA validation
```
In `OrderService.createOrder` (`backend/.../service/OrderService.java`), the client-supplied `totalPrice` is trusted and sequences aren't validated server-side. Add: (a) server-side validation that every fragment/mutation matches the allowed format (DNA = ACGT only; mutation = ^[ACGT]\d+[ACGT]$), rejecting invalid orders with a clear message; (b) recompute the price on the server using the same rules as `frontend/src/utils/pricing.ts` and use that authoritative value instead of the client's. Keep the OrderResponse contract the same.
Acceptance: an order posted with a tampered price or invalid DNA is rejected / re-priced server-side. Add unit tests.
```

### #10 ensureCustomer bootstrap
```
Prevent orphaned Supabase users (Supabase user exists but no backend Customer). In `frontend/src/pages/AuthPage.tsx` sign-in handler and/or a small post-login bootstrap, after a successful login call `getCustomerBySupabaseId(user.id)` (in `lib/customer.ts`); if it returns null, call `createCustomer(...)` using the user's metadata. Make backend `POST /api/customers` idempotent (it already checks existsBySupabaseUserId — confirm it returns gracefully). 
Acceptance: logging in as a user who has no Customer row auto-creates it; no duplicate-customer errors.
```

---

## P1 — High priority

### #11 Order detail endpoint
```
Add `GET /api/orders/detail/{orderId}` to `OrderController`/`OrderService`. It must be ownership-checked (the order's customer must map to the current Supabase user; managers may be allowed later). Return a detailed DTO: orderId, plasmidName, buildType, backbone (name+sequence), fragments (sequence+dnaType), mutations, datePlaced, dateReceived, totalPrice, status. Reuse existing entities (Order, OrderItem, Plasmid subtypes, Fragment, Mutation).
Acceptance: endpoint returns full order data for the owner; 403 for others; 404 if missing.
```

### #12 Order detail page
```
Add a route `/orders/:orderId` and an `OrderDetailPage.tsx` in `frontend/src/pages`. Wire the "View" button in `OrdersListPage.tsx` (currently a TODO) to navigate there. Fetch from the new `GET /api/orders/detail/{orderId}` via a new `orderService.getOrderDetail`. Display all order fields in a clean layout. Match existing styling for now.
Acceptance: clicking View shows a working detail page with the order's fragments/mutations/backbone.
```

### #13 Profile dashboard real data
```
`frontend/src/pages/ProfilePage.tsx` shows hardcoded 0 for Total Orders/Pending/Completed/Total Spent and static "No recent activity". Fetch the user's orders via `orderService.getUserOrders(user.id)` and compute: total count, pending (NOT_STARTED), in-progress, completed (COMPLETE), total spent (sum of totalPrice), and a recent-activity list (latest 5). Handle loading/empty/error states.
Acceptance: dashboard reflects real order data.
```

### #14 Admin endpoints + role guard
```
Add manager-only capabilities. In `ManagerService` add `isManager(supabaseUserId)` usage to guard access. Add to `ManagerController` (or a new AdminController): `GET /api/managers/orders` (all orders, filter by status), `GET /api/managers/orders/{orderId}` (any order detail), `PATCH /api/managers/orders/{orderId}/status` (set NOT_STARTED|IN_PROGRESS|COMPLETE). Each must verify the current user is a Manager (not just authenticated) using AuthorizationHelper + ManagerService; return 403 otherwise. Update `SecurityConfig` if needed.
Acceptance: managers can list/view/update all orders; non-managers get 403.
```

### #15 Admin/owner page
```
Create `/admin` route and `AdminPage.tsx`, accessible only to managers (guard: call `GET /api/managers/check/{userId}`; redirect non-managers). Show a table of all orders with filters by status, a detail view, and a control to update status via `PATCH /api/managers/orders/{id}/status`. Add an "Export" button that downloads the visible orders as JSON/CSV for the internal processing tool.
Acceptance: owner can see every order, change status, and export data.
```

### #16 Expand OrderStatus
```
Extend `Order.OrderStatus` enum (`backend/.../model/Order.java`) to add CANCELLED and ON_HOLD. Update any switch/serialization that assumes only three values, and update the status badge colors in `OrdersListPage.tsx` (getStatusColor) and the admin page. Ensure existing rows default sensibly.
Acceptance: new statuses selectable in admin and rendered with distinct badges.
```

### #17 ProtectedRoute
```
Create `frontend/src/components/ProtectedRoute.tsx` that checks `isAuthenticated()` (from lib/auth), shows a loader while checking, and redirects to `/auth` with `state.from` when unauthenticated. Wrap `/order`, `/orders`, `/orders/:id`, `/cart`, `/profile`, `/account`, `/upgrade` in `App.tsx`. Add a separate manager guard for `/admin`.
Acceptance: unauthenticated users are redirected; authed users pass through; post-login returns to `from`.
```

### #18 PDF order summary
```
Add client-side PDF generation for an order. Install `jspdf` and `jspdf-autotable`. Create `frontend/src/utils/orderPdf.ts` exporting `downloadOrderPdf(order)` that renders an invoice/receipt-style PDF (VectorWeave header, order id, date, customer, build type, backbone, fragments/mutations table, line-item pricing, total). Add a "Download PDF" button on `OrderDetailPage`. Uses the order-detail data from task #11/#12.
Acceptance: a downloadable, readable PDF is produced for any order.
```

### #19 Internal processing export
```
On the admin page (#15) and backend (#14), add order export for the internal processing tool. Backend: `GET /api/managers/orders/{orderId}/export` and `GET /api/managers/orders/export?status=&format=json|csv` returning full order data (customer, backbone+sequence, fragments, mutations, buildType, dates, status). Manager-guarded. Frontend: wire the Export button to download the file.
Acceptance: owner can export one or many orders as JSON/CSV.
```

### #20 Real RLS + indexes
```
The referenced `database/setup_rls.sql` is missing and the RLS guide assumes wrong table names. First, output the actual table names Hibernate generates for these entities: Customer, Cart, CartItem, Order, OrderItem, Plasmid, Fragment, CustomerSupabaseMapping, ManagerSupabaseMapping, and the new Backbone. Then write `database/setup_rls.sql` that enables RLS and adds owner-scoped policies using those real names, plus unique constraints on the *_supabase_mapping(supabase_user_id) columns and hot-path indexes (fragment(customer_id,is_backbone), order/cart customer FKs). Note the backend connects as superuser and bypasses RLS (defense-in-depth only).
Acceptance: a runnable SQL file matching real table names + constraints/indexes.
```

---

## P2 — Styling / polish

### #21 Design-system token layer
```
Establish a single design-token layer from `Claude_VW_V11.html` (see docs/UI_UX_REFACTORING_PLAN.md for the extracted :root variables and fonts). Put the CSS variables in `frontend/src/index.css`, add the Google Fonts (DM Sans, DM Mono, Fraunces) once, and map Tailwind's theme to these tokens so shadcn/ui components inherit the navy/amber brand palette instead of gray. Restyle the shared `components/ui/*` primitives (Button, Card, Input, Label) to the tokens. Do not change page content.
Acceptance: tokens exist globally; ui primitives use brand colors; fonts load once.
```

### #22 Refactor global chrome + authed pages
```
Using the token layer from #21, restyle `Header.tsx`, `Footer.tsx`, then `ProfilePage`, `OrdersListPage`, `OrderDetailPage`, `AuthPage`, `CartPage`, `AccountPage` to the `Claude_VW_V11.html` aesthetic (Fraunces headings weight 300, DM Sans body, DM Mono for sequences/prices, token-based cards/buttons/inputs). Keep all functionality and content. Ensure responsive (stack the order builder's two columns on mobile; hamburger nav).
Acceptance: consistent branded look across authed pages; no functional regressions.
```

### #23 Landing page refactor
```
Refactor `frontend/src/pages/LandingPage.tsx` to the design system (#21). KEEP the hero background art (hero1.png) and the scalloped SVG section divider. REMOVE the layered image/featured card box overlaying the hero (to the right of the "Clone Anything" text). Re-apply Fraunces headings, token colors, DM Sans body, and tighten spacing to match the HTML rhythm. No content/copy changes.
Acceptance: hero art + scalloped edges retained; image box gone; landing matches the design system.
```

### #24 Marketing/content pages
```
Refactor the remaining content pages to the design system (#21): ServicesPage, the five services/* sub-pages, FAQPage, ContactPage, and the four how-to/* pages. Typography/color/spacing only — keep all copy. Also style the 404 route and remove the dev `/test` ConnectionTest route.
Acceptance: all content pages visually consistent; 404 styled; test route removed.
```

---

## P3 — Future (brief prompts)

### #27 Enable Stripe
```
Enable real payments. Set STRIPE_SECRET_KEY/STRIPE_WEBHOOK_SECRET, register the /api/stripe/webhook endpoint, and reconcile the price unit: StripeService multiplies price*100 assuming dollars — align with the DB price-unit decision in docs/DATABASE_SCHEMA_ANALYSIS.md. Add test coverage with Stripe test keys.
```

### #30 Automated tests
```
Implement the P0/P1 test slices from docs/TESTING_STRATEGY.md: JUnit + Testcontainers for OrderService/AuthorizationHelper/JWT + MockMvc ownership tests; Vitest for utils/pricing and useOrderForm; one Playwright signup→order→history happy path. Re-enable tests in CI.
```

---

## Usage tips
- Run P0 tasks in order; several are prerequisites for deploy.
- Paste the "Shared context" block at the start of each new session.
- For multi-file tasks (#8, #14, #15, #22), prefer Claude Sonnet; for S-tasks (#1–3), SWE-1.6 is enough.
- After each task, run the manual smoke checklist in `TESTING_STRATEGY.md`.

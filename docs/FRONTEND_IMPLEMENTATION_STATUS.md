# Frontend Implementation Status

## Summary

The React (Vite + TypeScript) frontend has **all major pages and routes scaffolded (~70%)**. The order builder is genuinely sophisticated and wired to the backend. The biggest gaps are: **profile/dashboard shows hardcoded zeros**, **no order detail view**, **backbone upload is not persisted**, **no admin/owner UI**, **no PDF download**, **no route guards**, and **inconsistent styling** (Tailwind + shadcn on some pages, inline CSS vars on others) — the target being the `Claude_VW_V11.html` design system.

## Routing

`@/Users/bunsi/IdeaProjects/vectorweave/frontend/src/App.tsx` — all routes registered, wrapped in `CartProvider` + `BrowserRouter`, with `ScrollToTop`. **No protected-route wrapper** (each page self-checks auth). 404 is a bare `<div>404</div>`.

## Page-by-page status

| Page | File | Status | Notes |
|------|------|--------|-------|
| Landing | `pages/LandingPage.tsx` | ⚠️ 80% | Hero + image done; heavy inline styling; needs design-system refactor; remove image box per request |
| Order builder | `pages/OrderPage.tsx` + `hooks/useOrderForm.ts` | ✅ 85% | Multi-insert / mutagenesis / new-backbone; validation; add-to-cart + submit wired to API |
| Orders list | `pages/OrdersListPage.tsx` | ⚠️ 70% | Fetches real orders; **"View" is a TODO** (no detail page) |
| Profile/Dashboard | `pages/ProfilePage.tsx` | ❌ 40% | **Stats hardcoded to 0**; "Recent Activity" static; not wired to backend |
| Account | `pages/AccountPage.tsx` | ⚠️ | Needs review/refactor |
| Auth | `pages/AuthPage.tsx` | ✅ 80% | Sign in/up work; "remember me"/"forgot password" are placeholders |
| Cart | `pages/CartPage.tsx` | ⚠️ | Wired to cartService; verify checkout path |
| Order success/cancel | `pages/OrderSuccessPage.tsx`, `OrderCancelPage.tsx` | ✅ | Stripe return pages |
| Services (+5 sub-pages) | `pages/ServicesPage.tsx`, `pages/*CloningPage.tsx`, etc. | ⚠️ | Content-complete; need design-system refactor |
| Upgrade to manager | `pages/UpgradeAccountPage.tsx` | ⚠️ | Calls manager upgrade |
| FAQ / Contact / How-to (x4) | `pages/*.tsx` | ⚠️ | Static content; refactor styling |
| **Admin/Owner** | — | ❌ | **Does not exist** |
| **Order detail** | — | ❌ | **Does not exist** |

## Order builder components — ✅ strong

`frontend/src/components/order/`: `BuildTypeSelector`, `BackboneSelector`, `FragmentInputList`, `MutationInputList`, `AssemblyDiagram`, `PositionDiagram`, `TargetRegionInput`, `PricingSummary`.

The `useOrderForm` hook (`frontend/src/hooks/useOrderForm.ts`, 646 lines) is comprehensive: build-type switching, DNA validation, mutation format `A123T` validation against the target region, price computation, add-to-cart, and submit.

## Services / lib (API integration) — ✅ good

- `services/api.ts` — axios instance, auto Bearer token, 401 handling.
- `services/orderService.ts` — `getUserBackbones`, `createOrder`, `getUserOrders`.
- `services/cartService.ts` — full cart API.
- `services/stripeService.ts` — checkout session + verify.
- `lib/auth.ts`, `lib/customer.ts`, `lib/manager.ts`, `lib/supabase.ts`.
- `context/CartContext.tsx` — global cart count.

## Key gaps & required fixes

### 1. Backbone upload not persisted (HIGH)
`useOrderForm.submitBackboneUpload` only does `setBackbones((prev) => [...prev, {...}])` — nothing hits the backend. A user "creating a backbone for reuse" loses it on refresh.
**Fix:** add `POST /api/customers/backbones/{id}` (backend) and call it here; then refetch `getUserBackbones`.

### 2. Profile dashboard is fake data (HIGH)
`ProfilePage` shows `0` for Total Orders / Pending / Completed / Total Spent and "No recent activity".
**Fix:** fetch `orderService.getUserOrders(user.id)` and compute counts + recent list. Wire "Total Spent" from order totals.

### 3. No order detail view (HIGH)
`OrdersListPage` "View" button → `{/* TODO */}`.
**Fix:** add `/orders/:orderId` route + `OrderDetailPage`, backed by new `GET /api/orders/detail/{orderId}`. Include a **Download PDF** button.

### 4. No admin/owner page (HIGH for owner)
**Fix:** add `/admin` (manager-guarded) listing all orders with status controls, backed by new manager endpoints.

### 5. No route guards (MEDIUM)
Add `<ProtectedRoute>` (see `AUTHENTICATION_STATUS.md`) and wrap authed routes. Add a manager guard for `/admin`.

### 6. Styling inconsistency (MEDIUM) — see `UI_UX_REFACTORING_PLAN.md`
Mix of Tailwind/shadcn (`ProfilePage`, `OrdersListPage`, `AuthPage`) and inline CSS-variable styling (`OrderPage`, `LandingPage`). Target: unify on the `Claude_VW_V11.html` token system.

### 7. Misc
- 404 route is unstyled.
- `ConnectionTest` (`/test`) is a dev artifact — remove before prod.
- "Forgot password"/"Remember me" placeholders in `AuthPage`.

## State management
Local component state + hooks; one global context (`CartContext`). No Redux. Adequate for current scope. Consider a lightweight `AuthContext` to avoid repeated `getUser()` calls.

## Effort estimate
- Persist backbone + wire UI: ~0.5 day
- Profile real data: ~0.5 day
- Order detail page + route: ~1 day
- Admin page: ~1.5 days
- ProtectedRoute + guards: ~0.5 day
- Styling refactor: see UI plan (multi-day)

**Risk: MEDIUM** — feature-complete order path; profile/admin/detail are the beta blockers.

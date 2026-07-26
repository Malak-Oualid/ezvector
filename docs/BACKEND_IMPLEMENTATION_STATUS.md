# Backend Implementation Status

## Summary

The Spring Boot backend is **substantially complete (~85%)**. All five domain controllers are implemented with real service layers, repositories, JWT security, ownership checks, and a fully working Stripe integration (including webhook). The main gaps are: **backbone persistence**, **order detail retrieval**, **admin/owner order access**, **order status updates**, and a **startup dependency on the Stripe key**.

## Controller-by-controller status

### `CustomerController` — ✅ ~90%
`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/controller/CustomerController.java`
- `POST /api/customers` — create customer + Supabase mapping ✅
- `GET /api/customers/supabase/{id}` — fetch customer ✅
- `GET /api/customers/backbones/{id}` — list backbones ⚠️ (returns empty because backbones are never persisted — see gap below)
- `GET /api/customers/test` — health ✅
- ⚠️ Hardcoded `@CrossOrigin("http://localhost:5173")` — remove for prod.
- ❌ Missing: create-backbone endpoint, update profile, address CRUD.

### `OrderController` — ✅ ~75%
`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/controller/OrderController.java`
- `POST /api/orders` — create order, ownership-checked ✅
- `GET /api/orders/{supabaseUserId}` — list user's orders ✅
- ❌ Missing: `GET /api/orders/detail/{orderId}` (order detail — frontend "View" button is a TODO).
- ❌ Missing: status update endpoint (for admin/processing).
- ❌ Missing: PDF/summary endpoint.

### `CartController` — ✅ ~95%
`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/controller/CartController.java`
- add / get / remove / clear / checkout — all implemented with ownership checks ✅
- `checkout` converts cart items → orders and clears cart ✅

### `ManagerController` — ⚠️ ~60%
`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/controller/ManagerController.java`
- `POST /api/managers/upgrade`, `GET /supabase/{id}`, `GET /check/{id}` ✅
- ❌ No endpoints to **list all orders**, view any order, or update order status. The admin/owner page has no backend to call.
- ⚠️ Hardcoded `@CrossOrigin`.
- ⚠️ Manager routes are only `authenticated()` — **not role-restricted**. Any logged-in user can call `/api/managers/**`. Needs role enforcement.

### `StripeController` — ✅ ~90%
`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/controller/StripeController.java`
- create-checkout-session (ownership-checked), verify-session, webhook (signature-verified) ✅
- Webhook on `checkout.session.completed` → `cartService.checkoutCart()` ✅
- Payments are out-of-scope for v1 (internal orders), but code is ready.

### `TestController` — ✅ health/debug only.

## Service layer

| Service | Status | Notes |
|---------|--------|-------|
| `CustomerService` | ✅ | create, lookup, `getUserBackbones` (returns empty — no persisted backbones) |
| `OrderService` | ✅ | `createOrder` handles all 3 build types; `getUserOrders` maps to DTO |
| `CartService` | ✅ | full cart lifecycle + `checkoutCart` (JSON-serializes fragments/mutations) |
| `StripeService` | ✅ | checkout session + verify; ⚠️ **throws on startup if key missing** |
| `ManagerService` | ✅ | upgrade/check |
| `TestService` | ✅ | trivial |

## Security layer — ✅ solid

`backend/.../security/`
- `SupabaseJwtValidator` — HMAC verify with `SUPABASE_JWT_SECRET`, expiry + tamper checks.
- `JwtAuthenticationFilter` — extracts Bearer, sets `SecurityContext`.
- `AuthorizationHelper` — `isCurrentUser`/`requireCurrentUser` ownership checks used consistently in controllers.
- `SecurityConfig` — stateless, CSRF off, per-route rules, CORS via `cors.allowed.origins`.
- `SecurityExceptionHandler`, `UnauthorizedException`.

**Gap:** no **role-based** authorization (customer vs manager). `/api/managers/**` and future admin/order-status endpoints must check the caller is a Manager, not just authenticated.

## Repositories — ✅ complete
17 Spring Data repositories under `backend/.../repository/`. Custom finders observed: `CustomerSupabaseMappingRepository.findBySupabaseUserId/existsBySupabaseUserId`, `CartRepository.findByCustomer`, `FragmentRepository.findByCustomerAndIsBackbone`.

## Key gaps & required work

### 1. Persist user backbones (HIGH)
No write path for backbones. Add:
```java
// New endpoint on CustomerController
@PostMapping("/backbones/{supabaseUserId}")
public ResponseEntity<?> createBackbone(@PathVariable String supabaseUserId,
                                        @RequestBody BackboneDto dto) {
    if (!authHelper.isCurrentUser(supabaseUserId)) return ResponseEntity.status(403).build();
    return ResponseEntity.ok(customerService.createBackbone(supabaseUserId, dto));
}
```
Service persists a backbone (recommend a dedicated `Backbone` entity/table; see `DATABASE_SCHEMA_ANALYSIS.md`). Then wire the frontend `submitBackboneUpload` to call it (currently local-only).

### 2. Order detail endpoint (HIGH)
Frontend `OrdersListPage` "View" is a TODO. Add `GET /api/orders/detail/{orderId}` returning plasmid, fragments/mutations, backbone, dates, status — ownership-checked. Needed for order history + PDF.

### 3. Admin/owner order access + status updates (HIGH for owner page)
Add manager-only endpoints:
- `GET /api/managers/orders` — all orders (paginated/filterable)
- `GET /api/managers/orders/{id}` — any order detail
- `PATCH /api/managers/orders/{id}/status` — set `NOT_STARTED|IN_PROGRESS|COMPLETE`
Enforce Manager role (add a `@PreAuthorize`-style check via `ManagerService.isManager(currentUserId)`).

### 4. Order status model too small (MEDIUM)
Enum is `{NOT_STARTED, IN_PROGRESS, COMPLETE}`. The product wants Pending/Processing/Completed/Cancelled/On-Hold. Extend the enum + handle in DTOs/UI. Note: `OrderService` sets `NOT_STARTED`; frontend `OrdersListPage.getStatusColor` already references these three.

### 5. Stripe startup coupling (HIGH — blocks boot)
`StripeService.init()` throws if `STRIPE_SECRET_KEY` is empty → backend won't start. Make it lazy:
```java
@PostConstruct
public void init() {
    if (stripeApiKey != null && !stripeApiKey.isEmpty()) {
        Stripe.apiKey = stripeApiKey;
    } else {
        log.warn("Stripe key not set; payment endpoints disabled.");
    }
}
```
And guard `createCheckoutSession` to return a clear 503 if unconfigured.

### 6. PDF generation (MEDIUM) — see `INTEGRATION_REQUIREMENTS.md`.

### 7. Internal processing pipeline (MEDIUM) — see `INTEGRATION_REQUIREMENTS.md`.

## API surface (current)

```
POST   /api/customers                         (public)
GET    /api/customers/supabase/{id}           (auth)
GET    /api/customers/backbones/{id}          (auth)
GET    /api/orders/{supabaseUserId}           (auth, owner)
POST   /api/orders                            (auth, owner)
POST   /api/cart/add                          (auth, owner)
GET    /api/cart/{id}                         (auth, owner)
DELETE /api/cart/{id}/items/{cartItemId}      (auth, owner)
DELETE /api/cart/{id}/clear                   (auth, owner)
POST   /api/cart/{id}/checkout                (auth, owner)
POST   /api/managers/upgrade                  (auth)  ⚠ needs role guard
GET    /api/managers/supabase/{id}            (auth)
GET    /api/managers/check/{id}               (auth)
POST   /api/stripe/create-checkout-session    (auth, owner)
GET    /api/stripe/verify-session/{id}        (auth)
POST   /api/stripe/webhook                    (public, signature)
GET    /api/*/test                            (public)
```

## Effort estimate
- Backbone persistence + endpoint: ~0.5 day
- Order detail endpoint: ~0.5 day
- Admin order endpoints + role guard: ~1 day
- Status enum expansion: ~0.5 day
- Stripe lazy-init: ~1 hour

**Risk: MEDIUM** — core is solid; gaps are additive, not rewrites.

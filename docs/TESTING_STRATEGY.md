# Testing Strategy

## Reality check
There are **no automated tests** in the repo today (the backend build even runs `-x test`). For a 2-week beta with real users, prioritize a **thin but high-value** test layer over the critical order/auth paths, and rely on beta users for breadth. Don't over-invest before launch.

## Priorities (in order)
1. Manual end-to-end smoke of the critical path (before every deploy).
2. Backend unit/integration tests for order + auth ownership logic.
3. Frontend validation-logic tests (`useOrderForm`, `utils/pricing`).
4. One automated E2E happy-path (Playwright) for signup→order→history.
5. Broader coverage post-beta.

---

## Backend (JUnit 5 + Spring Boot Test)

Already available via Spring Boot starter test. Re-enable tests in CI (remove `-x test` for a test job, keep it for the fast deploy build if needed).

### Unit tests (highest value)
- `OrderService.createOrder` — each build type creates the right `Plasmid` subtype; fragments/mutations persisted; failure returns `orderId=null`.
- `OrderService` — **server-side price recomputation** (once added) rejects tampered prices.
- `AuthorizationHelper.isCurrentUser` — matches/mismatch/anonymous.
- `SupabaseJwtValidator.validateToken` — valid, expired, tampered, malformed.
- `CartService.checkoutCart` — JSON round-trip of fragments/mutations; cart cleared after.
- `CustomerService.createCustomer` — duplicate mapping rejected.

### Integration tests (`@SpringBootTest` + MockMvc + Testcontainers Postgres)
- `POST /api/customers` creates customer + mapping.
- `POST /api/orders` with valid JWT → 200; wrong user → 403; no token → 401.
- `GET /api/orders/{id}` ownership enforcement.
- Cart add/get/remove/clear/checkout lifecycle.

```java
@SpringBootTest
@AutoConfigureMockMvc
class OrderControllerIT {
  @Autowired MockMvc mvc;
  @Test void rejectsCrossUserOrderAccess() throws Exception {
    mvc.perform(get("/api/orders/other-user-id")
        .header("Authorization", "Bearer " + tokenForUserA))
       .andExpect(status().isForbidden());
  }
}
```
Recommend **Testcontainers** for a disposable Postgres so `ddl-auto=update` builds the schema under test.

---

## Frontend (Vitest + React Testing Library)

Not yet configured. Add `vitest`, `@testing-library/react`, `jsdom`.

### Unit (pure logic — cheapest, highest ROI)
- `utils/pricing` — `isValidDNA`, `isValidMutation`, `computeTotalPrice` per build type.
- `useOrderForm` — plasmid-name validation, fragment validation, mutation `A123T` + target-region checks, build-type reset. Test as a hook with `renderHook`.

### Component
- `AuthPage` — password mismatch, error rendering.
- `OrdersListPage` — renders rows from mocked `orderService`; empty state.
- `BackboneSelector` — upload validation.

```ts
// example: pricing.test.ts
import { computeTotalPrice, isValidMutation } from "@/utils/pricing";
test("rejects malformed mutation", () => {
  expect(isValidMutation("A12")).toBe(false);
  expect(isValidMutation("A12T")).toBe(true);
});
```

---

## End-to-end (Playwright)

One automated happy-path plus a couple of guards. Run against a local full stack (or a Railway preview).

Scenarios:
1. **Signup → build multi-insert order → submit → see it in /orders.**
2. Sign in existing user → order history loads.
3. Unauthenticated visit to `/orders` → redirected to `/auth`.
4. (After admin exists) Owner logs in → sees all orders → advances status.

```ts
test("place an order end to end", async ({ page }) => {
  await page.goto("/auth");
  // ...sign up
  await page.goto("/order");
  await page.getByPlaceholder("e.g. pMyProtein").fill("pBetaTest");
  // ...select backbone, add fragment
  await page.getByRole("button", { name: /submit/i }).click();
  await expect(page).toHaveURL(/\/orders/);
  await expect(page.getByText("pBetaTest")).toBeVisible();
});
```

---

## Manual smoke checklist (run before each deploy)
- [ ] Backend boots; `/api/orders/test` returns 200.
- [ ] Sign up → customer row created.
- [ ] Sign in → `/profile` loads.
- [ ] Build + submit order (each of 3 build types).
- [ ] Order appears in `/orders` with correct price/status.
- [ ] Cross-user access → 403; unauth → redirected.
- [ ] Custom domain HTTPS OK; no CORS/console errors.

## Security testing
- Verify ownership on every `/api/{cart,orders,customers,stripe}` route (403 on mismatch).
- Confirm price cannot be tampered (server recompute).
- Confirm DNA/mutation inputs validated server-side (not just client).
- Confirm manager-only routes reject non-managers (after role guard added).
- Confirm no secrets in client bundle / repo.

## Performance (light, post-launch)
- Check N+1 on `getUserOrders` (it walks `customer.getCustomerOrders()` then order items) — add fetch joins/indexes if slow.
- Basic load test (k6/Artillery) on `POST /api/orders` before wider rollout.

## Test data
- Seed 1 customer + 1 manager mapping.
- Seed standard backbones (once backbone model exists) for order tests.
- Use Supabase test project or Testcontainers to avoid polluting prod.

## Tooling summary
| Layer | Tool |
|-------|------|
| Backend unit/integration | JUnit 5, Spring Boot Test, MockMvc, Testcontainers |
| Frontend unit/component | Vitest, React Testing Library |
| E2E | Playwright |
| Load (later) | k6 or Artillery |

**Effort:** ~2–3 days for the P0/P1 slices above; treat full coverage as post-beta (P3 #30).

# Authentication Status

_Analysis date: based on current codebase state._

## Summary

Authentication is **largely implemented and functional end-to-end**. Supabase handles identity; the Spring backend validates Supabase JWTs and maintains a parallel `Customer` record linked via `CustomerSupabaseMapping`. The main gaps are around error-recovery, orphaned accounts, email confirmation handling, and the lack of a reusable protected-route wrapper on the frontend.

**Overall status: ~80% complete.**

## What exists and works

| Layer | File | Status |
|-------|------|--------|
| Supabase client | `frontend/src/lib/supabase.ts` | ✅ Working (env-driven) |
| Auth helpers | `frontend/src/lib/auth.ts` | ✅ `isAuthenticated`, `getUser`, `getSession`, `logout`, `getAuthHeader` |
| Sign in / Sign up UI | `frontend/src/pages/AuthPage.tsx` | ✅ Both flows implemented |
| Customer sync | `frontend/src/lib/customer.ts` | ✅ `createCustomer`, `getCustomerBySupabaseId` |
| Axios auth interceptor | `frontend/src/services/api.ts` | ✅ Auto-attaches `Bearer` token, 401 → sign out + redirect |
| JWT validation | `backend/.../security/SupabaseJwtValidator.java` | ✅ HMAC verify with `SUPABASE_JWT_SECRET` |
| JWT filter | `backend/.../security/JwtAuthenticationFilter.java` | ✅ Sets `SecurityContext` |
| Authorization | `backend/.../security/AuthorizationHelper.java` | ✅ `isCurrentUser` ownership checks |
| Security rules | `backend/.../config/SecurityConfig.java` | ✅ Stateless, per-route auth |
| Customer creation | `backend/.../service/CustomerService.java` | ✅ Creates customer + mapping |

## Sign-up flow (as implemented)

`@/Users/bunsi/IdeaProjects/vectorweave/frontend/src/pages/AuthPage.tsx:66-150`

1. `supabase.auth.signUp()` with `first_name` / `last_name` metadata.
2. On success, client `fetch(POST ${VITE_BACKEND_URL}/api/customers)` to create the backend customer + mapping.
3. Redirect to `location.state.from || "/profile"`.

## Gaps & required fixes

### 1. Orphaned Supabase users (HIGH)
If step 2 (backend customer creation) fails, the Supabase user already exists but has no backend `Customer`. On next login they will hit "Customer not found" on every `/api/orders`, `/api/cart`, `/api/customers/backbones` call.

**Fix options:**
- Make customer creation idempotent and retried on login. Add a `getCurrentCustomer()` check in a post-login bootstrap; if missing, create it.
- Move customer creation to a Supabase DB trigger / edge function, or a backend endpoint invoked with the JWT after first login.

```ts
// Suggested: on login success, ensure backend customer exists
const ensureCustomer = async (user) => {
  const existing = await getCustomerBySupabaseId(user.id); // returns null on 404
  if (!existing) {
    await createCustomer(user.id, user.email,
      user.user_metadata?.first_name ?? "",
      user.user_metadata?.last_name ?? "");
  }
};
```

### 2. Email confirmation path incomplete (MEDIUM)
`AuthPage` detects `data.user.identities.length === 0` and shows "check your email", but the backend customer is then **never created** (user must confirm first, and there's no post-confirmation hook). Decide:
- **Dev:** disable "Confirm email" in Supabase → current flow works.
- **Prod:** add a confirmation redirect page that runs `ensureCustomer()` after the user returns authenticated.

### 3. No reusable protected route (MEDIUM)
Each page re-implements `getUser()` → redirect (`ProfilePage`, `OrdersListPage`). `App.tsx` has no route guard.

**Fix:** add a `<ProtectedRoute>` wrapper.
```tsx
// frontend/src/components/ProtectedRoute.tsx
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<"loading"|"in"|"out">("loading");
  const location = useLocation();
  useEffect(() => { isAuthenticated().then(ok => setState(ok ? "in" : "out")); }, []);
  if (state === "loading") return <div>Loading…</div>;
  if (state === "out") return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
  return <>{children}</>;
}
```
Wrap `/order`, `/orders`, `/cart`, `/profile`, `/account`, `/upgrade`.

### 4. CORS config inconsistency (MEDIUM)
`CustomerController` and `ManagerController` hardcode `@CrossOrigin(origins = "http://localhost:5173")`, while `SecurityConfig` uses the `cors.allowed.origins` env var. In production the hardcoded annotation may conflict / block the deployed frontend origin.

**Fix:** remove the hardcoded `@CrossOrigin` annotations and rely solely on `SecurityConfig.corsConfigurationSource()`.

### 5. Backend won't start without Stripe key (HIGH – blocks auth too)
`StripeService.init()` throws `IllegalStateException` if `STRIPE_SECRET_KEY` is empty (`@/Users/bunsi/IdeaProjects/vectorweave/backend/src/main/java/com/ezvector/backend/service/StripeService.java:39-45`). Since the whole backend fails to boot, **auth also breaks**. See `DEPLOYMENT_CHECKLIST.md` and `INTEGRATION_REQUIREMENTS.md`.

**Fix (short-term):** make Stripe init lazy/optional so the app boots without a key while payments are internal.

### 6. Minor
- `Customer.password` is set to `""` (Supabase owns auth) — fine, but document it.
- "Remember me" and "Forgot password" in `AuthPage` are non-functional placeholders.
- No sign-out button verified in `Header` — confirm `logout()` is wired.

## Verification steps

1. Set `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_BACKEND_URL` in `frontend/.env`.
2. Set `SUPABASE_JWT_SECRET`, DB vars, and a (test) `STRIPE_SECRET_KEY` in `backend/.env`.
3. Start backend + frontend. Sign up a new user → confirm a row appears in `customer` and `customer_supabase_mapping` tables.
4. Sign in → confirm redirect to `/profile` and that `/api/orders/{id}` returns `200` (empty list).
5. Attempt to fetch another user's orders (different id) → expect `403`.

## Effort estimate
- Orphaned user + ensureCustomer bootstrap: ~0.5 day
- ProtectedRoute + wiring: ~0.5 day
- CORS cleanup: ~1 hour
- Stripe lazy-init: ~1 hour
- Email confirmation prod flow: ~0.5 day

**Risk: MEDIUM** — flows work in the happy path; hardening needed before beta users.

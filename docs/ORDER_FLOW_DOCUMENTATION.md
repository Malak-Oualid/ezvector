# Order Flow Documentation

## Overview

VectorWeave orders let a customer design a plasmid by choosing a **build type**, selecting/creating a **backbone**, adding **fragments** or **mutations**, and either **adding to cart** or **submitting directly**. This documents the flow as currently implemented, plus edge cases and gaps.

## Build types

| UI option | API `buildType` | Requires backbone | Requires fragments | Requires mutations |
|-----------|-----------------|-------------------|--------------------|--------------------|
| 0 Multi-Insert Cloning | `MULTI_INSERT` | Yes | Yes (1–5, with DNA type) | No |
| 1 Site-Directed Mutagenesis | `MUTAGENESIS` | Yes | No | Yes (1–4, `A123T`) + target region |
| 2 New Backbone | `NEW_BACKBONE` | No | Yes (2–5) | No |

Constants: `MAX_FRAGMENTS=5`, `MAX_MUTATIONS=4` (`frontend/src/hooks/useOrderForm.ts`).

## Step-by-step user journey (current)

1. **Auth check** — `OrderPage` loads; `useOrderForm` calls `isAuthenticated()`. Unauthed users can build but cannot submit/add-to-cart.
2. **Select build type** — `BuildTypeSelector` → `selectBuildOption` resets form fields.
3. **Name plasmid** — validated: non-empty, ≤50 chars, alphanumeric.
4. **Backbone** (types 0/1) — `BackboneSelector`:
   - Logged-in users' saved backbones fetched via `orderService.getUserBackbones(user.id)`.
   - "Upload" a new backbone → **currently only added to local state** (⚠️ not persisted — see gaps).
5. **Fragments** (types 0/2) — `FragmentInputList`; each validated as DNA (`ACGT`); type 0 also requires a DNA source select.
6. **Mutations** (type 1) — target region must exist verbatim in backbone; each mutation validated `A123T` with complement + position + base checks.
7. **Pricing** — `computeTotalPrice` (`utils/pricing`) shown live in `PricingSummary`.
8. **Submit** or **Add to cart**:
   - `addToCart` → `cartService.addToCart(payload)` → refresh cart count.
   - `submitOrder` → `orderService.createOrder(payload)` → on success redirect `/orders`.

## Data flow

```
OrderPage (useOrderForm)
   │  buildOrderPayload(userId)
   ▼
services/orderService.createOrder ──► POST /api/orders (Bearer JWT)
   │                                        │ ownership check (isCurrentUser)
   │                                        ▼
   │                                 OrderService.createOrder
   │                                   1. resolve Customer via CustomerSupabaseMapping
   │                                   2. save Order (status NOT_STARTED)
   │                                   3. create Plasmid (MultiFragment|Mutagenesis|OwnBackbone)
   │                                   4. save OrderItem
   │                                   5. save Fragments / Mutations
   ▼
OrderResponse { orderId, plasmidName, datePlaced, totalPrice, status, message }
```

Cart path (alternative):
```
addToCart ─► POST /api/cart/add ─► CartService.addToCart
   (fragments/mutations serialized to JSON on CartItem)
checkout ─► POST /api/cart/{id}/checkout ─► CartService.checkoutCart
   (deserializes each item → OrderService.createOrder → clears cart)
```

## API sequence (submit path)

| # | Caller | Request | Auth | Notes |
|---|--------|---------|------|-------|
| 1 | `useOrderForm` | `GET /api/customers/backbones/{id}` | JWT | Load saved backbones |
| 2 | submit | `POST /api/orders` | JWT + owner | Create order |
| 3 | redirect | `GET /api/orders/{id}` | JWT + owner | Orders list |

## Order status state machine (current)

`Order.OrderStatus = { NOT_STARTED, IN_PROGRESS, COMPLETE }`

```
NOT_STARTED ──► IN_PROGRESS ──► COMPLETE
```
- Set to `NOT_STARTED` on creation.
- ⚠️ **No transition mechanism exists** (no status-update endpoint). Admin/processing cannot advance status yet.
- Product wants also **Cancelled / On-Hold** — not modeled.

## Edge cases

| Case | Current behavior | Gap / fix |
|------|------------------|-----------|
| Not logged in | Build allowed; submit shows "must be logged in" | OK; consider redirect to `/auth` with `from` |
| Backbone not persisted | New backbone works for the session only | **Persist** via new endpoint |
| Customer missing (orphaned) | Backend throws "Customer not found" → order fails | ensureCustomer bootstrap (see AUTH doc) |
| Mutagenesis target not in backbone | Blocked client-side | ✅ good; backend does not re-validate |
| Invalid DNA chars | Blocked client-side | Backend does not re-validate — add server validation |
| Price tampering | Client sends `totalPrice`; backend trusts it | ⚠️ Recompute/verify price server-side |
| Cart JSON parse failure at checkout | Throws RuntimeException | Surface friendlier error |
| Duplicate submit (double click) | Guarded by `isSubmitting`/`isAddingToCart` | ✅ |

## Security notes
- Every order/cart call is ownership-checked (`AuthorizationHelper.isCurrentUser`).
- **Server-side price + sequence validation is missing** — clients currently supply the price. This is a correctness/abuse risk for an ecommerce flow; recompute on the backend.

## Integration points
- **PDF summary** per order — not implemented (see `INTEGRATION_REQUIREMENTS.md`).
- **Internal processing app** — orders are not yet exported/pipelined (see `INTEGRATION_REQUIREMENTS.md`).
- **Stripe** — checkout wired but out-of-scope for v1 (internal orders).

## Priority fixes for beta
1. Persist backbones (HIGH).
2. Server-side price + DNA validation (HIGH — abuse/correctness).
3. Order detail retrieval for history/PDF (HIGH).
4. Status transitions for processing (HIGH for owner workflow).

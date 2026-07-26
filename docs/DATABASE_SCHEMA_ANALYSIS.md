# Database Schema Analysis

## Summary

The schema is **generated automatically by Hibernate** from the JPA entity classes (`spring.jpa.hibernate.ddl-auto=update`). There is **no hand-written migration/DDL file** in the repo, and the one referenced by the RLS guide (`database/setup_rls.sql`) **does not exist**. The `database/` folder contains only `RLS_SETUP_GUIDE.md`.

**Overall status: schema auto-provisions, but production hardening, RLS, seeding, and a security cleanup are required. ~50% ready.**

## How the schema is created today

- Dev: `application.properties` → `spring.datasource.url=${SUPABASE_URL}`, user/password from `SUPABASE_USERNAME`/`SUPABASE_PASSWORD`.
- Prod: `application-prod.properties` → `spring.datasource.url=jdbc:${DATABASE_URL:...}`.
- Both use `ddl-auto=update`, so tables are created/updated from entities on boot.
- `spring.jpa.show-sql=true` in dev (noisy; disable in prod — already `false` in prod file).

## Entities (source of truth)

Located in `backend/src/main/java/com/ezvector/backend/model/`:

| Entity | Notes |
|--------|-------|
| `Person` (superclass) | userID, email, password, firstName, lastName |
| `Customer extends Person` | `valid`, deliveryAddress, customerCart, customerOrders, customerBackbones |
| `Manager extends Person` | admin/owner role |
| `CustomerSupabaseMapping` | `supabaseUserId` → internal `customerId` |
| `ManagerSupabaseMapping` | `supabaseUserId` → internal `managerId` |
| `Order` | status enum `{NOT_STARTED, IN_PROGRESS, COMPLETE}`, datePlaced, dateReceived, totalOrderPrice (`int`) |
| `OrderItem` | status, correspondingOrder, correspondingPlasmid |
| `Plasmid` (superclass) | plasmidName, totalPlasmidPrice, dateCreated, isSaved |
| `MultiFragment`, `Mutagenesis`, `OwnBackbone` extends `Plasmid` | build-type specific |
| `Fragment` | sequence, dnaSource, valid, toBeOrdered, `isBackbone`, customer |
| `Mutation`, `Primer`, `SyntheticInsert`, `MultiFragment` | build details |
| `Cart`, `CartItem` | CartItem stores `fragmentsData`/`mutationsData` as JSON strings |
| `Address` | delivery address |

Repositories exist for all of the above (`backend/.../repository/`, 17 repos).

## Critical findings

### 1. RLS guide is stale and leaks credentials (HIGH / SECURITY)
`database/RLS_SETUP_GUIDE.md`:
- References `database/setup_rls.sql` **which is missing** — RLS is effectively **not applied**.
- **Contains real DB credentials in plaintext** (`SUPABASE_USERNAME`, `SUPABASE_PASSWORD`). These must be **rotated immediately** and removed from the repo/git history.
- Assumes table names `customers`, `carts`, `backbones`, `cart_items` — but Hibernate default naming produces `customer`, `cart`, `own_backbone`, `cart_item`, etc. **The RLS policy table names won't match.**

**Fix:**
1. Rotate the Supabase DB password now; move all creds to env vars only.
2. Generate the actual table names (boot with `show-sql` once, or query `information_schema.tables`).
3. Author a real `database/setup_rls.sql` matching the true table names and re-apply.

### 2. `totalOrderPrice` / `totalPlasmidPrice` are `int` (MEDIUM)
Prices are integers. Confirm the unit (cents vs whole dollars). Stripe code multiplies `item.getPrice() * 100` → implies **price is stored in dollars as int**, which loses cents precision. For an ecommerce site this is a correctness risk.

**Fix:** migrate price fields to store **cents (int)** consistently, or use `BigDecimal`/`numeric(10,2)`. Update `computeTotalPrice` (frontend) and Stripe conversion accordingly.

### 3. User-created backbones are never persisted (HIGH — data model gap)
`getUserBackbones` reads `Fragment` where `isBackbone=true` for the customer, but **nothing ever writes such a fragment**. In `OrderService.saveBuildSpecificData`, fragments are saved with `setIsBackbone(false)`. The frontend "upload backbone" only adds to local React state (`useOrderForm.submitBackboneUpload`).

**Fix:** add a persistent backbone model + endpoint (see `BACKEND_IMPLEMENTATION_STATUS.md` §Backbones and `INTEGRATION_REQUIREMENTS.md`). Recommended: a dedicated `backbone` table (name, sequence, customerId, createdAt) rather than overloading `Fragment`.

### 4. `ddl-auto=update` in production (MEDIUM)
`update` never drops columns and can silently diverge. For production predictability, prefer a migration tool (Flyway/Liquibase) or at least a reviewed baseline SQL. Keep `update` for the 2-week beta if time-constrained, but track it as tech debt.

### 5. No indexes / constraints beyond JPA defaults (MEDIUM)
Add explicit indexes for hot lookups:
- `customer_supabase_mapping(supabase_user_id)` — used on every authed request. Should be **unique**.
- `manager_supabase_mapping(supabase_user_id)` — unique.
- `fragment(customer_id, is_backbone)` — used by `getUserBackbones`.
- FK indexes on `order(customer_id)`, `cart(customer_id)`, `cart_item(cart_id)`, `order_item(order_id)`.

## Required migrations / SQL (draft)

```sql
-- Confirm actual table names first! These use Hibernate default (singular, snake_case).

-- Uniqueness on Supabase mappings
ALTER TABLE customer_supabase_mapping
  ADD CONSTRAINT uq_customer_supabase UNIQUE (supabase_user_id);
ALTER TABLE manager_supabase_mapping
  ADD CONSTRAINT uq_manager_supabase UNIQUE (supabase_user_id);

-- Hot-path indexes
CREATE INDEX IF NOT EXISTS idx_fragment_customer_backbone
  ON fragment (customer_id, is_backbone);
CREATE INDEX IF NOT EXISTS idx_order_customer ON "order" (customerordering_userid);
CREATE INDEX IF NOT EXISTS idx_cart_customer ON cart (customer_userid);
```

## Data seeding requirements

- **Standard backbone library** (e.g., pUC19, pET28a) — currently none. Seed a shared set of backbones available to all users (needs the new backbone model with a `isStandard`/null-customer flag).
- Optional: seed one **Manager/owner** account mapping for the admin page.

## RLS policy targets (once table names confirmed)

Enable RLS and add policies on: `customer`, `cart`, `cart_item`, `"order"`, `order_item`, `fragment`, `plasmid`, and the new `backbone` table. Because the backend connects as a superuser (bypasses RLS), these are defense-in-depth — still required before exposing any Supabase auto-API/Realtime.

## Effort estimate
- Credential rotation + remove from repo: ~1 hour (do immediately)
- Real RLS SQL matching table names: ~0.5 day
- Backbone persistence model + migration: ~0.5 day
- Price unit standardization: ~0.5 day
- Indexes/constraints: ~2 hours

**Risk: HIGH** primarily due to leaked credentials and missing backbone persistence.

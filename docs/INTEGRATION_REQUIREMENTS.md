# Integration Requirements

Covers the three cross-cutting integrations: **internal processing app**, **PDF order summaries**, and **Stripe** (future). Only Stripe has code today (and it is out-of-scope for v1 internal orders).

---

## 1. Internal Processing App

### Current state
- **Nothing exists.** Orders live only in the app database. There is no export, queue, or API to hand orders to the locally-run processing tool.
- Eventually this should be **embedded in employee/manager accounts** (accessible from the admin/owner page).

### Open questions (confirm with the tool's author)
- What input format does the tool accept? (CSV, JSON, Excel, direct DB read?)
- Does it run headless/CLI, or only via a UI?
- Can it poll an API, or must data be pushed/exported to a file/folder?
- What fields does it need per order (sequences, backbone, mutations, build type, customer, dates)?

### Recommended phased approach

**Phase 1 (beta, manual):** Add a manager-only endpoint that returns full order data as JSON, plus a **"Export" button** on the admin page to download JSON/CSV the tool can consume.
```
GET /api/managers/orders/{orderId}/export   (manager role)
GET /api/managers/orders/export?status=NOT_STARTED&format=csv
```
Suggested export shape (JSON):
```json
{
  "orderId": 123,
  "customer": { "email": "...", "firstName": "...", "lastName": "..." },
  "datePlaced": "2026-07-06T...Z",
  "buildType": "MULTI_INSERT",
  "plasmidName": "pMyProtein",
  "backbone": { "name": "pUC19", "sequence": "ATGC..." },
  "fragments": [ { "sequence": "ATGC...", "dnaType": "SYNTHETIC" } ],
  "mutations": [ "A123T" ],
  "totalPrice": 250,
  "status": "NOT_STARTED"
}
```

**Phase 2 (later):** Real-time integration — either the tool polls `GET /api/managers/orders?status=NOT_STARTED`, or the backend pushes to a queue/webhook. Add a `processingStatus` field and a callback endpoint for the tool to report progress.

### Dependencies
- Requires admin/owner endpoints + role guard (see `BACKEND_IMPLEMENTATION_STATUS.md`).
- Requires order detail retrieval (fragments/mutations) — currently only summary is returned.

### Effort: Phase 1 ~1 day (after admin endpoints exist).

---

## 2. PDF Order Summary

### Current state
- **Not implemented.** No PDF library on frontend or backend; no download button.

### Requirement
Invoice/receipt-style PDF per order, downloadable from the order detail / profile page. Contents: order ID, date, customer info, build type, plasmid name, backbone, fragments/mutations, line-item pricing, total.

### Recommended approach

**Option A — Client-side (fastest for beta):** generate in the browser.
- Libraries: `jspdf` + `jspdf-autotable`, or `@react-pdf/renderer` for React-native PDF layouts.
- Pros: no backend work, no storage. Cons: must have full order data on the client (needs order detail endpoint).
```ts
// npm i jspdf jspdf-autotable
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
export function downloadOrderPdf(order: OrderDetail) {
  const doc = new jsPDF();
  doc.setFontSize(18); doc.text("VectorWeave Order Summary", 14, 20);
  doc.setFontSize(11);
  doc.text(`Order #${order.orderId}`, 14, 30);
  doc.text(`Date: ${order.datePlaced}`, 14, 36);
  autoTable(doc, { startY: 46, head: [["Item", "Detail", "Price"]],
    body: order.lineItems.map(li => [li.name, li.detail, `$${li.price}`]) });
  doc.save(`vectorweave-order-${order.orderId}.pdf`);
}
```

**Option B — Server-side (more robust, needed for emailing/archival):** generate in Spring with OpenPDF/iText or a headless HTML→PDF (Flying Saucer / Playwright). Store in Supabase Storage; expose `GET /api/orders/{id}/pdf`.

### Recommendation
Start with **Option A** for beta (depends only on the new order-detail endpoint). Move to Option B when you need emailed receipts or a permanent archive.

### Effort: Option A ~0.5 day (after order detail endpoint).

---

## 3. Stripe (Future / v1 internal)

### Current state — ✅ code complete, disabled by policy
- `StripeService`, `StripeController` implement checkout session, verify, and a signature-verified webhook (`checkout.session.completed` → `cartService.checkoutCart`).
- Frontend `stripeService` + `OrderSuccessPage`/`OrderCancelPage` exist.

### Blocking issue (must fix even for internal v1)
`StripeService.init()` **throws on startup if `STRIPE_SECRET_KEY` is empty**, so the whole backend won't boot without a key. Make init lazy so internal-only deployments run without Stripe (see `BACKEND_IMPLEMENTATION_STATUS.md` §5).

### When enabling payments later
- Set `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` (env).
- Register the webhook URL `POST /api/stripe/webhook` in the Stripe dashboard.
- Verify price units: code does `unitAmount = price * 100` (treats stored price as **dollars**). Align with the DB price-unit decision (see `DATABASE_SCHEMA_ANALYSIS.md` §2).
- Test with Stripe test keys + CLI `stripe listen`.

### Effort: lazy-init fix ~1 hour; full enablement later ~1 day.

---

## Cross-cutting dependencies
1. **Order detail endpoint** unblocks both PDF and internal export.
2. **Admin/owner endpoints + role guard** unblock internal processing export.
3. **Price-unit decision** affects PDF totals and Stripe amounts.

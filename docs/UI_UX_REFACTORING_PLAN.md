# UI/UX Refactoring Plan

## Goal

Unify the entire site on the design system from `Claude_VW_V11.html` (a scientific, clean, muted-navy aesthetic). **Keep the landing hero background art and scalloped section edges; remove the layered image box above the hero.** No content changes — styling/UX only.

## Current styling problems
- **Two systems in use:** Tailwind + shadcn/ui (`ProfilePage`, `OrdersListPage`, `AuthPage`) vs. inline CSS-variable styling (`OrderPage`, `LandingPage`, service pages). Inconsistent look.
- Ad-hoc colors, spacing, and typography per page.
- Generic gray Tailwind palette on dashboard pages clashes with the branded navy/amber palette elsewhere.

## Design tokens (extracted from `Claude_VW_V11.html`)

```css
:root {
  /* surfaces */
  --bg:        #f4f6fa;
  --surface:   #ffffff;
  --surface2:  #eef1f7;
  --border:    #d4dae8;
  --border2:   #b8c3d8;
  /* brand */
  --accent:    #1d3461;  /* deep navy */
  --accent2:   #5b7fb5;  /* muted blue */
  --green:     #1a7a4a;
  --amber:     #d94f2b;  /* primary CTA / highlight */
  --red:       #c0392b;
  /* text */
  --text:      #1a2236;
  --text2:     #4a5a78;
  --text3:     #7a8ca8;
  /* type */
  --mono:  'DM Mono', monospace;
  --sans:  'DM Sans', sans-serif;
  --serif: 'Fraunces', serif;   /* headings, weight 300 */
}
```

Fonts (Google): `DM Sans` (300–600), `DM Mono` (400/500), `Fraunces` (300/600, italic 300).

### Component conventions from the HTML
- **Headings:** Fraunces, weight 300, tight letter-spacing (`-0.03em`).
- **Body:** DM Sans; **sequences/prices:** DM Mono.
- **Cards:** `--surface`, `1px solid --border`, `border-radius: 10px`, subtle shadow.
- **Primary button:** `--accent` bg, white text, radius 6–8px; hover `--accent2`.
- **Ghost button:** transparent, `1px solid --border2`, hover border `--accent`.
- **Inputs:** `--surface2` bg, `1px --border`, focus ring `0 0 0 3px rgba(29,52,97,0.08)`.
- **Section rhythm:** generous vertical padding, max-width ~1180px, centered.

## Strategy

### Step 0 — establish the token layer (foundation)
Create a single source of truth and stop mixing systems.
- Put the `:root` tokens in `frontend/src/index.css` (or `styles/`).
- Map Tailwind theme to the tokens (via `@theme`/config) so shadcn components inherit brand colors instead of gray.
- Add the Google Fonts `@import`/link once (in `index.html` or global CSS), not per-page.
- Build a small primitive set: `Button`, `Card`, `Input`, `Label`, `Select`, `Table`, `Badge`, `PageHeader` — styled to tokens. Reuse existing `components/ui/*` where possible; restyle them to tokens.

### Step 1 — global chrome
- `Header.tsx` and `Footer.tsx` → nav styling from the HTML (sticky, 56px, logo `Vector`+`Weave`, ghost + primary buttons). These appear on every page, so do them first.
- Style the 404 route.

### Step 2 — critical authed pages (beta blockers)
Order matters — these are what beta users touch:
1. `OrderPage` + `components/order/*` — already uses CSS vars; align them to the token names above.
2. `ProfilePage` (dashboard) — migrate off gray Tailwind to tokens; also wire real data (see FRONTEND doc).
3. `OrdersListPage` — token-based table + status badges (`--green`/`--amber`/`--accent2`).
4. New `OrderDetailPage` — build directly in the design system.
5. `AuthPage`, `CartPage`, `AccountPage`.

### Step 3 — marketing/content pages
`LandingPage` (keep hero art + scalloped edges, **remove image box**), `ServicesPage` + 5 service sub-pages, `FAQPage`, `ContactPage`, 4 How-to pages. Mostly typography/spacing/color swaps.

### Step 4 — new admin page
Build `/admin` in the design system from scratch (see BACKEND/FRONTEND docs).

## Landing page specifics (per request)
- **Keep:** hero background art (`hero1.png`) and the scalloped SVG divider between sections.
- **Remove:** the layered image/`DNAWeave` card box overlaying the hero (the featured card to the right of "Clone Anything").
- Re-apply Fraunces headings, token colors, DM Sans body; tighten spacing to match HTML rhythm.

## Component rebuild checklist
- [ ] Button (primary / ghost / submit)
- [ ] Card + CardHeader/Body
- [ ] Input / Textarea / Select (focus ring)
- [ ] Label (with required `*` + hint)
- [ ] Table + status Badge/pill
- [ ] Nav (Header) + Footer
- [ ] PageHeader (Fraunces title + subtitle)
- [ ] Tabs / mode toggle (from HTML `.mode-tabs`)
- [ ] Tooltip (`.tip`)
- [ ] Drop zone / file upload (from HTML, for bulk/backbone)

## Responsive & accessibility
- Mobile-first; the HTML is desktop-oriented — add breakpoints for nav (hamburger), the order builder's two-column layout (stack), and tables (horizontal scroll, already present in `OrdersListPage`).
- Accessibility: label all inputs, focus-visible rings, color-contrast check on `--text3` over `--surface2`, keyboard nav for tabs/menus, `alt` text on images.

## Licensing note (commercial assets)
See the separate asset-resources guidance. For icons, the site already uses inline SVGs and `lucide-react` (ISC license, commercial-OK). Keep using Lucide for consistency rather than mixing icon packs.

## Effort estimate
- Token layer + Tailwind mapping + primitives: ~1–1.5 days
- Header/Footer/global: ~0.5 day
- Critical authed pages: ~2–3 days
- Marketing/content pages: ~2 days
- Admin page styling: ~0.5 day (with build)

**Risk: MEDIUM** — large surface area; do it token-first to avoid re-work. Sequence after the functional beta blockers if the 2-week deadline forces trade-offs (a working ugly site beats a pretty broken one).

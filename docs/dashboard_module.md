# Dashboard module

Static chart canvas on the **Communicate** tab (right panel). Shows theme-linked visuals while the user chats.

## Why

Gives a “story + charts” view tied to investigation themes without building a full BI layer for the POC.

## POC shortcuts

- Charts are hand-rolled SVG, not a chart library
- Data from curated TypeScript (`vendor_payments_analysis.ts`), not live SQL
- Discover “Suggested visualizations” are placeholders — not wired here
- Collaboration pins and Share modal are static mocks (fictional personas, not persisted)

## Route

`/workspace/communicate` → `CommunicateView` + `DashboardCanvas`

## Default theme

**Where Does the Money Go?** — pie (spend by category), bars (top vendors/agencies), FY bar chart. Specs in `lib/datasets/dashboard_theme_charts.ts`.

## Key files

- `components/communicate/dashboard_canvas.tsx`
- `lib/datasets/vendor_payments_analysis.ts` — numbers source of truth
- `lib/mock/chart_data.ts` — maps analysis → chart bundle

Update analysis in code when SQL results change; no separate insights doc.

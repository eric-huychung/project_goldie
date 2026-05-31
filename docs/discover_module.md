# Discover module

Discover tab + investigation cart for the vendor payments notebook. Helps users explore the dataset, track questions, and group them into themes.

## Why

Mirrors Golden Analytics’ discover flow so the POC feels like the real product while staying mock-friendly.

## POC shortcuts

- Quick insights, key questions, and viz suggestions are **mock files** (`lib/mock/discover_*.ts`), fed from curated analysis where noted
- Dataset stats come from a cached status API (`localStorage`); Refresh hits the API manually
- Cart state is React context only — lost on refresh
- Question suggest/refine uses a stub until LLM/RAG is wired
- No “chat with your data” on this tab

## Route

`/workspace/discover` → `DiscoverView` inside `WorkspaceShell` (hosts investigation cart)

## User flow

1. Connect sample dataset on Database tab
2. Discover shows summary + mock insights/questions
3. Track questions → investigation cart (themes, drag-and-drop, colors)
4. Themes drive Communicate dashboard tabs

## Key files

- `components/discover/discover_view.tsx`
- `components/workspace/investigation_cart_provider.tsx`
- `lib/datasets/vendor_payments_status_cache.ts`
- `lib/types/discover.ts`


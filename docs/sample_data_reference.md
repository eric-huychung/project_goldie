# Sample data reference

Washington State vendor payments (FY 2022–2023) — the MVP dataset for Database, Discover, chat, and charts.

## Why

One public-sector dataset with enough rows to feel real while staying manageable for a class-project POC.

## POC shortcuts

- CSVs live in gitignored `data/`; runtime reads **Supabase**, not local files
- Analysis numbers are hand-maintained in `lib/datasets/vendor_payments_analysis.ts` (re-run SQL locally, then update that file)
- Discover/Communicate mocks re-export from analysis — don’t duplicate facts in docs
- Cart and collaboration state are not persisted

## Source of truth

| Layer | Location |
|-------|----------|
| Schema + ETL | `scripts/schema.sql`, `npm run import:vendor-payments` |
| Live stats | Supabase view `vendor_payments_dataset_summary` |
| Curated facts | `lib/datasets/vendor_payments_analysis.ts` |
| LLM context | `lib/datasets/build_llm_dataset_context.ts` |
| Display names | `lib/datasets/vendor_payments_constants.ts` |

## Load data (local)

```bash
npm run db:schema
npm run import:vendor-payments
```

Env vars: see [`.env.example`](../.env.example). Never commit `.env` files.

## APIs

- `GET /api/datasets/vendor-payments/status` — row count, FY range, totals
- `POST /api/communicate/chat` — chat with dataset context
- `POST /api/discover/question-assist` — suggest/refine questions

## Related docs

- [discover_module.md](./discover_module.md)
- [dashboard_module.md](./dashboard_module.md)
- [audit_module.md](./audit_module.md)

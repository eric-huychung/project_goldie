# GOLDIE

Canvas for data — a Next.js POC inspired by Golden Analytics. Users pick a template, connect a sample dataset, explore questions, and chat with curated context.

Stack: **Next.js** (App Router) · **Supabase** · **Vercel AI Gateway** · deployed on **Vercel**.

## Quick start

```bash
cp .env.example .env.local   # fill in Supabase + AI Gateway keys
npm install
npm run dev
```

Optional — load the sample dataset locally:

```bash
npm run db:schema
npm run import:vendor-payments
```

See [`.env.example`](.env.example) for required variables. Never commit `.env` files.

## Modules

| Area | Route(s) | Doc |
|------|----------|-----|
| **Templates** — home, marketplace, start a notebook | `/`, `/templates` | [docs/template_module.md](docs/template_module.md) |
| **Database** — connect Washington vendor payments sample | `/workspace/database` | [docs/sample_data_reference.md](docs/sample_data_reference.md) |
| **Discover** — insights, questions, investigation cart | `/workspace/discover` | [docs/discover_module.md](docs/discover_module.md) |
| **Communicate** — chat + theme-linked dashboard charts | `/workspace/communicate` | [docs/dashboard_module.md](docs/dashboard_module.md) |
| **Audit** — append-only LLM input log | (backend) | [docs/audit_module.md](docs/audit_module.md) |

**Data layer** (schema, ETL, curated analysis, APIs) is documented in [docs/sample_data_reference.md](docs/sample_data_reference.md).

Typical flow: **Templates** → **Database** → **Discover** (track themes) → **Communicate** (chat + charts).

## POC notes

Most UI content is mocked or curated in TypeScript — not live SQL or a real template API. Cart and collaboration state are not persisted. Details and shortcuts per module are in the docs above.

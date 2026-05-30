# Template module

Home and marketplace for picking a starting template. MVP uses mock data with shapes ready for a future API.

## Why

Entry point for the product — browse templates or start blank before entering the workspace.

## POC shortcuts

- All templates in `lib/mock/templates.ts` — no backend
- Create-template modal is UI only (no save)
- Every start navigates to `/workspace/database` regardless of template choice
- Featured home cards = first 3 public templates

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Hero, search, 3 featured templates |
| `/templates` | Search, categories, public/private sections |

## Data model

`lib/types/template.ts` — `template_record` with visibility, creator, likes, optional shared badge on private cards.

Notebook entry: `push_notebook_entry()` in `lib/notebook/push_notebook_entry.ts`.

## Key files

- `components/home/home_page.tsx`
- `components/templates/templates_marketplace.tsx`
- `lib/templates/filter_templates.ts`

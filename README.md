# GOLDIE

Golden Analytics brother from another mother.

Canva for data — an AI-native BI POC. Pick a template, connect data, explore questions, chat with context, and view theme-linked charts.

Stack: **Next.js** (App Router) · **Supabase** · **Vercel AI Gateway** · **Vercel**

## The problem

Data is everywhere, but for most people it is still trapped behind a technical wall. I focused on three pains I found in user research (Reddit, articles, Gemini deep research) that even polished BI demos do not fully solve:

1. **Confused onboarding** — users face a blank screen and do not know where to start.
2. **Lost in the numbers** — they drift through rows and dead ends without a clear thread.
3. **Emailing ping pong** — insights live in screenshots and inbox threads, not in one shared place.

**Who:** non-technical users first (e.g. a college student writing a capstone on WA State spending), with data analysts as a secondary persona.

**Why this direction:** I mirrored Golden Analytics’ notebook flow (Database → Discover → Communicate) to compare feature-for-feature, but pushed harder on easy entry — templates marketplace (Canva/Kaggle-style inspiration), quick insights, and an **investigation cart** to track questions by theme before building charts. I skipped Prep and Analyze for the POC; those are high-complexity write-access problems better validated separately. I also did not try to out-feature Looker or Tableau on depth; the bet is guided exploration for people who are not analysts.

## Tech & architecture

**What I built:** a Next.js monolith on Vercel with serverless API routes. Washington vendor payments (FY 2022–2023) live in Supabase Postgres. Modules: home + template marketplace, Database connect, Discover (insights + investigation cart), Communicate (chat + static dashboard + share UI mock). LLM calls go through Vercel AI Gateway (Gemini) with static dataset context; all inputs/outputs append to a Supabase audit log.

**How it works:** user picks a template or types a goal → connects sample data → browses mocked insights and tracks questions in the cart → chats and views charts tied to a theme on Communicate. Charts are hand-rolled SVG from curated TypeScript analysis, not live SQL. Question refine/suggest in Discover uses the LLM; most insights and story suggestions are pre-queried mocks.

**Explicitly deferred:** Prep/Analyze tabs, auth, cart/notebook persistence, real template API, multi-agent Discover, vector DB/RAG, live chart queries, collaboration backend, admin UI for audit logs.

**Production changes:** auth + multi-tenant storage, persist investigation cart, wire charts to read-only SQL with guardrails, one simple RAG agent before scaling agents, template marketplace API, real sharing/comments, eval + retention on audit logs.

## AI usage log

| # | What I asked | What it gave me | Kept / changed / rejected |
|---|--------------|-----------------|---------------------------|
| 1 | Build a Golden Analytics–style UI from the demo | One ~1,500-line `example.tsx` with every tab in a single file (camelCase, hard to extend) | **Rejected.** Deleted the file. **Kept** the layout idea. Rebuilt module-by-module with Cursor rules (snake_case, `components/`, `lib/`, phased commits). |
| 2 | Design the Supabase schema for the vendor dataset | SQL schema file — then ran the script without asking | **Rejected** the auto-run. Reviewed SQL myself. **Updated** collaboration rules: no DB/deploy commands unless I explicitly approve. |
| 3 | Wire Discover with AI summaries and Communicate charts | Full multi-agent pipeline + chart library (Recharts/Tremor) setup | **Changed scope.** **Kept** mocks from manual SQL queries for insights/charts in the POC. **Kept** a single LLM wrapper for chat + question-assist only. Hand-rolled SVG charts. Deferred agents/RAG until user validation. |

**How I work with AI:** Cursor rule files (coding style, docs, architecture, collaboration), spec-driven pairing (requirements → architecture → implement), split tasks to keep context under ~70%, and code review on every AI diff.

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

See `[.env.example](.env.example)` for required variables.

## Modules


| Area                                                     | Route(s)                 | Doc                                                            |
| -------------------------------------------------------- | ------------------------ | -------------------------------------------------------------- |
| **Templates** — home, marketplace, start a notebook      | `/`, `/templates`        | [docs/template_module.md](docs/template_module.md)             |
| **Database** — connect Washington vendor payments sample | `/workspace/database`    | [docs/sample_data_reference.md](docs/sample_data_reference.md) |
| **Discover** — insights, questions, investigation cart   | `/workspace/discover`    | [docs/discover_module.md](docs/discover_module.md)             |
| **Communicate** — chat + theme-linked dashboard charts   | `/workspace/communicate` | [docs/dashboard_module.md](docs/dashboard_module.md)           |
| **Audit** — append-only LLM input log                    | (backend)                | [docs/audit_module.md](docs/audit_module.md)                   |


Typical flow: **Templates** → **Database** → **Discover** (track themes) → **Communicate** (chat + charts).

## POC notes

Most UI content is mocked or curated in TypeScript — not live SQL or a real template API. Cart and collaboration state are not persisted. Details and shortcuts per module are in the docs above.
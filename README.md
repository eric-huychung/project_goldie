# GOLDIE

> Golden Analytics brother from another mother — **Canva for data.**

**Live demo:** [project-goldie-analytics.vercel.app](https://project-goldie-analytics.vercel.app/)

An AI-native BI POC. Pick a template, connect data, explore questions, chat with context, and view theme-linked charts.

| | |
|---|---|
| **Stack** | Next.js · Supabase · Vercel AI Gateway · Vercel |
| **Flow** | Templates → Database → Discover → Communicate |

---

## 🎯 The problem

Data is everywhere, but for most people it is still trapped behind a technical wall.

Three pains from user research (Reddit, articles, Gemini deep research) that polished BI demos often miss:

| Pain | What happens |
|------|----------------|
| 😵 **Confused onboarding** | Blank screen — users do not know where to start |
| 🔢 **Lost in the numbers** | Drift through rows and dead ends with no clear thread |
| 📧 **Emailing ping pong** | Insights stuck in screenshots and inbox threads |

**Who I built for:** non-technical users first (e.g. a college student writing a capstone on WA State spending). Data analysts second.

**Why this direction (not the others):**

- Mirrored Golden Analytics' notebook flow to compare feature-for-feature
- Pushed harder on easy entry — templates marketplace, quick insights, **investigation cart**
- Skipped **Prep / Analyze** — write-access + transform at scale is a separate product bet
- Did not chase Looker / Tableau depth — bet is guided exploration for non-analysts

---

## 🏗️ Tech & architecture

### What I built

- **Next.js monolith** on Vercel — App Router + serverless API routes
- **Supabase Postgres** — WA vendor payments (FY 2022–2023) + LLM audit log
- **Vercel AI Gateway (Gemini)** — chat + question-assist with static dataset context
- **Hand-rolled SVG charts** — curated TypeScript analysis, not live SQL

### Modules

| Module | Route | What it does |
|--------|-------|--------------|
| 📋 Templates | `/`, `/templates` | Home, marketplace, start a notebook |
| 🗄️ Database | `/workspace/database` | Connect Washington vendor payments sample |
| 🔍 Discover | `/workspace/discover` | Insights, questions, investigation cart |
| 💬 Communicate | `/workspace/communicate` | Chat + theme-linked dashboard charts |
| 📝 Audit | (backend) | Append-only LLM input log |

Module docs: [template](docs/template_module.md) · [database](docs/sample_data_reference.md) · [discover](docs/discover_module.md) · [dashboard](docs/dashboard_module.md) · [audit](docs/audit_module.md)

### How it works

```
Pick template or type a goal
  → Connect sample data
  → Browse insights, track questions in cart
  → Chat + view charts tied to a theme
```

- Discover question refine/suggest uses the LLM; most insights and stories are pre-queried mocks
- Charts read from curated analysis files, not live queries

### Deferred (POC)

- Prep / Analyze tabs
- Auth, cart persistence, real template API
- Multi-agent Discover, vector DB / RAG
- Live chart queries, collaboration backend, audit admin UI

### Production would add

- Auth + multi-tenant storage, persist investigation cart
- Read-only SQL for charts with guardrails
- One simple RAG agent before scaling agents
- Template marketplace API, real sharing / comments
- Eval + retention on audit logs

---

## 🤖 AI usage log

| # | What I asked | What it gave me | Outcome |
|---|--------------|-----------------|---------|
| 1 | Build a Golden Analytics–style UI | ~1,500-line `example.tsx` — every tab in one file | ❌ **Rejected** — deleted it. ✅ Rebuilt module-by-module with Cursor rules |
| 2 | Design Supabase schema for vendor data | SQL file + **auto-ran the script** | ❌ **Rejected** auto-run. ✅ Reviewed SQL myself, tightened collaboration rules |
| 3 | Wire Discover AI + Communicate charts | Full multi-agent pipeline + Recharts setup | 🔄 **Scoped down** — mocks + single LLM wrapper for chat; deferred RAG |

**How I work with AI:** Cursor rule files · spec-driven pairing (requirements → architecture → code) · split tasks (~70% context max) · review every diff

---

## 🚀 Quick start

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

See [`.env.example`](.env.example) for required variables.

---

## 📌 POC notes

Most UI is mocked or curated in TypeScript — not live SQL or a real template API. Cart and collaboration state are not persisted. Per-module shortcuts are in the docs linked above.

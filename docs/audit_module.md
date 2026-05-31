# AI audit log

Append-only log of LLM inputs/outputs for governance. Used by **Communicate chat** today; same Supabase pattern as the vendor dataset.

## Why

Reviewers need to see what was sent to models without digging through server logs.

## POC shortcuts

- No admin UI — inspect rows in Supabase Table Editor
- No retention policy
- Discover question-assist is logged on request/response
- Failed inserts are swallowed so chat keeps working

## Database

**Table:** `public.ai_input_log` · **DDL:** `scripts/schema_audit.sql` (via `npm run db:schema`)

Typical chat turn: `model_request` → `model_response` (with token counts).

## Code

- `lib/audit/log_ai_input.ts` — inserts
- `app/api/communicate/chat/route.ts` — wires request/response logging

## Setup

1. `npm run db:schema`
2. Server env vars per [`.env.example`](../.env.example)
3. Send a chat message → check `ai_input_log` in Supabase

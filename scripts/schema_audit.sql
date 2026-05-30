/**
 * AI audit log (governance) — applied with vendor schema via npm run db:schema.
 */

CREATE TABLE IF NOT EXISTS ai_input_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  component TEXT NOT NULL,
  event_kind TEXT NOT NULL,
  model_id TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  total_tokens INTEGER,
  payload JSONB NOT NULL DEFAULT '{}'::jsonb
);

ALTER TABLE ai_input_log ADD COLUMN IF NOT EXISTS input_tokens INTEGER;
ALTER TABLE ai_input_log ADD COLUMN IF NOT EXISTS output_tokens INTEGER;
ALTER TABLE ai_input_log ADD COLUMN IF NOT EXISTS total_tokens INTEGER;

CREATE INDEX IF NOT EXISTS idx_ai_input_log_created_at
  ON ai_input_log (created_at DESC);

CREATE INDEX IF NOT EXISTS idx_ai_input_log_component
  ON ai_input_log (component, created_at DESC);

/**
 * Normalizes AI SDK usage into simple in/out/total counts for audit logging.
 */

export type token_usage_counts = {
  input_tokens: number | null;
  output_tokens: number | null;
  total_tokens: number | null;
};

type usage_source = {
  inputTokens?: number;
  outputTokens?: number;
  totalTokens?: number;
};

/**
 * @param usage - Token usage from streamText onFinish (totalUsage or step usage)
 * @returns Nullable counts for database columns
 */
export function extract_token_usage(usage: usage_source | undefined): token_usage_counts {
  if (!usage) {
    return { input_tokens: null, output_tokens: null, total_tokens: null };
  }

  const input_tokens = usage.inputTokens ?? null;
  const output_tokens = usage.outputTokens ?? null;
  const total_tokens =
    usage.totalTokens ??
    (input_tokens != null && output_tokens != null
      ? input_tokens + output_tokens
      : null);

  return { input_tokens, output_tokens, total_tokens };
}

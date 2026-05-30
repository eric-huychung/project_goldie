/**
 * Read-only aggregate queries for Communicate chat tools (server-side only).
 */

import { create_server_supabase_client } from "@/lib/supabase/server";

const MAX_LIMIT = 50;

/**
 * @param limit - Row cap (clamped 1–50)
 */
function clamp_limit(limit: number | undefined): number {
  const value = limit ?? 10;
  return Math.min(MAX_LIMIT, Math.max(1, Math.round(value)));
}

type query_error_result = {
  ok: false;
  error: string;
};

type query_ok_result = {
  ok: true;
  rows: Record<string, string | number>[];
};

/**
 * @param limit - Max vendors to return
 * @param fy - Optional fiscal year filter
 */
export async function chat_query_top_vendors(
  limit?: number,
  fy?: number | null,
): Promise<query_ok_result | query_error_result> {
  const supabase = create_server_supabase_client();
  const { data, error } = await supabase.rpc("chat_top_vendors", {
    p_limit: clamp_limit(limit),
    p_fy: fy ?? null,
  });

  if (error) {
    return {
      ok: false,
      error: format_rpc_error(error.message),
    };
  }

  return { ok: true, rows: normalize_aggregate_rows(data) };
}

/**
 * @returns Total spend and payment count per fiscal year
 */
export async function chat_query_spend_by_fiscal_year(): Promise<
  query_ok_result | query_error_result
> {
  const supabase = create_server_supabase_client();
  const { data, error } = await supabase.rpc("chat_spend_by_fiscal_year");

  if (error) {
    return {
      ok: false,
      error: format_rpc_error(error.message),
    };
  }

  return { ok: true, rows: normalize_aggregate_rows(data) };
}

/**
 * @param limit - Max agencies to return
 * @param fy - Optional fiscal year filter
 */
export async function chat_query_top_agencies(
  limit?: number,
  fy?: number | null,
): Promise<query_ok_result | query_error_result> {
  const supabase = create_server_supabase_client();
  const { data, error } = await supabase.rpc("chat_top_agencies", {
    p_limit: clamp_limit(limit),
    p_fy: fy ?? null,
  });

  if (error) {
    return {
      ok: false,
      error: format_rpc_error(error.message),
    };
  }

  return { ok: true, rows: normalize_aggregate_rows(data) };
}

function format_rpc_error(message: string): string {
  const missing =
    message.includes("Could not find the function") ||
    message.includes("does not exist");

  if (missing) {
    return "This dataset query is not available right now.";
  }

  return "Could not run the dataset query. Try again later.";
}

function normalize_aggregate_rows(
  data: unknown,
): Record<string, string | number>[] {
  if (!Array.isArray(data)) {
    return [];
  }

  return data.map((row) => {
    if (!row || typeof row !== "object") {
      return {};
    }

    const normalized: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(row)) {
      if (typeof value === "string" || typeof value === "number") {
        normalized[key] = value;
      } else if (value != null) {
        normalized[key] = String(value);
      }
    }
    return normalized;
  });
}

/**
 * GET /api/datasets/vendor-payments/status — proves DB connection and returns dataset metadata.
 */

import {
  VENDOR_PAYMENTS_DATASET_NAME,
  VENDOR_PAYMENTS_NOTEBOOK_TITLE,
} from "@/lib/datasets/vendor_payments_constants";
import { create_server_supabase_client } from "@/lib/supabase/server";
import type { vendor_payments_status } from "@/lib/types/dataset";

type summary_row = {
  row_count: number;
  fiscal_year_count: number;
  fy_min: number;
  fy_max: number;
  total_amount: string;
  last_imported_at: string;
  column_count: number;
};

/** User-safe message when the dataset cannot be reached. */
const DATASET_UNAVAILABLE_MESSAGE =
  "Could not connect to the dataset. Check your connection and try again.";

/**
 * Builds a disconnected status payload for the client.
 *
 * @returns Status JSON shape with a generic error message only
 */
function disconnected_status(): vendor_payments_status {
  return {
    connected: false,
    name: VENDOR_PAYMENTS_DATASET_NAME,
    notebook_title: VENDOR_PAYMENTS_NOTEBOOK_TITLE,
    row_count: null,
    column_count: null,
    fiscal_year_min: null,
    fiscal_year_max: null,
    total_amount: null,
    last_synced_at: null,
    error_message: DATASET_UNAVAILABLE_MESSAGE,
  };
}

/**
 * Returns vendor payments dataset connection metadata from Supabase.
 */
export async function GET(): Promise<Response> {
  try {
    const supabase = create_server_supabase_client();

    const { data, error } = await supabase
      .from("vendor_payments_dataset_summary")
      .select(
        "row_count, fiscal_year_count, fy_min, fy_max, total_amount, last_imported_at, column_count",
      )
      .single<summary_row>();

    if (error || !data) {
      console.error(
        "vendor-payments status:",
        error?.message ?? "No summary data returned",
      );
      return Response.json(disconnected_status(), { status: 503 });
    }

    const status: vendor_payments_status = {
      connected: true,
      name: VENDOR_PAYMENTS_DATASET_NAME,
      notebook_title: VENDOR_PAYMENTS_NOTEBOOK_TITLE,
      row_count: Number(data.row_count),
      column_count: data.column_count,
      fiscal_year_min: data.fy_min,
      fiscal_year_max: data.fy_max,
      total_amount: data.total_amount,
      last_synced_at: data.last_imported_at,
    };

    return Response.json(status);
  } catch (error: unknown) {
    console.error(
      "vendor-payments status:",
      error instanceof Error ? error.message : "Database connection failed",
    );

    return Response.json(disconnected_status(), { status: 503 });
  }
}

/**
 * Dataset connection types for the Database workspace and status API.
 */

export type vendor_payments_status = {
  connected: boolean;
  name: string;
  workbook_title: string;
  row_count: number | null;
  column_count: number | null;
  fiscal_year_min: number | null;
  fiscal_year_max: number | null;
  total_amount: string | null;
  last_synced_at: string | null;
  error_message?: string;
};

export type dataset_connection_state = "idle" | "loading" | "connected" | "error";

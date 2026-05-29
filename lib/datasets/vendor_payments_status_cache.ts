/**
 * Client-side cache and fetch for vendor payments dataset status (Database + Discover).
 */

import {
  VENDOR_PAYMENTS_DATASET_NAME,
  VENDOR_PAYMENTS_NOTEBOOK_TITLE,
} from "@/lib/datasets/vendor_payments_constants";
import type { vendor_payments_status } from "@/lib/types/dataset";

export const VENDOR_PAYMENTS_STATUS_CACHE_KEY = "vendor_payments_status_v2";

export const VENDOR_PAYMENTS_STATUS_API_PATH =
  "/api/datasets/vendor-payments/status";

/**
 * Reads cached status from localStorage (set by Database connect or manual refresh).
 *
 * @returns Parsed status or null when missing or invalid
 */
export function read_vendor_payments_status_cache(): vendor_payments_status | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(VENDOR_PAYMENTS_STATUS_CACHE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as vendor_payments_status;
  } catch {
    localStorage.removeItem(VENDOR_PAYMENTS_STATUS_CACHE_KEY);
    return null;
  }
}

/**
 * Persists status to localStorage for other workspace tabs.
 *
 * @param status - Latest status payload
 */
export function write_vendor_payments_status_cache(
  status: vendor_payments_status,
): void {
  localStorage.setItem(
    VENDOR_PAYMENTS_STATUS_CACHE_KEY,
    JSON.stringify(status),
  );
}

/**
 * Clears cached status (e.g. after a failed fetch on Database).
 */
export function clear_vendor_payments_status_cache(): void {
  localStorage.removeItem(VENDOR_PAYMENTS_STATUS_CACHE_KEY);
}

/**
 * @returns Disconnected fallback when the API is unreachable
 */
export function disconnected_vendor_payments_status(
  error_message: string,
): vendor_payments_status {
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
    error_message,
  };
}

/**
 * Fetches status from the API and updates the cache.
 *
 * @returns Latest status from the server
 */
export async function fetch_vendor_payments_status(): Promise<vendor_payments_status> {
  const response = await fetch(VENDOR_PAYMENTS_STATUS_API_PATH);
  const body = (await response.json()) as vendor_payments_status;
  write_vendor_payments_status_cache(body);
  return body;
}

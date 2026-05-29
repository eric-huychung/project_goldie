/**
 * Hook for vendor payments status — cache on mount, optional API refresh.
 */

"use client";

import { useCallback, useEffect, useState } from "react";

import {
  disconnected_vendor_payments_status,
  fetch_vendor_payments_status,
  read_vendor_payments_status_cache,
} from "@/lib/datasets/vendor_payments_status_cache";
import type { vendor_payments_status } from "@/lib/types/dataset";

type use_vendor_payments_status_options = {
  /** When true, calls the status API on mount (Database connect flow). Default false. */
  fetch_on_mount?: boolean;
};

/**
 * Loads dataset status from cache; refresh() hits the API and updates cache.
 *
 * @param options - Pass fetch_on_mount only where the API should run automatically
 */
export function use_vendor_payments_status(
  options: use_vendor_payments_status_options = {},
) {
  const { fetch_on_mount = false } = options;
  const [status, set_status] = useState<vendor_payments_status | null>(null);
  const [is_refreshing, set_is_refreshing] = useState(false);

  const load_from_cache = useCallback(() => {
    set_status(read_vendor_payments_status_cache());
  }, []);

  const refresh = useCallback(async () => {
    set_is_refreshing(true);

    try {
      const body = await fetch_vendor_payments_status();
      set_status(body);
    } catch {
      const cached = read_vendor_payments_status_cache();
      set_status(
        cached ??
          disconnected_vendor_payments_status(
            "Could not reach the status API",
          ),
      );
    } finally {
      set_is_refreshing(false);
    }
  }, []);

  useEffect(() => {
    load_from_cache();

    if (fetch_on_mount) {
      void refresh();
    }
  }, [fetch_on_mount, load_from_cache, refresh]);

  return { status, is_refreshing, refresh, load_from_cache };
}

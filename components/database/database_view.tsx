/**
 * Database workspace tab — sample dataset connect flow (Phase 2a).
 */

"use client";

import { useCallback, useEffect, useState } from "react";
import { Cloud, FileSpreadsheet, FolderOpen, Upload } from "lucide-react";

import { ConnectedDatasetCard } from "@/components/database/connected_dataset_card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  VENDOR_PAYMENTS_DATASET_NAME,
  VENDOR_PAYMENTS_WORKBOOK_TITLE,
} from "@/lib/datasets/vendor_payments_constants";
import type {
  dataset_connection_state,
  vendor_payments_status,
} from "@/lib/types/dataset";

const STATUS_API_PATH = "/api/datasets/vendor-payments/status";
const STATUS_CACHE_KEY = "vendor_payments_status_v1";

type sidebar_tab = "sample" | "upload" | "cloud";

/**
 * Database tab UI aligned with docs/example.tsx DatabaseView.
 */
export function DatabaseView() {
  const [active_tab, set_active_tab] = useState<sidebar_tab>("sample");
  const [connection_state, set_connection_state] =
    useState<dataset_connection_state>("idle");
  const [status, set_status] = useState<vendor_payments_status | null>(null);

  useEffect(() => {
    const cached = localStorage.getItem(STATUS_CACHE_KEY);
    if (!cached) {
      return;
    }

    try {
      const parsed = JSON.parse(cached) as vendor_payments_status;
      set_status(parsed);
      set_connection_state(parsed.connected ? "connected" : "error");
    } catch {
      localStorage.removeItem(STATUS_CACHE_KEY);
    }
  }, []);

  const cache_status = useCallback((next_status: vendor_payments_status) => {
    localStorage.setItem(STATUS_CACHE_KEY, JSON.stringify(next_status));
  }, []);

  const fetch_status = useCallback(async () => {
    set_connection_state("loading");

    try {
      const response = await fetch(STATUS_API_PATH);
      const body = (await response.json()) as vendor_payments_status;

      set_status(body);
      cache_status(body);

      if (body.connected) {
        set_connection_state("connected");
      } else {
        set_connection_state("error");
      }
    } catch {
      set_connection_state("error");
      set_status({
        connected: false,
        name: VENDOR_PAYMENTS_DATASET_NAME,
        workbook_title: VENDOR_PAYMENTS_WORKBOOK_TITLE,
        row_count: null,
        column_count: null,
        fiscal_year_min: null,
        fiscal_year_max: null,
        total_amount: null,
        last_synced_at: null,
        error_message: "Could not reach the status API",
      });
      localStorage.removeItem(STATUS_CACHE_KEY);
    }
  }, [cache_status]);

  const sidebar_items = [
    {
      icon: FileSpreadsheet,
      label: "Sample datasets",
      key: "sample" as const,
      enabled: true,
    },
    {
      icon: Upload,
      label: "Upload files",
      key: "upload" as const,
      enabled: true,
    },
    {
      icon: Cloud,
      label: "Cloud data sources",
      key: "cloud" as const,
      enabled: true,
    },
    {
      icon: FolderOpen,
      label: "Saved datasets",
      key: "saved" as const,
      enabled: false,
    },
  ];

  return (
    <div className="flex h-full">
      <aside className="w-64 bg-white border-r border-[#e5e7eb] p-4 shrink-0">
        <div className="mb-6 p-3 bg-[#f8f9fa] rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Workbook</p>
          <p className="text-sm font-medium text-[#1f2937] leading-snug">
            {VENDOR_PAYMENTS_WORKBOOK_TITLE}
          </p>
        </div>

        <nav className="space-y-1">
          {sidebar_items.map((item) => (
            <button
              key={item.label}
              type="button"
              disabled={!item.enabled}
              onClick={() => {
                if (
                  item.enabled &&
                  (item.key === "sample" ||
                    item.key === "upload" ||
                    item.key === "cloud")
                ) {
                  set_active_tab(item.key);
                }
              }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                item.key === active_tab
                  ? "bg-[#f8f9fa] text-[#1f2937] font-medium"
                  : "text-muted-foreground hover:bg-[#f8f9fa] hover:text-[#1f2937]"
              } ${!item.enabled ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl">
          {active_tab === "sample" && (
            <ConnectedDatasetCard
              dataset_name={VENDOR_PAYMENTS_DATASET_NAME}
              connection_state={connection_state}
              status={status}
              on_connect={fetch_status}
              on_reconnect={fetch_status}
            />
          )}

          {(active_tab === "upload" || active_tab === "cloud") && (
            <Card className="bg-white border-[#e5e7eb]">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#f8f9fa] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  {active_tab === "upload" ? (
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  ) : (
                    <Cloud className="w-8 h-8 text-muted-foreground" />
                  )}
                </div>
                <h2 className="text-xl font-semibold text-[#1f2937] mb-2">
                  {active_tab === "upload" ? "Upload Files" : "Cloud Data Sources"}
                </h2>
                <Badge variant="secondary" className="mb-4">
                  Core Architecture Mirror — No Update
                </Badge>
                <p className="text-muted-foreground text-sm">
                  This feature is part of the core architecture and will be
                  available in future updates.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

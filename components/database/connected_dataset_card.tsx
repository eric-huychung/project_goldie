/**
 * Primary dataset card on the Database tab — connect, connected, and reconnect states.
 */

"use client";

import { FileSpreadsheet, Loader2, Plug, RefreshCw } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type {
  dataset_connection_state,
  vendor_payments_status,
} from "@/lib/types/dataset";

type connected_dataset_card_props = {
  dataset_name: string;
  connection_state: dataset_connection_state;
  status: vendor_payments_status | null;
  on_connect: () => void;
  on_reconnect: () => void;
};

/**
 * Formats the status timestamp as a local "Last updated" label.
 *
 * @param iso_string - ISO timestamp returned by the status API
 * @returns Readable timestamp text for the card footer
 */
function format_last_updated(iso_string: string): string {
  const date = new Date(iso_string);
  if (Number.isNaN(date.getTime())) {
    return "Last updated unknown";
  }

  return `Last updated ${date.toLocaleString()}`;
}

/**
 * Formats row count and column count for the subtitle line.
 *
 * @param status - Latest status from the API
 * @returns Subtitle string or null when not connected
 */
function format_stats_line(status: vendor_payments_status | null): string | null {
  if (!status?.connected || status.row_count === null) {
    return null;
  }

  const parts = [`${status.row_count.toLocaleString()} rows`];

  if (status.column_count !== null) {
    parts.push(`${status.column_count} columns`);
  }

  if (
    status.fiscal_year_min !== null &&
    status.fiscal_year_max !== null
  ) {
    parts.push(`FY ${status.fiscal_year_min}–${status.fiscal_year_max}`);
  }

  return parts.join(" • ");
}

/**
 * @param props - Dataset label, connection state, and connect handlers
 */
export function ConnectedDatasetCard({
  dataset_name,
  connection_state,
  status,
  on_connect,
  on_reconnect,
}: connected_dataset_card_props) {
  const is_connected = connection_state === "connected";
  const is_loading = connection_state === "loading";
  const stats_line = format_stats_line(status);

  return (
    <Card className="bg-white border-[#e5e7eb]">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center shrink-0">
              <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-medium text-[#1f2937] leading-snug">
                  {dataset_name}
                </h2>
                {is_connected && (
                  <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 shrink-0">
                    Connected
                  </Badge>
                )}
                {connection_state === "idle" && (
                  <Badge variant="secondary" className="shrink-0">
                    Not connected
                  </Badge>
                )}
                {connection_state === "error" && (
                  <Badge className="bg-red-100 text-red-700 hover:bg-red-100 shrink-0">
                    Connection failed
                  </Badge>
                )}
              </div>
              {stats_line && (
                <p className="text-sm text-muted-foreground mt-1">{stats_line}</p>
              )}
              {is_connected && status?.last_synced_at && (
                <p className="text-sm text-muted-foreground mt-1">
                  {format_last_updated(status.last_synced_at)}
                </p>
              )}
              {connection_state === "idle" && (
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to verify this dataset in Supabase.
                </p>
              )}
              {connection_state === "error" && status?.error_message && (
                <p className="text-sm text-red-600 mt-1">{status.error_message}</p>
              )}
            </div>
          </div>

          <div className="shrink-0">
            {!is_connected && (
              <Button
                size="default"
                className="gap-2"
                disabled={is_loading}
                onClick={on_connect}
              >
                {is_loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Plug className="w-4 h-4" />
                )}
                Connect
              </Button>
            )}
            {is_connected && (
              <Button
                variant="ghost"
                size="default"
                className="text-muted-foreground gap-2"
                disabled={is_loading}
                onClick={on_reconnect}
              >
                {is_loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Reconnect
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

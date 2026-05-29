/**
 * Dataset summary card on Discover — live stats from the status API.
 */

"use client";

import { FileSpreadsheet } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { format_discover_stats_line } from "@/lib/discover/format_dataset_stats";
import { VENDOR_PAYMENTS_DISCOVER_BLURB } from "@/lib/mock/discover_dataset_blurb";
import type { vendor_payments_status } from "@/lib/types/dataset";

type dataset_summary_card_props = {
  status: vendor_payments_status | null;
  is_loading?: boolean;
};

/**
 * @param props - Vendor payments status from GET /api/datasets/vendor-payments/status
 */
export function DatasetSummaryCard({
  status,
  is_loading = false,
}: dataset_summary_card_props) {
  const dataset_name = status?.name ?? "Vendor payments dataset";
  const stats_line = is_loading
    ? "Loading dataset stats..."
    : format_discover_stats_line(status);

  return (
    <Card className="bg-white border-[#e5e7eb] mb-8">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-[#f8f9fa] rounded-xl flex items-center justify-center shrink-0">
            <FileSpreadsheet className="w-6 h-6 text-[#1f2937]" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-[#1f2937] mb-1">
              {dataset_name}
            </h2>
            <p className="text-sm text-muted-foreground mb-3">{stats_line}</p>
            <p className="text-sm text-muted-foreground max-w-2xl">
              {VENDOR_PAYMENTS_DISCOVER_BLURB}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/**
 * Discover tab page header.
 */

import { Compass, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VENDOR_PAYMENTS_NOTEBOOK_TITLE } from "@/lib/datasets/vendor_payments_constants";

type discover_header_props = {
  on_refresh?: () => void;
  is_refreshing?: boolean;
};

/**
 * @param props - Optional refresh handler for dataset status
 */
export function DiscoverHeader({
  on_refresh,
  is_refreshing = false,
}: discover_header_props) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
          <Compass className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-[#1f2937]">
            Discover your data
          </h1>
          <p className="text-sm text-muted-foreground">
            Explore{" "}
            <span className="font-medium">{VENDOR_PAYMENTS_NOTEBOOK_TITLE}</span>
          </p>
        </div>
      </div>
      {on_refresh ? (
        <Button
          variant="secondary"
          className="gap-2 border border-[#e5e7eb] bg-white"
          onClick={on_refresh}
          disabled={is_refreshing}
        >
          <RefreshCw
            className={`w-4 h-4 ${is_refreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </Button>
      ) : null}
    </div>
  );
}

/**
 * Right-panel placeholder until Phase 4d dashboard canvas ships.
 */

import { FileSpreadsheet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VENDOR_PAYMENTS_NOTEBOOK_TITLE } from "@/lib/datasets/vendor_payments_constants";

/**
 * Mock canvas chrome with empty dashboard body.
 */
export function CommunicateCanvasPlaceholder() {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="secondary" className="text-xs gap-1">
          <span className="text-muted-foreground">Dashboard</span>
        </Badge>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>55%</span>
          <span>•</span>
          <span>16:9 HD</span>
          <span>•</span>
          <Badge variant="secondary" className="text-xs gap-1">
            <FileSpreadsheet className="w-3 h-3" />
            {VENDOR_PAYMENTS_NOTEBOOK_TITLE}
          </Badge>
        </div>
      </div>

      <Card className="bg-white border-[#e5e7eb] shadow-sm">
        <CardContent className="p-12 text-center">
          <h2 className="text-lg font-semibold text-[#1f2937] mb-2">
            Presentation canvas
          </h2>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            Interactive dashboards per investigation theme ship in Phase 4d.
            Use the chat to explore the vendor payments data for now.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Footer product tag on the home page.
 */

import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/**
 * Renders the “AI-Native Business Intelligence” footer badge.
 */
export function HomeFooterBadge() {
  return (
    <div className="text-center pb-8">
      <Badge variant="secondary" className="bg-[#f3f4f6] text-muted-foreground px-4 py-2">
        <Sparkles className="w-3 h-3 mr-2" />
        AI-Native Business Intelligence
      </Badge>
    </div>
  );
}

/**
 * Single marketplace template card (home featured row and full grid).
 */

import { Heart } from "lucide-react";
import type { template_record } from "@/lib/types/template";
import { get_template_icon } from "@/lib/templates/icon_map";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type template_card_props = {
  template: template_record;
  on_click: () => void;
  show_category_badge?: boolean;
  show_meta?: boolean;
};

/**
 * @param props - Template data, click handler, optional badges and creator/likes row
 */
export function TemplateCard({
  template,
  on_click,
  show_category_badge = false,
  show_meta = false,
}: template_card_props) {
  const Icon = get_template_icon(template.icon_key);

  return (
    <Card
      className="bg-white border-[#e5e7eb] hover:border-amber-300 hover:shadow-lg transition-all cursor-pointer group"
      onClick={on_click}
    >
      <CardHeader className="pb-3">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 border ${template.color_class} group-hover:scale-105 transition-transform`}
        >
          <Icon className="w-6 h-6" />
        </div>
        <CardTitle className="text-lg text-[#1f2937] text-left">{template.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-left text-muted-foreground">
          {template.description}
        </CardDescription>
        {show_meta && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#f3f4f6] text-xs text-muted-foreground">
            <span>{template.creator_name}</span>
            <span className="flex items-center gap-1 text-[#1f2937]">
              <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
              {template.like_count}
            </span>
          </div>
        )}
        {show_category_badge && (
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <Badge variant="secondary" className="text-xs">
              {template.category}
            </Badge>
            {template.ownership === "shared" && (
              <Badge variant="secondary" className="text-xs bg-[#eff6ff] text-[#0369a1]">
                Shared with you
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

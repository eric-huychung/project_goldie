/**
 * Responsive grid of template cards.
 */

import type { template_record } from "@/lib/types/template";
import { TemplateCard } from "@/components/templates/template_card";
import { cn } from "@/lib/utils";

type template_grid_props = {
  templates: template_record[];
  on_select: (template_id: string) => void;
  layout?: "home" | "marketplace";
  show_category_badge?: boolean;
  show_meta?: boolean;
};

/**
 * @param props - Templates list, selection callback, and layout variant
 */
export function TemplateGrid({
  templates,
  on_select,
  layout = "home",
  show_category_badge = false,
  show_meta = false,
}: template_grid_props) {
  const grid_class =
    layout === "home"
      ? "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
      : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6";

  return (
    <div className={cn(grid_class)}>
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          on_click={() => on_select(template.id)}
          show_category_badge={show_category_badge}
          show_meta={show_meta}
        />
      ))}
    </div>
  );
}

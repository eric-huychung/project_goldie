/**
 * Marketplace section heading with a template grid or empty state.
 */

import type { template_record } from "@/lib/types/template";
import { TemplateGrid } from "@/components/templates/template_grid";

type template_section_props = {
  title: string;
  subtitle?: string;
  templates: template_record[];
  on_select: (template_id: string) => void;
  empty_message: string;
};

/**
 * @param props - Section label, templates, and empty copy
 */
export function TemplateSection({
  title,
  subtitle,
  templates,
  on_select,
  empty_message,
}: template_section_props) {
  return (
    <section className="mb-12">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-[#1f2937]">{title}</h2>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      {templates.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center border border-dashed border-[#e5e7eb] rounded-xl bg-white">
          {empty_message}
        </p>
      ) : (
        <TemplateGrid
          templates={templates}
          on_select={on_select}
          layout="marketplace"
          show_category_badge
          show_meta
        />
      )}
    </section>
  );
}

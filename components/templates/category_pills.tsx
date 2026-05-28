/**
 * Category filter pills for the templates marketplace page.
 */

import type { template_category } from "@/lib/types/template";

type category_pills_props = {
  categories: template_category[];
  active_category: string;
  on_change: (value: string) => void;
};

/**
 * @param props - Category options and active selection
 */
export function CategoryPills({
  categories,
  active_category,
  on_change,
}: category_pills_props) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
      {categories.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => on_change(cat.value)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
            active_category === cat.value
              ? "bg-[#1f2937] text-white"
              : "bg-white border border-[#e5e7eb] text-muted-foreground hover:border-[#1f2937]"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}

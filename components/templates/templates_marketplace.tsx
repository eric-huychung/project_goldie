/**
 * Full templates marketplace with public/private sections and create flow.
 */

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Plus, Search } from "lucide-react";
import { GoldieLogo } from "@/components/branding/goldie_logo";
import { CategoryPills } from "@/components/templates/category_pills";
import { CreateTemplateModal } from "@/components/templates/create_template_modal";
import { TemplateSection } from "@/components/templates/template_section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MOCK_CATEGORIES, MOCK_TEMPLATES } from "@/lib/mock/templates";
import { filter_templates } from "@/lib/templates/filter_templates";
import { split_templates_by_visibility } from "@/lib/templates/split_templates";
import { start_workbook } from "@/lib/workbook/start_workbook";

/**
 * Client marketplace screen with public/private template sections.
 */
export function TemplatesMarketplace() {
  const [search_query, set_search_query] = useState("");
  const [active_category, set_active_category] = useState("all");
  const [create_modal_open, set_create_modal_open] = useState(false);

  const { public_templates, private_templates } = useMemo(() => {
    const filtered = filter_templates(MOCK_TEMPLATES, search_query, active_category);
    return split_templates_by_visibility(filtered);
  }, [search_query, active_category]);

  const handle_template_select = (template_id: string) => {
    start_workbook({ kind: "template", template_id });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Back to home">
              <ArrowRight className="w-4 h-4 rotate-180" />
            </Link>
          </Button>
          <GoldieLogo size="compact" />
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-[#1f2937] text-center mb-6">Templates</h1>

        <button
          type="button"
          onClick={() => set_create_modal_open(true)}
          className="flex items-center justify-center gap-2 w-full max-w-md mx-auto mb-8 px-4 py-3 rounded-xl border border-dashed border-amber-300 bg-amber-50/50 text-sm font-medium text-[#1f2937] hover:bg-amber-50 hover:border-amber-400 transition-colors"
        >
          <Plus className="w-4 h-4 text-amber-600" />
          Create your own template
        </button>

        <div className="relative max-w-xl mx-auto mb-8">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <Input
            type="text"
            placeholder="Search templates..."
            className="w-full pl-12 py-5 text-base rounded-xl border-[#e5e7eb] bg-white"
            value={search_query}
            onChange={(event) => set_search_query(event.target.value)}
          />
        </div>

        <CategoryPills
          categories={MOCK_CATEGORIES}
          active_category={active_category}
          on_change={set_active_category}
        />

        <TemplateSection
          title="Public"
          subtitle="Templates from GOLDIE and the community"
          templates={public_templates}
          on_select={handle_template_select}
          empty_message="No public templates match your search."
        />

        <TemplateSection
          title="Private"
          subtitle="Yours and shared with you"
          templates={private_templates}
          on_select={handle_template_select}
          empty_message="No private templates match your search."
        />
      </div>

      <CreateTemplateModal
        open={create_modal_open}
        on_close={() => set_create_modal_open(false)}
      />
    </div>
  );
}

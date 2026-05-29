/**
 * Home page (Phase 1): hero, featured templates, link to full marketplace.
 */

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LayoutGrid } from "lucide-react";
import { GoldieLogo } from "@/components/branding/goldie_logo";
import { HomeHero } from "@/components/home/home_hero";
import { HomeFooterBadge } from "@/components/home/home_footer_badge";
import { TemplateGrid } from "@/components/templates/template_grid";
import { Button } from "@/components/ui/button";
import { get_featured_templates } from "@/lib/mock/templates";
import { push_notebook_entry } from "@/lib/notebook/push_notebook_entry";

/**
 * Client home screen matching app/example.tsx HomeView.
 */
export function HomePage() {
  const [search_query, set_search_query] = useState("");
  const featured_templates = get_featured_templates(3);
  const router = useRouter();

  const handle_template_select = (template_id: string) => {
    push_notebook_entry(router, { kind: "template", template_id });
  };

  const handle_search_submit = (event: React.FormEvent) => {
    event.preventDefault();
    const prompt = search_query.trim();
    if (prompt) {
      push_notebook_entry(router, { kind: "prompt", prompt });
    }
  };

  const handle_blank_notebook = () => {
    push_notebook_entry(router, { kind: "blank" });
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <header className="bg-white border-b border-[#e5e7eb]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <GoldieLogo size="home" />
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <HomeHero
          search_query={search_query}
          on_search_change={set_search_query}
          on_search_submit={handle_search_submit}
          on_blank_notebook={handle_blank_notebook}
        />

        <div className="flex items-center justify-between max-w-5xl mx-auto mb-6">
          <h2 className="text-lg font-semibold text-[#1f2937]">Templates</h2>
          <Button variant="ghost" className="text-muted-foreground gap-2" asChild>
            <Link href="/templates">
              <LayoutGrid className="w-4 h-4" />
              View all templates
            </Link>
          </Button>
        </div>

        <TemplateGrid
          templates={featured_templates}
          on_select={handle_template_select}
          layout="home"
        />
      </div>

      <HomeFooterBadge />
    </div>
  );
}

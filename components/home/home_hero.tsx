/**
 * Home hero: headline, AI search bar, and blank workbook link.
 */

import { ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

type home_hero_props = {
  search_query: string;
  on_search_change: (value: string) => void;
  on_search_submit: (event: React.FormEvent) => void;
  on_blank_workbook: () => void;
};

/**
 * @param props - Controlled search state and action callbacks
 */
export function HomeHero({
  search_query,
  on_search_change,
  on_search_submit,
  on_blank_workbook,
}: home_hero_props) {
  return (
    <>
      <h1 className="text-4xl font-bold text-[#1f2937] mb-10 text-balance">
        What will you analyze today?
      </h1>

      <form onSubmit={on_search_submit} className="relative max-w-2xl mx-auto mb-3">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
          <Search className="w-5 h-5" />
        </div>
        <Input
          type="text"
          placeholder="Describe your analytic goal..."
          className="w-full pl-12 pr-12 py-6 text-base rounded-2xl border-[#e5e7eb] bg-white shadow-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
          value={search_query}
          onChange={(event) => on_search_change(event.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center text-white hover:opacity-90 transition-opacity"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mb-16">
        <button
          type="button"
          onClick={on_blank_workbook}
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-amber-600 hover:underline transition-colors group"
        >
          or start with a blank workbook
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </>
  );
}

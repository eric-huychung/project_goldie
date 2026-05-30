/**
 * Discover workspace tab — dataset summary, insights, questions, and visualizations.
 */

"use client";

import { AskOwnQuestionSection } from "@/components/discover/ask_own_question_section";
import { DatasetSummaryCard } from "@/components/discover/dataset_summary_card";
import { DiscoverHeader } from "@/components/discover/discover_header";
import { KeyQuestionsSection } from "@/components/discover/key_questions_section";
import { QuickInsightsSection } from "@/components/discover/quick_insights_section";
import { SuggestedVisualizationsSection } from "@/components/discover/suggested_visualizations_section";
import { use_vendor_payments_status } from "@/lib/datasets/use_vendor_payments_status";

/**
 * Full Discover tab UI (Phase 2b).
 */
export function DiscoverView() {
  const { status, is_refreshing, refresh } = use_vendor_payments_status();

  return (
    <div className="h-full overflow-auto">
      <div className="p-8 max-w-5xl mx-auto">
        <DiscoverHeader on_refresh={refresh} is_refreshing={is_refreshing} />
        <DatasetSummaryCard status={status} is_loading={is_refreshing} />
        <QuickInsightsSection />
        <KeyQuestionsSection />
        <AskOwnQuestionSection />
        <SuggestedVisualizationsSection />
      </div>
    </div>
  );
}

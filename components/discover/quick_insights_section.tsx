/**
 * Quick insights feed — facts from the data that can become tracked questions.
 */

"use client";

import { Zap } from "lucide-react";

import { TrackQuestionButton } from "@/components/discover/track_question_button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_QUICK_INSIGHTS } from "@/lib/mock/discover_quick_insights";

/**
 * Renders mock quick insights with track-as-question actions.
 */
export function QuickInsightsSection() {
  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-5 h-5 text-emerald-500" />
        <h2 className="text-lg font-semibold text-[#1f2937]">Quick insights</h2>
        <Badge variant="secondary" className="ml-1">
          {MOCK_QUICK_INSIGHTS.length}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Facts surfaced from your data. Track any insight as a question to
        investigate further.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {MOCK_QUICK_INSIGHTS.map((insight) => {
          const question_id = `insight-${insight.id}`;

          return (
            <Card
              key={insight.id}
              className="bg-white border-[#e5e7eb] hover:border-emerald-300 transition-colors"
            >
              <CardContent className="p-4">
                <p className="text-sm text-[#1f2937] mb-3">{insight.fact}</p>
                <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                  → {insight.suggested_question}
                </p>
                <div className="flex justify-end">
                  <TrackQuestionButton
                    question_id={question_id}
                    question_text={insight.suggested_question}
                  />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

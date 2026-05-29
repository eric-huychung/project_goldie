/**
 * Key questions found — template-tuned starting questions with per-question track.
 */

"use client";

import { HelpCircle } from "lucide-react";

import { TrackQuestionButton } from "@/components/discover/track_question_button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MOCK_KEY_QUESTION_THEMES } from "@/lib/mock/discover_key_questions";
import { cn } from "@/lib/utils";
import { use_investigation_cart } from "@/components/workspace/investigation_cart_provider";

/**
 * Grid of key question themes; each sub-question is individually trackable.
 */
export function KeyQuestionsSection() {
  const { is_question_tracked } = use_investigation_cart();

  const question_count = MOCK_KEY_QUESTION_THEMES.reduce(
    (sum, theme) => sum + theme.questions.length,
    0,
  );

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-amber-500" />
        <h2 className="text-lg font-semibold text-[#1f2937]">
          Key questions found
        </h2>
        <Badge variant="secondary" className="ml-1">
          {question_count}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Starting points based on your notebook template and data shape. Edit
        wording after you track a question in the investigation cart.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {MOCK_KEY_QUESTION_THEMES.map((theme) => {
          const any_tracked = theme.questions.some((q) =>
            is_question_tracked(q.id),
          );

          return (
            <Card
              key={theme.id}
              className={cn(
                "bg-white border-[#e5e7eb] transition-all",
                any_tracked
                  ? "border-amber-400 ring-1 ring-amber-400 bg-amber-50/30"
                  : "hover:border-amber-300 hover:shadow-md",
              )}
            >
              <CardHeader className="pb-3">
                <div className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center mb-2">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                </div>
                <CardTitle className="text-base text-[#1f2937]">
                  {theme.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4 pt-0">
                <CardDescription className="text-sm mb-4">
                  {theme.description}
                </CardDescription>
                <div className="space-y-3">
                  {theme.questions.map((question) => {
                    const tracked = is_question_tracked(question.id);

                    return (
                      <div
                        key={question.id}
                        className={cn(
                          "rounded-lg border border-[#e5e7eb] p-2.5",
                          tracked && "border-amber-300 bg-amber-50/50",
                        )}
                      >
                        <p className="text-xs text-[#1f2937] mb-2 leading-relaxed">
                          {question.text}
                        </p>
                        <div className="flex justify-end">
                          <TrackQuestionButton
                            question_id={question.id}
                            question_text={question.text}
                            theme_id={theme.id}
                            theme_name={theme.title}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

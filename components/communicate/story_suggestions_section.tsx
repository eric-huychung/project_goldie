/**
 * Story suggestions for the Communicate Data Storyteller panel.
 */

"use client";

import { Lightbulb } from "lucide-react";

import { AddStoryButton } from "@/components/communicate/add_story_button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { MOCK_STORY_SUGGESTIONS } from "@/lib/mock/story_suggestions";

/**
 * Suggested narratives styled like Discover quick insights.
 */
export function StorySuggestionsSection() {
  return (
    <section className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="text-sm font-semibold text-[#1f2937]">Story suggestions</h3>
        <Badge variant="secondary" className="ml-1 text-xs">
          {MOCK_STORY_SUGGESTIONS.length}
        </Badge>
      </div>
      <p className="text-xs text-muted-foreground mb-3">
        Add a draft story to your investigation cart, then edit it there.
      </p>

      <div className="space-y-3">
        {MOCK_STORY_SUGGESTIONS.map((suggestion) => (
          <Card
            key={suggestion.id}
            className="bg-white border-[#e5e7eb] hover:border-amber-300 transition-colors"
          >
            <CardContent className="p-4">
              <p className="text-sm font-medium text-[#1f2937] mb-2">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground mb-3 line-clamp-4 leading-relaxed">
                {suggestion.body}
              </p>
              <div className="flex justify-end">
                <AddStoryButton
                  story_id={suggestion.id}
                  title={suggestion.title}
                  body={suggestion.body}
                  theme_id={suggestion.theme_id ?? undefined}
                  theme_name={suggestion.theme_name}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

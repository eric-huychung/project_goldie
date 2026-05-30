/**
 * Workspace-wide state for tracked investigation questions and themes (Discover cart).
 */

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { pick_theme_color_key } from "@/lib/discover/investigation_theme_colors";
import { UNCATEGORIZED_THEME_ID } from "@/lib/discover/uncategorized_theme";
import type {
  add_story_options,
  investigation_cart_panel,
  investigation_story,
  investigation_theme,
  investigation_theme_color_key,
  track_question_options,
  tracked_question,
  tracked_question_status,
} from "@/lib/types/discover";

type investigation_cart_context_value = {
  cart_open: boolean;
  set_cart_open: (open: boolean) => void;
  toggle_cart: () => void;
  themes: investigation_theme[];
  tracked_questions: tracked_question[];
  is_question_tracked: (id: string) => boolean;
  track_question: (
    id: string,
    text: string,
    options?: track_question_options,
  ) => void;
  untrack_question: (id: string) => void;
  update_question_text: (id: string, text: string) => void;
  update_question_status: (id: string, status: tracked_question_status) => void;
  update_question_notes: (id: string, notes: string) => void;
  set_question_theme: (question_id: string, theme_id: string | null) => void;
  add_custom_question: (text: string, theme_id?: string | null) => void;
  add_theme: (name: string, color_key: investigation_theme_color_key) => string;
  remove_theme: (theme_id: string) => void;
  update_theme_color: (
    theme_id: string,
    color_key: investigation_theme_color_key,
  ) => void;
  uncategorized_color_key: investigation_theme_color_key;
  show_uncategorized_group: boolean;
  delete_theme_group: (theme_id: string) => void;
  tracked_stories: investigation_story[];
  cart_panel: investigation_cart_panel;
  set_cart_panel: (panel: investigation_cart_panel) => void;
  is_story_added: (id: string) => boolean;
  add_story: (
    id: string,
    title: string,
    body: string,
    options?: add_story_options,
  ) => void;
  add_custom_story: (title: string, body?: string) => void;
  remove_story: (id: string) => void;
  update_story_title: (id: string, title: string) => void;
  update_story_body: (id: string, body: string) => void;
};

const InvestigationCartContext =
  createContext<investigation_cart_context_value | null>(null);

/**
 * @param props - Child workspace routes
 */
export function InvestigationCartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart_open, set_cart_open] = useState(false);
  const [themes, set_themes] = useState<investigation_theme[]>([]);
  const [uncategorized_color_key, set_uncategorized_color_key] =
    useState<investigation_theme_color_key>("slate");
  const [show_uncategorized_group, set_show_uncategorized_group] =
    useState(true);
  const [tracked_questions, set_tracked_questions] = useState<
    tracked_question[]
  >([]);
  const [tracked_stories, set_tracked_stories] = useState<investigation_story[]>(
    [],
  );
  const [cart_panel, set_cart_panel] =
    useState<investigation_cart_panel>("themes");

  const ensure_theme = useCallback(
    (theme_id: string, theme_name: string) => {
      set_themes((prev) => {
        if (prev.some((t) => t.id === theme_id)) {
          return prev;
        }

        return [
          ...prev,
          {
            id: theme_id,
            name: theme_name,
            color_key: pick_theme_color_key(prev.length),
          },
        ];
      });
    },
    [],
  );

  const is_question_tracked = useCallback(
    (id: string) => tracked_questions.some((q) => q.id === id),
    [tracked_questions],
  );

  const track_question = useCallback(
    (id: string, text: string, options?: track_question_options) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const theme_id = options?.theme_id ?? null;
      if (theme_id && options?.theme_name) {
        ensure_theme(theme_id, options.theme_name);
      }
      if (theme_id === null) {
        set_show_uncategorized_group(true);
      }

      set_tracked_questions((prev) => {
        if (prev.some((q) => q.id === id)) {
          return prev;
        }

        return [
          ...prev,
          {
            id,
            text: trimmed,
            status: "todo",
            notes: "",
            theme_id,
          },
        ];
      });
      set_cart_open(true);
    },
    [ensure_theme],
  );

  const untrack_question = useCallback((id: string) => {
    set_tracked_questions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const update_question_text = useCallback((id: string, text: string) => {
    set_tracked_questions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, text } : q)),
    );
  }, []);

  const update_question_status = useCallback(
    (id: string, status: tracked_question_status) => {
      set_tracked_questions((prev) =>
        prev.map((q) => (q.id === id ? { ...q, status } : q)),
      );
    },
    [],
  );

  const update_question_notes = useCallback((id: string, notes: string) => {
    set_tracked_questions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, notes } : q)),
    );
  }, []);

  const set_question_theme = useCallback(
    (question_id: string, theme_id: string | null) => {
      set_tracked_questions((prev) =>
        prev.map((q) =>
          q.id === question_id ? { ...q, theme_id } : q,
        ),
      );
    },
    [],
  );

  const add_custom_question = useCallback(
    (text: string, theme_id: string | null = null) => {
      const trimmed = text.trim();
      if (!trimmed) {
        return;
      }

      const id = `custom-${Date.now()}`;
      set_tracked_questions((prev) => [
        ...prev,
        {
          id,
          text: trimmed,
          status: "todo",
          notes: "",
          theme_id,
        },
      ]);
      set_cart_open(true);
    },
    [],
  );

  const add_theme = useCallback(
    (name: string, color_key: investigation_theme_color_key) => {
      const trimmed = name.trim();
      const id = `theme-${Date.now()}`;
      if (!trimmed) {
        return id;
      }

      set_themes((prev) => [
        ...prev,
        { id, name: trimmed, color_key },
      ]);
      return id;
    },
    [],
  );

  const update_theme_color = useCallback(
    (theme_id: string, color_key: investigation_theme_color_key) => {
      if (theme_id === UNCATEGORIZED_THEME_ID) {
        set_uncategorized_color_key(color_key);
        return;
      }

      set_themes((prev) =>
        prev.map((t) => (t.id === theme_id ? { ...t, color_key } : t)),
      );
    },
    [],
  );

  const delete_theme_group = useCallback((theme_id: string) => {
    if (theme_id === UNCATEGORIZED_THEME_ID) {
      set_show_uncategorized_group(false);
      set_tracked_questions((prev) => prev.filter((q) => q.theme_id !== null));
      return;
    }

    set_themes((prev) => prev.filter((t) => t.id !== theme_id));
    set_tracked_questions((prev) =>
      prev.filter((q) => q.theme_id !== theme_id),
    );
    set_tracked_stories((prev) =>
      prev.filter((story) => story.theme_id !== theme_id),
    );
  }, []);

  const is_story_added = useCallback(
    (id: string) => tracked_stories.some((story) => story.id === id),
    [tracked_stories],
  );

  const add_story = useCallback(
    (
      id: string,
      title: string,
      body: string,
      options?: add_story_options,
    ) => {
      const trimmed_title = title.trim();
      const trimmed_body = body.trim();
      if (!trimmed_title || !trimmed_body) {
        return;
      }

      const theme_id = options?.theme_id ?? null;
      if (theme_id && options?.theme_name) {
        ensure_theme(theme_id, options.theme_name);
      }

      set_tracked_stories((prev) => {
        if (prev.some((story) => story.id === id)) {
          return prev;
        }

        return [
          ...prev,
          {
            id,
            title: trimmed_title,
            body: trimmed_body,
            theme_id,
          },
        ];
      });
      set_cart_panel("stories");
      set_cart_open(true);
    },
    [ensure_theme],
  );

  const add_custom_story = useCallback((title: string, body = "") => {
    const trimmed_title = title.trim();
    if (!trimmed_title) {
      return;
    }

    const id = `custom-story-${Date.now()}`;
    set_tracked_stories((prev) => [
      ...prev,
      {
        id,
        title: trimmed_title,
        body: body.trim(),
        theme_id: null,
      },
    ]);
    set_cart_panel("stories");
    set_cart_open(true);
  }, []);

  const remove_story = useCallback((id: string) => {
    set_tracked_stories((prev) => prev.filter((story) => story.id !== id));
  }, []);

  const update_story_title = useCallback((id: string, title: string) => {
    set_tracked_stories((prev) =>
      prev.map((story) =>
        story.id === id ? { ...story, title } : story,
      ),
    );
  }, []);

  const update_story_body = useCallback((id: string, body: string) => {
    set_tracked_stories((prev) =>
      prev.map((story) => (story.id === id ? { ...story, body } : story)),
    );
  }, []);

  const remove_theme = useCallback(
    (theme_id: string) => {
      delete_theme_group(theme_id);
    },
    [delete_theme_group],
  );

  const toggle_cart = useCallback(() => {
    set_cart_open((open) => !open);
  }, []);

  const value = useMemo(
    () => ({
      cart_open,
      set_cart_open,
      toggle_cart,
      themes,
      tracked_questions,
      is_question_tracked,
      track_question,
      untrack_question,
      update_question_text,
      update_question_status,
      update_question_notes,
      set_question_theme,
      add_custom_question,
      add_theme,
      remove_theme,
      update_theme_color,
      uncategorized_color_key,
      show_uncategorized_group,
      delete_theme_group,
      tracked_stories,
      cart_panel,
      set_cart_panel,
      is_story_added,
      add_story,
      add_custom_story,
      remove_story,
      update_story_title,
      update_story_body,
    }),
    [
      cart_open,
      themes,
      uncategorized_color_key,
      show_uncategorized_group,
      tracked_questions,
      tracked_stories,
      cart_panel,
      is_question_tracked,
      track_question,
      untrack_question,
      update_question_text,
      update_question_status,
      update_question_notes,
      set_question_theme,
      add_custom_question,
      add_theme,
      remove_theme,
      update_theme_color,
      delete_theme_group,
      is_story_added,
      add_story,
      add_custom_story,
      remove_story,
      update_story_title,
      update_story_body,
      toggle_cart,
    ],
  );

  return (
    <InvestigationCartContext.Provider value={value}>
      {children}
    </InvestigationCartContext.Provider>
  );
}

/**
 * Reads investigation cart state; must be used inside InvestigationCartProvider.
 */
export function use_investigation_cart(): investigation_cart_context_value {
  const context = useContext(InvestigationCartContext);
  if (!context) {
    throw new Error(
      "use_investigation_cart must be used within InvestigationCartProvider",
    );
  }
  return context;
}

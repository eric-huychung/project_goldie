/**
 * Communicate tab chat with streaming replies and a five-question session limit.
 */

"use client";

import { useMemo, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { MessageSquare, RotateCcw, Send, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CHAT_MAX_USER_MESSAGES } from "@/lib/communicate/chat_constants";
import { count_user_messages } from "@/lib/communicate/count_user_messages";
import { format_chat_user_error } from "@/lib/communicate/chat_user_messages";
import { get_message_text } from "@/lib/communicate/get_message_text";
import { cn } from "@/lib/utils";

/**
 * Data Storyteller chat with session turn limit and new-session reset.
 */
export function ChatPanel() {
  const [input, set_input] = useState("");
  const [session_key, set_session_key] = useState(0);

  const { messages, sendMessage, status, error, setMessages, clearError } =
    useChat({
      id: `communicate-chat-${session_key}`,
      transport: new DefaultChatTransport({
        api: "/api/communicate/chat",
      }),
    });

  const display_error = error
    ? format_chat_user_error(error.message)
    : null;

  const user_turn_count = useMemo(
    () => count_user_messages(messages),
    [messages],
  );
  const at_limit = user_turn_count >= CHAT_MAX_USER_MESSAGES;
  const is_busy = status === "submitted" || status === "streaming";

  const handle_submit = (event: React.FormEvent) => {
    event.preventDefault();
    const text = input.trim();
    if (!text || at_limit || is_busy) {
      return;
    }

    clearError();
    void sendMessage({ text });
    set_input("");
  };

  const handle_new_session = () => {
    setMessages([]);
    set_input("");
    clearError();
    set_session_key((key) => key + 1);
  };

  return (
    <div className="flex flex-col border-t border-[#e5e7eb] shrink-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-[#e5e7eb] bg-[#fafafa]">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-amber-500" />
          <span className="text-sm font-medium text-[#1f2937]">Chat</span>
        </div>
        <span
          className={cn(
            "text-xs tabular-nums",
            at_limit ? "text-amber-700 font-medium" : "text-muted-foreground",
          )}
        >
          {user_turn_count}/{CHAT_MAX_USER_MESSAGES}
        </span>
      </div>

      <div className="flex-1 min-h-[200px] max-h-[280px] overflow-y-auto px-4 py-3 space-y-3">
        {messages.length === 0 && (
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Ask about vendor payments, spending trends, or top vendors.</p>
            <p className="text-xs italic">
              Example: &quot;Who were the top 5 vendors in 2023?&quot;
            </p>
          </div>
        )}

        {messages.map((message) => (
          <ChatMessageBubble key={message.id} message={message} />
        ))}

        {display_error && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-100 rounded-md px-2 py-1.5">
            {display_error}
          </p>
        )}
      </div>

      <div className="p-4 border-t border-[#e5e7eb] space-y-2">
        {at_limit ? (
          <div className="flex items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>Session limit reached.</span>
            <Button
              type="button"
              variant="secondary"
              size="default"
              className="h-8 text-xs gap-1"
              onClick={handle_new_session}
            >
              <RotateCcw className="w-3 h-3" />
              New session
            </Button>
          </div>
        ) : (
          <form onSubmit={handle_submit} className="flex items-center gap-2">
            <Input
              placeholder="Ask about the dataset…"
              className="flex-1 text-sm"
              value={input}
              onChange={(event) => set_input(event.target.value)}
              disabled={is_busy}
            />
            <Button
              type="submit"
              size="icon"
              disabled={is_busy || !input.trim()}
              className="bg-gradient-to-br from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        )}

      </div>
    </div>
  );
}

function ChatMessageBubble({ message }: { message: UIMessage }) {
  const text = get_message_text(message);
  const is_user = message.role === "user";

  if (!text) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex gap-2 text-sm",
        is_user ? "justify-end" : "justify-start",
      )}
    >
      {!is_user && (
        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles className="w-3.5 h-3.5 text-white" />
        </div>
      )}
      <div
        className={cn(
          "rounded-lg px-3 py-2 max-w-[90%] whitespace-pre-wrap",
          is_user
            ? "bg-[#1f2937] text-white"
            : "bg-[#f8f9fa] text-[#1f2937] border border-[#e5e7eb]",
        )}
      >
        {text}
      </div>
    </div>
  );
}

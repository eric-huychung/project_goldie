/**
 * Mock comment pin overlays for the Communicate dashboard collaboration preview.
 * Client-only UI state — pin text is static mock data, not logged or transmitted.
 */

"use client";

import { useState } from "react";
import { GraduationCap, Sparkles, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { dashboard_comment_pin } from "@/lib/types/dashboard_collaboration";
import { cn } from "@/lib/utils";

type dashboard_comment_pins_props = {
  pins: dashboard_comment_pin[];
};

const role_styles = {
  owner: {
    pin: "bg-amber-500 text-white ring-amber-200",
    avatar: "bg-amber-100 text-amber-800",
    badge: "bg-amber-50 text-amber-800 border-amber-200",
    icon: Sparkles,
    label: "Owner",
  },
  professor: {
    pin: "bg-violet-600 text-white ring-violet-200",
    avatar: "bg-violet-50 text-violet-800",
    badge: "bg-violet-50 text-violet-800 border-violet-200",
    icon: GraduationCap,
    label: "Professor",
  },
  peer: {
    pin: "bg-[#0369a1] text-white ring-blue-200",
    avatar: "bg-blue-50 text-blue-700",
    badge: "bg-blue-50 text-blue-700 border-blue-200",
    icon: Users,
    label: "Peer",
  },
} as const;

/**
 * @param props - Mock pins to render over a chart or story block
 */
export function DashboardCommentPins({ pins }: dashboard_comment_pins_props) {
  const [active_pin_id, set_active_pin_id] = useState<string | null>(null);

  if (pins.length === 0) {
    return null;
  }

  return (
    <>
      {pins.map((pin) => {
        const styles = role_styles[pin.author.role];
        const RoleIcon = styles.icon;
        const is_open = active_pin_id === pin.id;

        return (
          <div
            key={pin.id}
            className="absolute z-10"
            style={{
              left: `${pin.position.x_pct}%`,
              top: `${pin.position.y_pct}%`,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              type="button"
              className={cn(
                "flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold shadow-sm ring-2 transition-transform hover:scale-110",
                styles.pin,
                is_open && "scale-110",
              )}
              aria-expanded={is_open}
              aria-label={`Comment from ${pin.author.name}`}
              onClick={() =>
                set_active_pin_id(is_open ? null : pin.id)
              }
            >
              {pin.pin_number}
            </button>

            {is_open ? (
              <div
                className="absolute left-1/2 top-full z-20 mt-2 w-72 -translate-x-1/2 rounded-xl border border-[#e5e7eb] bg-white p-3 shadow-lg"
                role="dialog"
                aria-label={`Comment by ${pin.author.name}`}
              >
                <div className="flex items-start gap-2 mb-2">
                  <div
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                      styles.avatar,
                    )}
                  >
                    {pin.author.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-[#1f2937]">
                        {pin.author.name}
                      </span>
                      <Badge
                        variant="secondary"
                        className={cn("gap-1 font-normal", styles.badge)}
                      >
                        <RoleIcon className="w-3 h-3" />
                        {styles.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-[#1f2937] mt-1 leading-relaxed">
                      {pin.text}
                    </p>
                  </div>
                </div>

                {pin.replies?.map((reply) => (
                  <div
                    key={`${pin.id}-${reply.author}`}
                    className="ml-10 pl-3 border-l-2 border-[#f3f4f6] mt-2"
                  >
                    <p className="text-xs font-medium text-muted-foreground">
                      {reply.author}
                    </p>
                    <p className="text-sm text-[#1f2937] mt-0.5 leading-relaxed">
                      {reply.text}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        );
      })}
    </>
  );
}

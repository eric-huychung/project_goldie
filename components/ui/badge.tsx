/**
 * Badge primitive for category labels and footer tags.
 */

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badge_variants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-[#1f2937] text-white",
        secondary: "border-transparent bg-[#f3f4f6] text-[#1f2937]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badge_variants> {}

/**
 * @param props - Badge content and variant
 */
function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badge_variants({ variant }), className)} {...props} />;
}

export { Badge, badge_variants };

/**
 * GOLDIE logo block for page headers (home and templates marketplace).
 */

import { Sparkles } from "lucide-react";

type goldie_logo_props = {
  size?: "home" | "compact";
};

/**
 * @param props - Optional size variant for header context
 */
export function GoldieLogo({ size = "home" }: goldie_logo_props) {
  const icon_box =
    size === "home"
      ? "w-10 h-10 rounded-xl"
      : "w-10 h-10 rounded-xl";
  const icon_size = size === "home" ? "w-6 h-6" : "w-6 h-6";
  const label_class =
    size === "home"
      ? "font-bold text-[#1f2937] text-2xl"
      : "font-bold text-[#1f2937] text-2xl";

  return (
    <div className="flex items-center gap-2">
      <div
        className={`${icon_box} bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center`}
      >
        <Sparkles className={`${icon_size} text-white`} />
      </div>
      <span className={label_class}>GOLDIE</span>
    </div>
  );
}

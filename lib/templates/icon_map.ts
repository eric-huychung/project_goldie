/**
 * Maps template icon_key strings to Lucide icon components.
 */

import {
  Activity,
  Briefcase,
  Building2,
  DollarSign,
  Factory,
  GraduationCap,
  Leaf,
  LineChart,
  ShoppingCart,
  Stethoscope,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  building2: Building2,
  trending_up: TrendingUp,
  dollar_sign: DollarSign,
  stethoscope: Stethoscope,
  line_chart: LineChart,
  activity: Activity,
  briefcase: Briefcase,
  shopping_cart: ShoppingCart,
  graduation_cap: GraduationCap,
  factory: Factory,
  leaf: Leaf,
};

/**
 * Resolves a template icon_key to a Lucide component.
 *
 * @param icon_key - Key from template_record.icon_key
 * @returns Lucide icon component (Building2 as fallback)
 */
export function get_template_icon(icon_key: string): LucideIcon {
  return ICON_MAP[icon_key] ?? Building2;
}

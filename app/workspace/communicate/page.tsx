/**
 * Communicate workspace route — chat agent and dashboard canvas.
 */

import { CommunicateView } from "@/components/communicate/communicate_view";
import { get_dashboard_chart_data } from "@/lib/mock/chart_data";

/**
 * Communicate tab with chat agent and theme-linked dashboard canvas.
 */
export default function CommunicatePage() {
  const chart_data = get_dashboard_chart_data();

  return <CommunicateView chart_data={chart_data} />;
}

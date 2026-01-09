import * as React from "react";
import {
  ChartContainer as ChartContainerRoot,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
} from "@/components/ui/chart";
import type { ChartConfig } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

/**
 * WexChart - WEX Design System Chart Component
 *
 * Data visualization components.
 * Uses namespace pattern: WexChart.Container, WexChart.Tooltip, etc.
 *
 * TOKEN GAPS:
 * Chart colors (--wex-chart-1 through --wex-chart-5) are placeholders.
 * Real brand chart colors need to be defined by the design team.
 *
 * @example
 * <WexChart.Container config={chartConfig}>
 *   <BarChart data={data}>
 *     <WexChart.Tooltip content={<WexChart.TooltipContent />} />
 *     <Bar dataKey="value" fill="var(--chart-1)" />
 *   </BarChart>
 * </WexChart.Container>
 */

const WexChartContainer = React.forwardRef<
  React.ElementRef<typeof ChartContainerRoot>,
  React.ComponentPropsWithoutRef<typeof ChartContainerRoot>
>(({ className, ...props }, ref) => (
  <ChartContainerRoot
    ref={ref}
    className={cn("wex-chart-container", className)}
    {...props}
  />
));
WexChartContainer.displayName = "WexChart.Container";

export const WexChart = {
  Container: WexChartContainer,
  Tooltip: ChartTooltip,
  TooltipContent: ChartTooltipContent,
  Legend: ChartLegend,
  LegendContent: ChartLegendContent,
  Style: ChartStyle,
};

export type { ChartConfig as WexChartConfig };


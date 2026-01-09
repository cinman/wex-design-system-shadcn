import * as React from "react";
import { Progress as ProgressRoot } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/**
 * WexProgress - WEX Design System Progress Component
 *
 * Progress indicator for tasks with determinate progress.
 * Uses WEX primary color for the progress bar.
 *
 * @example
 * <WexProgress value={33} />
 */

export const WexProgress = React.forwardRef<
  React.ElementRef<typeof ProgressRoot>,
  React.ComponentPropsWithoutRef<typeof ProgressRoot>
>(({ className, ...props }, ref) => (
  <ProgressRoot
    ref={ref}
    className={cn("wex-progress", className)}
    {...props}
  />
));
WexProgress.displayName = "WexProgress";


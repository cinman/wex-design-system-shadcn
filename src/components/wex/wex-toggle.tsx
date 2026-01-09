import * as React from "react";
import { Toggle as ToggleRoot } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

/**
 * WexToggle - WEX Design System Toggle Component
 *
 * Two-state button for toggling between states.
 * Uses vendor variant prop (not intent) - pass-through wrapper.
 *
 * @example
 * <WexToggle aria-label="Toggle italic">
 *   <Italic className="h-4 w-4" />
 * </WexToggle>
 */

export const WexToggle = React.forwardRef<
  React.ElementRef<typeof ToggleRoot>,
  React.ComponentPropsWithoutRef<typeof ToggleRoot>
>(({ className, ...props }, ref) => (
  <ToggleRoot
    ref={ref}
    className={cn("wex-toggle", className)}
    {...props}
  />
));
WexToggle.displayName = "WexToggle";


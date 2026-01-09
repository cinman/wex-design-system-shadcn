import * as React from "react";
import { Switch as SwitchRoot } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

/**
 * WexSwitch - WEX Design System Switch Component
 *
 * Toggle control for switching between two states.
 * Uses WEX sizing tokens for accessible touch targets.
 *
 * @example
 * <div className="flex items-center space-x-2">
 *   <WexSwitch id="airplane-mode" />
 *   <WexLabel htmlFor="airplane-mode">Airplane Mode</WexLabel>
 * </div>
 */

export const WexSwitch = React.forwardRef<
  React.ElementRef<typeof SwitchRoot>,
  React.ComponentPropsWithoutRef<typeof SwitchRoot>
>(({ className, ...props }, ref) => (
  <SwitchRoot
    ref={ref}
    className={cn("wex-switch", className)}
    {...props}
  />
));
WexSwitch.displayName = "WexSwitch";


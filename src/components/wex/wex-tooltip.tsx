import * as React from "react";
import {
  Tooltip as TooltipRoot,
  TooltipTrigger,
  TooltipContent as TooltipContentRoot,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

/**
 * WexTooltip - WEX Design System Tooltip Component
 *
 * Popup info displayed on hover/focus.
 * Uses namespace pattern: WexTooltip.Trigger, WexTooltip.Content, WexTooltip.Provider
 *
 * @example
 * <WexTooltip.Provider>
 *   <WexTooltip>
 *     <WexTooltip.Trigger asChild>
 *       <WexButton variant="outline">Hover me</WexButton>
 *     </WexTooltip.Trigger>
 *     <WexTooltip.Content>
 *       <p>Tooltip content</p>
 *     </WexTooltip.Content>
 *   </WexTooltip>
 * </WexTooltip.Provider>
 */

const WexTooltipRoot = React.forwardRef<
  React.ElementRef<typeof TooltipRoot>,
  React.ComponentPropsWithoutRef<typeof TooltipRoot>
>((props, ref) => <TooltipRoot ref={ref} {...props} />);
WexTooltipRoot.displayName = "WexTooltip";

const WexTooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipContentRoot>,
  React.ComponentPropsWithoutRef<typeof TooltipContentRoot>
>(({ className, ...props }, ref) => (
  <TooltipContentRoot
    ref={ref}
    className={cn("wex-tooltip-content", className)}
    {...props}
  />
));
WexTooltipContent.displayName = "WexTooltip.Content";

export const WexTooltip = Object.assign(WexTooltipRoot, {
  Trigger: TooltipTrigger,
  Content: WexTooltipContent,
  Provider: TooltipProvider,
});


import * as React from "react";
import { ScrollArea as ScrollAreaRoot, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

/**
 * WexScrollArea - WEX Design System Scroll Area Component
 *
 * Custom scrollable viewport.
 * Uses namespace pattern: WexScrollArea.Bar
 *
 * @example
 * <WexScrollArea className="h-72 w-48 rounded-md border">
 *   <div className="p-4">
 *     Long scrollable content here
 *   </div>
 *   <WexScrollArea.Bar orientation="vertical" />
 * </WexScrollArea>
 */

const WexScrollAreaRoot = React.forwardRef<
  React.ElementRef<typeof ScrollAreaRoot>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaRoot>
>(({ className, ...props }, ref) => (
  <ScrollAreaRoot
    ref={ref}
    className={cn("wex-scroll-area", className)}
    {...props}
  />
));
WexScrollAreaRoot.displayName = "WexScrollArea";

export const WexScrollArea = Object.assign(WexScrollAreaRoot, {
  Bar: ScrollBar,
});

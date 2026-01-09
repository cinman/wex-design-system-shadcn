import * as React from "react";
import { Separator as SeparatorRoot } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

/**
 * WexSeparator - WEX Design System Separator Component
 *
 * Visual divider between content sections.
 * Simple pass-through wrapper for the vendor primitive.
 *
 * @example
 * <WexSeparator />
 * <WexSeparator orientation="vertical" />
 */

export const WexSeparator = React.forwardRef<
  React.ElementRef<typeof SeparatorRoot>,
  React.ComponentPropsWithoutRef<typeof SeparatorRoot>
>(({ className, ...props }, ref) => (
  <SeparatorRoot
    ref={ref}
    className={cn("wex-separator", className)}
    {...props}
  />
));
WexSeparator.displayName = "WexSeparator";


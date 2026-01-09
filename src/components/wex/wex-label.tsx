import * as React from "react";
import { Label as LabelRoot } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * WexLabel - WEX Design System Label Component
 *
 * Accessible label for form controls.
 * Simple pass-through wrapper for the vendor primitive.
 *
 * @example
 * <WexLabel htmlFor="email">Email</WexLabel>
 * <WexInput id="email" type="email" />
 */

export const WexLabel = React.forwardRef<
  React.ElementRef<typeof LabelRoot>,
  React.ComponentPropsWithoutRef<typeof LabelRoot>
>(({ className, ...props }, ref) => (
  <LabelRoot
    ref={ref}
    className={cn("wex-label", className)}
    {...props}
  />
));
WexLabel.displayName = "WexLabel";


import * as React from "react";
import { Checkbox as CheckboxRoot } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

/**
 * WexCheckbox - WEX Design System Checkbox Component
 *
 * Control for toggling boolean values.
 * Uses WEX sizing tokens for accessible touch targets.
 *
 * @example
 * <div className="flex items-center space-x-2">
 *   <WexCheckbox id="terms" />
 *   <WexLabel htmlFor="terms">Accept terms and conditions</WexLabel>
 * </div>
 */

export const WexCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxRoot>,
  React.ComponentPropsWithoutRef<typeof CheckboxRoot>
>(({ className, ...props }, ref) => (
  <CheckboxRoot
    ref={ref}
    className={cn("wex-checkbox", className)}
    {...props}
  />
));
WexCheckbox.displayName = "WexCheckbox";


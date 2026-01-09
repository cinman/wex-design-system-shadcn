import * as React from "react";
import { Slider as SliderRoot } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

/**
 * WexSlider - WEX Design System Slider Component
 *
 * Range input for selecting values within a range.
 * Uses WEX sizing tokens for accessible touch targets.
 *
 * @example
 * <WexSlider defaultValue={[50]} max={100} step={1} />
 */

export const WexSlider = React.forwardRef<
  React.ElementRef<typeof SliderRoot>,
  React.ComponentPropsWithoutRef<typeof SliderRoot>
>(({ className, ...props }, ref) => (
  <SliderRoot
    ref={ref}
    className={cn("wex-slider", className)}
    {...props}
  />
));
WexSlider.displayName = "WexSlider";


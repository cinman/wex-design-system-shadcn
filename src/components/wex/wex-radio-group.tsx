import * as React from "react";
import { RadioGroup as RadioGroupRoot, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";

/**
 * WexRadioGroup - WEX Design System Radio Group Component
 *
 * Set of checkable radio buttons for single-choice selection.
 * Uses namespace pattern: WexRadioGroup.Item
 *
 * @example
 * <WexRadioGroup defaultValue="option-one">
 *   <div className="flex items-center space-x-2">
 *     <WexRadioGroup.Item value="option-one" id="option-one" />
 *     <WexLabel htmlFor="option-one">Option One</WexLabel>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <WexRadioGroup.Item value="option-two" id="option-two" />
 *     <WexLabel htmlFor="option-two">Option Two</WexLabel>
 *   </div>
 * </WexRadioGroup>
 */

const WexRadioGroupRoot = React.forwardRef<
  React.ElementRef<typeof RadioGroupRoot>,
  React.ComponentPropsWithoutRef<typeof RadioGroupRoot>
>(({ className, ...props }, ref) => (
  <RadioGroupRoot
    ref={ref}
    className={cn("wex-radio-group", className)}
    {...props}
  />
));
WexRadioGroupRoot.displayName = "WexRadioGroup";

export const WexRadioGroup = Object.assign(WexRadioGroupRoot, {
  Item: RadioGroupItem,
});


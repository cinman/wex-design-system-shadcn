import * as React from "react";
import {
  Select as SelectRoot,
  SelectGroup,
  SelectValue,
  SelectTrigger as SelectTriggerRoot,
  SelectContent as SelectContentRoot,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

/**
 * WexSelect - WEX Design System Select Component
 *
 * Dropdown selection control.
 * Uses namespace pattern: WexSelect.Trigger, WexSelect.Content, etc.
 *
 * @example
 * <WexSelect>
 *   <WexSelect.Trigger className="w-[180px]">
 *     <WexSelect.Value placeholder="Select a fruit" />
 *   </WexSelect.Trigger>
 *   <WexSelect.Content>
 *     <WexSelect.Group>
 *       <WexSelect.Label>Fruits</WexSelect.Label>
 *       <WexSelect.Item value="apple">Apple</WexSelect.Item>
 *       <WexSelect.Item value="banana">Banana</WexSelect.Item>
 *     </WexSelect.Group>
 *   </WexSelect.Content>
 * </WexSelect>
 */

const WexSelectRoot = React.forwardRef<
  React.ElementRef<typeof SelectRoot>,
  React.ComponentPropsWithoutRef<typeof SelectRoot>
>((props, ref) => <SelectRoot ref={ref} {...props} />);
WexSelectRoot.displayName = "WexSelect";

const WexSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectTriggerRoot>,
  React.ComponentPropsWithoutRef<typeof SelectTriggerRoot>
>(({ className, ...props }, ref) => (
  <SelectTriggerRoot
    ref={ref}
    className={cn("wex-select-trigger", className)}
    {...props}
  />
));
WexSelectTrigger.displayName = "WexSelect.Trigger";

const WexSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectContentRoot>,
  React.ComponentPropsWithoutRef<typeof SelectContentRoot>
>(({ className, ...props }, ref) => (
  <SelectContentRoot
    ref={ref}
    className={cn("wex-select-content", className)}
    {...props}
  />
));
WexSelectContent.displayName = "WexSelect.Content";

export const WexSelect = Object.assign(WexSelectRoot, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: WexSelectTrigger,
  Content: WexSelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
});


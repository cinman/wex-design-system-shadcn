import * as React from "react";
import {
  InputGroup as InputGroupRoot,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";

/**
 * WexInputGroup - WEX Design System Input Group Component
 *
 * Container for input with addons, buttons, and text.
 * Uses namespace pattern: WexInputGroup.Addon, WexInputGroup.Input, etc.
 *
 * @example
 * <WexInputGroup>
 *   <WexInputGroup.Addon align="inline-start">
 *     <Icon />
 *   </WexInputGroup.Addon>
 *   <WexInputGroup.Input placeholder="Search..." />
 *   <WexInputGroup.Addon align="inline-end">
 *     <WexInputGroup.Button>Search</WexInputGroup.Button>
 *   </WexInputGroup.Addon>
 * </WexInputGroup>
 */

const WexInputGroupRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof InputGroupRoot>
>(({ className, ...props }, ref) => (
  <InputGroupRoot
    ref={ref}
    className={cn("wex-input-group", className)}
    {...props}
  />
));
WexInputGroupRoot.displayName = "WexInputGroup";

export const WexInputGroup = Object.assign(WexInputGroupRoot, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Text: InputGroupText,
  Input: InputGroupInput,
  Textarea: InputGroupTextarea,
});


import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";

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

export const WexInputGroup = Object.assign(InputGroup, {
  Addon: InputGroupAddon,
  Button: InputGroupButton,
  Text: InputGroupText,
  Input: InputGroupInput,
  Textarea: InputGroupTextarea,
});


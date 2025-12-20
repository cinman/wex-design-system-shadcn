import {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
} from "@/components/ui/select";

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

export const WexSelect = Object.assign(Select, {
  Group: SelectGroup,
  Value: SelectValue,
  Trigger: SelectTrigger,
  Content: SelectContent,
  Label: SelectLabel,
  Item: SelectItem,
  Separator: SelectSeparator,
  ScrollUpButton: SelectScrollUpButton,
  ScrollDownButton: SelectScrollDownButton,
});


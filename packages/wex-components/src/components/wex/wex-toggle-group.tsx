import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";

/**
 * WexToggleGroup - WEX Design System Toggle Group Component
 *
 * Set of two-state buttons for grouped toggles.
 * Uses namespace pattern: WexToggleGroup.Item
 *
 * @example
 * <WexToggleGroup type="single">
 *   <WexToggleGroup.Item value="left" aria-label="Align left">
 *     <AlignLeft className="h-4 w-4" />
 *   </WexToggleGroup.Item>
 *   <WexToggleGroup.Item value="center" aria-label="Align center">
 *     <AlignCenter className="h-4 w-4" />
 *   </WexToggleGroup.Item>
 * </WexToggleGroup>
 */

export const WexToggleGroup = Object.assign(ToggleGroup, {
  Item: ToggleGroupItem,
});


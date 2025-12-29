import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "../ui/context-menu";

/**
 * WexContextMenu - WEX Design System Context Menu Component
 *
 * Right-click context menu for actions.
 * Uses namespace pattern: WexContextMenu.Trigger, WexContextMenu.Content, etc.
 *
 * @example
 * <WexContextMenu>
 *   <WexContextMenu.Trigger>Right click here</WexContextMenu.Trigger>
 *   <WexContextMenu.Content>
 *     <WexContextMenu.Item>Edit</WexContextMenu.Item>
 *     <WexContextMenu.Item>Delete</WexContextMenu.Item>
 *   </WexContextMenu.Content>
 * </WexContextMenu>
 */

export const WexContextMenu = Object.assign(ContextMenu, {
  Trigger: ContextMenuTrigger,
  Content: ContextMenuContent,
  Item: ContextMenuItem,
  CheckboxItem: ContextMenuCheckboxItem,
  RadioItem: ContextMenuRadioItem,
  Label: ContextMenuLabel,
  Separator: ContextMenuSeparator,
  Shortcut: ContextMenuShortcut,
  Group: ContextMenuGroup,
  Portal: ContextMenuPortal,
  Sub: ContextMenuSub,
  SubContent: ContextMenuSubContent,
  SubTrigger: ContextMenuSubTrigger,
  RadioGroup: ContextMenuRadioGroup,
});


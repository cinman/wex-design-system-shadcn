import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
} from "@/components/ui/menubar";

/**
 * WexMenubar - WEX Design System Menubar Component
 *
 * Horizontal menu bar for app navigation.
 * Uses namespace pattern: WexMenubar.Menu, WexMenubar.Trigger, etc.
 *
 * @example
 * <WexMenubar>
 *   <WexMenubar.Menu>
 *     <WexMenubar.Trigger>File</WexMenubar.Trigger>
 *     <WexMenubar.Content>
 *       <WexMenubar.Item>New</WexMenubar.Item>
 *       <WexMenubar.Item>Open</WexMenubar.Item>
 *       <WexMenubar.Separator />
 *       <WexMenubar.Item>Save</WexMenubar.Item>
 *     </WexMenubar.Content>
 *   </WexMenubar.Menu>
 * </WexMenubar>
 */

export const WexMenubar = Object.assign(Menubar, {
  Menu: MenubarMenu,
  Trigger: MenubarTrigger,
  Content: MenubarContent,
  Item: MenubarItem,
  Separator: MenubarSeparator,
  Label: MenubarLabel,
  CheckboxItem: MenubarCheckboxItem,
  RadioGroup: MenubarRadioGroup,
  RadioItem: MenubarRadioItem,
  Portal: MenubarPortal,
  SubContent: MenubarSubContent,
  SubTrigger: MenubarSubTrigger,
  Group: MenubarGroup,
  Sub: MenubarSub,
  Shortcut: MenubarShortcut,
});


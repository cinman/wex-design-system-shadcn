import * as React from "react";
import {
  Menubar as MenubarRoot,
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
import { cn } from "@/lib/utils";

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

const WexMenubarRoot = React.forwardRef<
  React.ElementRef<typeof MenubarRoot>,
  React.ComponentPropsWithoutRef<typeof MenubarRoot>
>(({ className, ...props }, ref) => (
  <MenubarRoot
    ref={ref}
    className={cn("wex-menubar", className)}
    {...props}
  />
));
WexMenubarRoot.displayName = "WexMenubar";

export const WexMenubar = Object.assign(WexMenubarRoot, {
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


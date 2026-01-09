import * as React from "react";
import {
  ContextMenu as ContextMenuRoot,
  ContextMenuTrigger,
  ContextMenuContent as ContextMenuContentRoot,
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
} from "@/components/ui/context-menu";
import { cn } from "@/lib/utils";

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

const WexContextMenuRoot = React.forwardRef<
  React.ElementRef<typeof ContextMenuRoot>,
  React.ComponentPropsWithoutRef<typeof ContextMenuRoot>
>((props, ref) => <ContextMenuRoot ref={ref} {...props} />);
WexContextMenuRoot.displayName = "WexContextMenu";

const WexContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuContentRoot>,
  React.ComponentPropsWithoutRef<typeof ContextMenuContentRoot>
>(({ className, ...props }, ref) => (
  <ContextMenuContentRoot
    ref={ref}
    className={cn("wex-context-menu-content", className)}
    {...props}
  />
));
WexContextMenuContent.displayName = "WexContextMenu.Content";

export const WexContextMenu = Object.assign(WexContextMenuRoot, {
  Trigger: ContextMenuTrigger,
  Content: WexContextMenuContent,
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


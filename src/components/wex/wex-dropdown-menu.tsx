import * as React from "react";
import {
  DropdownMenu as DropdownMenuRoot,
  DropdownMenuTrigger,
  DropdownMenuContent as DropdownMenuContentRoot,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuGroup,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

/**
 * WexDropdownMenu - WEX Design System Dropdown Menu Component
 *
 * Menu triggered by a button for actions and navigation.
 * Uses namespace pattern: WexDropdownMenu.Trigger, WexDropdownMenu.Content, etc.
 *
 * @example
 * <WexDropdownMenu>
 *   <WexDropdownMenu.Trigger asChild>
 *     <WexButton variant="outline">Open Menu</WexButton>
 *   </WexDropdownMenu.Trigger>
 *   <WexDropdownMenu.Content>
 *     <WexDropdownMenu.Label>My Account</WexDropdownMenu.Label>
 *     <WexDropdownMenu.Separator />
 *     <WexDropdownMenu.Item>Profile</WexDropdownMenu.Item>
 *     <WexDropdownMenu.Item>Settings</WexDropdownMenu.Item>
 *   </WexDropdownMenu.Content>
 * </WexDropdownMenu>
 */

const WexDropdownMenuRoot = React.forwardRef<
  React.ElementRef<typeof DropdownMenuRoot>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuRoot>
>((props, ref) => <DropdownMenuRoot ref={ref} {...props} />);
WexDropdownMenuRoot.displayName = "WexDropdownMenu";

const WexDropdownMenuContent = React.forwardRef<
  React.ElementRef<typeof DropdownMenuContentRoot>,
  React.ComponentPropsWithoutRef<typeof DropdownMenuContentRoot>
>(({ className, ...props }, ref) => (
  <DropdownMenuContentRoot
    ref={ref}
    className={cn("wex-dropdown-menu-content", className)}
    {...props}
  />
));
WexDropdownMenuContent.displayName = "WexDropdownMenu.Content";

export const WexDropdownMenu = Object.assign(WexDropdownMenuRoot, {
  Trigger: DropdownMenuTrigger,
  Content: WexDropdownMenuContent,
  Item: DropdownMenuItem,
  CheckboxItem: DropdownMenuCheckboxItem,
  RadioItem: DropdownMenuRadioItem,
  Label: DropdownMenuLabel,
  Separator: DropdownMenuSeparator,
  Shortcut: DropdownMenuShortcut,
  Group: DropdownMenuGroup,
  Portal: DropdownMenuPortal,
  Sub: DropdownMenuSub,
  SubContent: DropdownMenuSubContent,
  SubTrigger: DropdownMenuSubTrigger,
  RadioGroup: DropdownMenuRadioGroup,
});


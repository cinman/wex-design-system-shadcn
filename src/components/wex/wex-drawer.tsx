import * as React from "react";
import {
  Drawer as DrawerRoot,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent as DrawerContentRoot,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

/**
 * WexDrawer - WEX Design System Drawer Component
 *
 * Slide-out panel for mobile navigation.
 * Uses namespace pattern: WexDrawer.Trigger, WexDrawer.Content, etc.
 *
 * @example
 * <WexDrawer>
 *   <WexDrawer.Trigger asChild>
 *     <WexButton variant="outline">Open Drawer</WexButton>
 *   </WexDrawer.Trigger>
 *   <WexDrawer.Content>
 *     <WexDrawer.Header>
 *       <WexDrawer.Title>Drawer Title</WexDrawer.Title>
 *       <WexDrawer.Description>Description</WexDrawer.Description>
 *     </WexDrawer.Header>
 *     Content here
 *   </WexDrawer.Content>
 * </WexDrawer>
 */

const WexDrawerRoot = React.forwardRef<
  React.ElementRef<typeof DrawerRoot>,
  React.ComponentPropsWithoutRef<typeof DrawerRoot>
>((props, ref) => <DrawerRoot ref={ref} {...props} />);
WexDrawerRoot.displayName = "WexDrawer";

const WexDrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerContentRoot>,
  React.ComponentPropsWithoutRef<typeof DrawerContentRoot>
>(({ className, ...props }, ref) => (
  <DrawerContentRoot
    ref={ref}
    className={cn("wex-drawer-content", className)}
    {...props}
  />
));
WexDrawerContent.displayName = "WexDrawer.Content";

export const WexDrawer = Object.assign(WexDrawerRoot, {
  Portal: DrawerPortal,
  Overlay: DrawerOverlay,
  Trigger: DrawerTrigger,
  Close: DrawerClose,
  Content: WexDrawerContent,
  Header: DrawerHeader,
  Footer: DrawerFooter,
  Title: DrawerTitle,
  Description: DrawerDescription,
});


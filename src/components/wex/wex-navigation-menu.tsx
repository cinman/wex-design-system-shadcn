import * as React from "react";
import {
  NavigationMenu as NavigationMenuRoot,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

/**
 * WexNavigationMenu - WEX Design System Navigation Menu Component
 *
 * Collection of navigation links with dropdowns.
 * Uses namespace pattern: WexNavigationMenu.List, WexNavigationMenu.Item, etc.
 *
 * @example
 * <WexNavigationMenu>
 *   <WexNavigationMenu.List>
 *     <WexNavigationMenu.Item>
 *       <WexNavigationMenu.Trigger>Getting started</WexNavigationMenu.Trigger>
 *       <WexNavigationMenu.Content>
 *         <WexNavigationMenu.Link href="/docs">Documentation</WexNavigationMenu.Link>
 *       </WexNavigationMenu.Content>
 *     </WexNavigationMenu.Item>
 *   </WexNavigationMenu.List>
 * </WexNavigationMenu>
 */

const WexNavigationMenuRoot = React.forwardRef<
  React.ElementRef<typeof NavigationMenuRoot>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuRoot>
>(({ className, ...props }, ref) => (
  <NavigationMenuRoot
    ref={ref}
    className={cn("wex-navigation-menu", className)}
    {...props}
  />
));
WexNavigationMenuRoot.displayName = "WexNavigationMenu";

export const WexNavigationMenu = Object.assign(WexNavigationMenuRoot, {
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Content: NavigationMenuContent,
  Trigger: NavigationMenuTrigger,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  Viewport: NavigationMenuViewport,
});

export { navigationMenuTriggerStyle as wexNavigationMenuTriggerStyle };


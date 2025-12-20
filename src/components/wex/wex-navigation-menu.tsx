import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

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

export const WexNavigationMenu = Object.assign(NavigationMenu, {
  List: NavigationMenuList,
  Item: NavigationMenuItem,
  Content: NavigationMenuContent,
  Trigger: NavigationMenuTrigger,
  Link: NavigationMenuLink,
  Indicator: NavigationMenuIndicator,
  Viewport: NavigationMenuViewport,
});

export { navigationMenuTriggerStyle as wexNavigationMenuTriggerStyle };


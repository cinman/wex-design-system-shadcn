import * as React from "react";
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

/**
 * WexSidebar - WEX Design System Sidebar Component
 *
 * Collapsible navigation sidebar.
 * Uses namespace pattern with many sub-components.
 *
 * @example
 * <WexSidebar.Provider>
 *   <WexSidebar>
 *     <WexSidebar.Header>Header</WexSidebar.Header>
 *     <WexSidebar.Content>
 *       <WexSidebar.Menu>
 *         <WexSidebar.MenuItem>
 *           <WexSidebar.MenuButton>Dashboard</WexSidebar.MenuButton>
 *         </WexSidebar.MenuItem>
 *       </WexSidebar.Menu>
 *     </WexSidebar.Content>
 *     <WexSidebar.Footer>Footer</WexSidebar.Footer>
 *   </WexSidebar>
 * </WexSidebar.Provider>
 */

const WexSidebarRoot = React.forwardRef<
  React.ElementRef<typeof SidebarRoot>,
  React.ComponentPropsWithoutRef<typeof SidebarRoot>
>(({ className, ...props }, ref) => (
  <SidebarRoot
    ref={ref}
    className={cn("wex-sidebar", className)}
    {...props}
  />
));
WexSidebarRoot.displayName = "WexSidebar";

export const WexSidebar = Object.assign(WexSidebarRoot, {
  Content: SidebarContent,
  Footer: SidebarFooter,
  Group: SidebarGroup,
  GroupAction: SidebarGroupAction,
  GroupContent: SidebarGroupContent,
  GroupLabel: SidebarGroupLabel,
  Header: SidebarHeader,
  Input: SidebarInput,
  Inset: SidebarInset,
  Menu: SidebarMenu,
  MenuAction: SidebarMenuAction,
  MenuBadge: SidebarMenuBadge,
  MenuButton: SidebarMenuButton,
  MenuItem: SidebarMenuItem,
  MenuSkeleton: SidebarMenuSkeleton,
  MenuSub: SidebarMenuSub,
  MenuSubButton: SidebarMenuSubButton,
  MenuSubItem: SidebarMenuSubItem,
  Provider: SidebarProvider,
  Rail: SidebarRail,
  Separator: SidebarSeparator,
  Trigger: SidebarTrigger,
});

export { useSidebar as useWexSidebar };


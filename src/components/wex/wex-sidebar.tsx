import {
  Sidebar,
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

export const WexSidebar = Object.assign(Sidebar, {
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


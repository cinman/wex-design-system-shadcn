import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "../ui/breadcrumb";

/**
 * WexBreadcrumb - WEX Design System Breadcrumb Component
 *
 * Navigation showing current location in hierarchy.
 * Uses namespace pattern: WexBreadcrumb.List, WexBreadcrumb.Item, etc.
 *
 * @example
 * <WexBreadcrumb>
 *   <WexBreadcrumb.List>
 *     <WexBreadcrumb.Item>
 *       <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
 *     </WexBreadcrumb.Item>
 *     <WexBreadcrumb.Separator />
 *     <WexBreadcrumb.Item>
 *       <WexBreadcrumb.Page>Current Page</WexBreadcrumb.Page>
 *     </WexBreadcrumb.Item>
 *   </WexBreadcrumb.List>
 * </WexBreadcrumb>
 */

export const WexBreadcrumb = Object.assign(Breadcrumb, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});


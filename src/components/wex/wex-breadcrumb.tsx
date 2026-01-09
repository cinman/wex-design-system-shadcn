import * as React from "react";
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

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

const WexBreadcrumbRoot = React.forwardRef<
  React.ElementRef<typeof BreadcrumbRoot>,
  React.ComponentPropsWithoutRef<typeof BreadcrumbRoot>
>(({ className, ...props }, ref) => (
  <BreadcrumbRoot
    ref={ref}
    className={cn("wex-breadcrumb", className)}
    {...props}
  />
));
WexBreadcrumbRoot.displayName = "WexBreadcrumb";

export const WexBreadcrumb = Object.assign(WexBreadcrumbRoot, {
  List: BreadcrumbList,
  Item: BreadcrumbItem,
  Link: BreadcrumbLink,
  Page: BreadcrumbPage,
  Separator: BreadcrumbSeparator,
  Ellipsis: BreadcrumbEllipsis,
});


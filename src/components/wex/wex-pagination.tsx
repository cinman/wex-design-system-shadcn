import * as React from "react";
import {
  Pagination as PaginationRoot,
  PaginationContent as PaginationContentRoot,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  RowsPerPage,
  PageReport,
  JumpToPage,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

/**
 * WexPagination - WEX Design System Pagination Component
 *
 * Navigation for multi-page content.
 * Uses namespace pattern: WexPagination.Content, WexPagination.Item, etc.
 *
 * @example
 * <WexPagination>
 *   <WexPagination.Content>
 *     <WexPagination.Item>
 *       <WexPagination.Previous href="#" />
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Link href="#">1</WexPagination.Link>
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Link href="#" isActive>2</WexPagination.Link>
 *     </WexPagination.Item>
 *     <WexPagination.Item>
 *       <WexPagination.Next href="#" />
 *     </WexPagination.Item>
 *   </WexPagination.Content>
 * </WexPagination>
 */

const WexPaginationRoot = React.forwardRef<
  React.ElementRef<typeof PaginationRoot>,
  React.ComponentPropsWithoutRef<typeof PaginationRoot>
>((props, ref) => <PaginationRoot ref={ref} {...props} />);
WexPaginationRoot.displayName = "WexPagination";

const WexPaginationContent = React.forwardRef<
  React.ElementRef<typeof PaginationContentRoot>,
  React.ComponentPropsWithoutRef<typeof PaginationContentRoot>
>(({ className, ...props }, ref) => (
  <PaginationContentRoot
    ref={ref}
    className={cn("wex-pagination-content", className)}
    {...props}
  />
));
WexPaginationContent.displayName = "WexPagination.Content";

export const WexPagination = Object.assign(WexPaginationRoot, {
  Content: WexPaginationContent,
  Ellipsis: PaginationEllipsis,
  Item: PaginationItem,
  Link: PaginationLink,
  Next: PaginationNext,
  Previous: PaginationPrevious,
  First: PaginationFirst,
  Last: PaginationLast,
  RowsPerPage: RowsPerPage,
  PageReport: PageReport,
  JumpToPage: JumpToPage,
});


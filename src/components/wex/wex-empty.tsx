import * as React from "react";
import {
  Empty as EmptyRoot,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";
import { cn } from "@/lib/utils";

/**
 * WexEmpty - WEX Design System Empty State Component
 *
 * Empty state placeholder for when no data is available.
 * Uses namespace pattern: WexEmpty.Header, WexEmpty.Title, etc.
 *
 * @example
 * <WexEmpty>
 *   <WexEmpty.Header>
 *     <WexEmpty.Media variant="icon">
 *       <Icon />
 *     </WexEmpty.Media>
 *     <WexEmpty.Title>No results found</WexEmpty.Title>
 *     <WexEmpty.Description>Try a different search term</WexEmpty.Description>
 *   </WexEmpty.Header>
 *   <WexEmpty.Content>
 *     <WexButton>Create New</WexButton>
 *   </WexEmpty.Content>
 * </WexEmpty>
 */

const WexEmptyRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof EmptyRoot>
>(({ className, ...props }, ref) => (
  <EmptyRoot
    ref={ref}
    className={cn("wex-empty", className)}
    {...props}
  />
));
WexEmptyRoot.displayName = "WexEmpty";

export const WexEmpty = Object.assign(WexEmptyRoot, {
  Header: EmptyHeader,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Content: EmptyContent,
  Media: EmptyMedia,
});


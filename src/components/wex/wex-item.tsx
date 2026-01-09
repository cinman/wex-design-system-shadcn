import * as React from "react";
import {
  Item as ItemRoot,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";

/**
 * WexItem - WEX Design System Item Component
 *
 * Flexible list item with media, content, and actions.
 * Uses namespace pattern: WexItem.Media, WexItem.Content, etc.
 *
 * @example
 * <WexItem.Group>
 *   <WexItem>
 *     <WexItem.Media variant="image">
 *       <img src="..." alt="..." />
 *     </WexItem.Media>
 *     <WexItem.Content>
 *       <WexItem.Title>Item Title</WexItem.Title>
 *       <WexItem.Description>Item description</WexItem.Description>
 *     </WexItem.Content>
 *     <WexItem.Actions>
 *       <WexButton size="sm">Action</WexButton>
 *     </WexItem.Actions>
 *   </WexItem>
 *   <WexItem.Separator />
 *   <WexItem>...</WexItem>
 * </WexItem.Group>
 */

const WexItemRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ItemRoot>
>(({ className, ...props }, ref) => (
  <ItemRoot
    ref={ref}
    className={cn("wex-item", className)}
    {...props}
  />
));
WexItemRoot.displayName = "WexItem";

export const WexItem = Object.assign(WexItemRoot, {
  Media: ItemMedia,
  Content: ItemContent,
  Actions: ItemActions,
  Group: ItemGroup,
  Separator: ItemSeparator,
  Title: ItemTitle,
  Description: ItemDescription,
  Header: ItemHeader,
  Footer: ItemFooter,
});


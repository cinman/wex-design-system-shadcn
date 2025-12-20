import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyContent,
  EmptyMedia,
} from "@/components/ui/empty";

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

export const WexEmpty = Object.assign(Empty, {
  Header: EmptyHeader,
  Title: EmptyTitle,
  Description: EmptyDescription,
  Content: EmptyContent,
  Media: EmptyMedia,
});


import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";

/**
 * WexCard - WEX Design System Card Component
 *
 * Container for grouping related content with header, content, and footer.
 * Uses namespace pattern: WexCard.Header, WexCard.Content, etc.
 *
 * @example
 * <WexCard>
 *   <WexCard.Header>
 *     <WexCard.Title>Card Title</WexCard.Title>
 *     <WexCard.Description>Description</WexCard.Description>
 *   </WexCard.Header>
 *   <WexCard.Content>Content here</WexCard.Content>
 *   <WexCard.Footer>
 *     <WexButton>Action</WexButton>
 *   </WexCard.Footer>
 * </WexCard>
 */

// Namespace pattern
export const WexCard = Object.assign(Card, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});


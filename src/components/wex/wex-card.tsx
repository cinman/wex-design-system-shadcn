import * as React from "react";
import {
  Card as CardRoot,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

const WexCardRoot = React.forwardRef<
  React.ElementRef<typeof CardRoot>,
  React.ComponentPropsWithoutRef<typeof CardRoot>
>(({ className, ...props }, ref) => (
  <CardRoot
    ref={ref}
    className={cn("wex-card", className)}
    {...props}
  />
));
WexCardRoot.displayName = "WexCard";

// Namespace pattern
export const WexCard = Object.assign(WexCardRoot, {
  Header: CardHeader,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
});


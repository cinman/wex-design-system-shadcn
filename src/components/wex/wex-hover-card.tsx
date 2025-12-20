import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card";

/**
 * WexHoverCard - WEX Design System Hover Card Component
 *
 * Preview content displayed on hover.
 * Uses namespace pattern: WexHoverCard.Trigger, WexHoverCard.Content
 *
 * @example
 * <WexHoverCard>
 *   <WexHoverCard.Trigger asChild>
 *     <a href="#">Hover over me</a>
 *   </WexHoverCard.Trigger>
 *   <WexHoverCard.Content>
 *     Preview content here
 *   </WexHoverCard.Content>
 * </WexHoverCard>
 */

export const WexHoverCard = Object.assign(HoverCard, {
  Trigger: HoverCardTrigger,
  Content: HoverCardContent,
});


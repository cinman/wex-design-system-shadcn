import * as React from "react";
import {
  HoverCard as HoverCardRoot,
  HoverCardTrigger,
  HoverCardContent as HoverCardContentRoot,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";

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

const WexHoverCardRoot = React.forwardRef<
  React.ElementRef<typeof HoverCardRoot>,
  React.ComponentPropsWithoutRef<typeof HoverCardRoot>
>((props, ref) => <HoverCardRoot ref={ref} {...props} />);
WexHoverCardRoot.displayName = "WexHoverCard";

const WexHoverCardContent = React.forwardRef<
  React.ElementRef<typeof HoverCardContentRoot>,
  React.ComponentPropsWithoutRef<typeof HoverCardContentRoot>
>(({ className, ...props }, ref) => (
  <HoverCardContentRoot
    ref={ref}
    className={cn("wex-hover-card-content", className)}
    {...props}
  />
));
WexHoverCardContent.displayName = "WexHoverCard.Content";

export const WexHoverCard = Object.assign(WexHoverCardRoot, {
  Trigger: HoverCardTrigger,
  Content: WexHoverCardContent,
});


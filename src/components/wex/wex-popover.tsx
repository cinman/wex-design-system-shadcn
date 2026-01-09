import * as React from "react";
import {
  Popover as PopoverRoot,
  PopoverTrigger,
  PopoverContent as PopoverContentRoot,
  PopoverAnchor,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

/**
 * WexPopover - WEX Design System Popover Component
 *
 * Floating content triggered by a button.
 * Uses namespace pattern: WexPopover.Trigger, WexPopover.Content
 *
 * @example
 * <WexPopover>
 *   <WexPopover.Trigger asChild>
 *     <WexButton variant="outline">Open Popover</WexButton>
 *   </WexPopover.Trigger>
 *   <WexPopover.Content>
 *     Popover content here
 *   </WexPopover.Content>
 * </WexPopover>
 */

const WexPopoverRoot = React.forwardRef<
  React.ElementRef<typeof PopoverRoot>,
  React.ComponentPropsWithoutRef<typeof PopoverRoot>
>((props, ref) => <PopoverRoot ref={ref} {...props} />);
WexPopoverRoot.displayName = "WexPopover";

const WexPopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverContentRoot>,
  React.ComponentPropsWithoutRef<typeof PopoverContentRoot>
>(({ className, ...props }, ref) => (
  <PopoverContentRoot
    ref={ref}
    className={cn("wex-popover-content", className)}
    {...props}
  />
));
WexPopoverContent.displayName = "WexPopover.Content";

export const WexPopover = Object.assign(WexPopoverRoot, {
  Trigger: PopoverTrigger,
  Content: WexPopoverContent,
  Anchor: PopoverAnchor,
});


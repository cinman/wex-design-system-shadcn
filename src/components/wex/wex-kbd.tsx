import * as React from "react";
import { Kbd as KbdRoot, KbdGroup } from "@/components/ui/kbd";
import { cn } from "@/lib/utils";

/**
 * WexKbd - WEX Design System Keyboard Key Component
 *
 * Displays keyboard shortcuts or key combinations.
 * Uses namespace pattern: WexKbd.Group
 *
 * @example
 * <WexKbd>⌘</WexKbd>
 * <WexKbd.Group>
 *   <WexKbd>⌘</WexKbd>
 *   <WexKbd>K</WexKbd>
 * </WexKbd.Group>
 */

const WexKbdRoot = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<typeof KbdRoot>
>(({ className, ...props }, ref) => (
  <KbdRoot
    ref={ref}
    className={cn("wex-kbd", className)}
    {...props}
  />
));
WexKbdRoot.displayName = "WexKbd";

export const WexKbd = Object.assign(WexKbdRoot, {
  Group: KbdGroup,
});


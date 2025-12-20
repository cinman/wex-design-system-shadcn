import { Kbd, KbdGroup } from "@/components/ui/kbd";

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

export const WexKbd = Object.assign(Kbd, {
  Group: KbdGroup,
});


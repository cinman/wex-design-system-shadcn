import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

/**
 * WexScrollArea - WEX Design System Scroll Area Component
 *
 * Custom scrollable viewport.
 * Uses namespace pattern: WexScrollArea.Bar
 *
 * @example
 * <WexScrollArea className="h-72 w-48 rounded-md border">
 *   <div className="p-4">
 *     Long scrollable content here
 *   </div>
 *   <WexScrollArea.Bar orientation="vertical" />
 * </WexScrollArea>
 */

export const WexScrollArea = Object.assign(ScrollArea, {
  Bar: ScrollBar,
});


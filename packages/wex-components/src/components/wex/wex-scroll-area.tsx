import * as React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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

// Create wrapper to avoid mutating shared primitives
const WexScrollAreaRoot: typeof ScrollArea & {
  Bar: typeof ScrollBar;
} = Object.assign(
  ((props: React.ComponentProps<typeof ScrollArea>) => <ScrollArea {...props} />) as typeof ScrollArea,
  {
    Bar: ScrollBar,
  }
);

export const WexScrollArea = WexScrollAreaRoot;

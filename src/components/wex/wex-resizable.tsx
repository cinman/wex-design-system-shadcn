import * as React from "react";
import {
  ResizablePanelGroup as ResizablePanelGroupRoot,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { cn } from "@/lib/utils";

/**
 * WexResizable - WEX Design System Resizable Component
 *
 * Resizable panel groups.
 * Uses namespace pattern: WexResizable.Group, WexResizable.Panel, WexResizable.Handle
 *
 * @example
 * <WexResizable.Group direction="horizontal">
 *   <WexResizable.Panel defaultSize={50}>
 *     Left panel content
 *   </WexResizable.Panel>
 *   <WexResizable.Handle />
 *   <WexResizable.Panel defaultSize={50}>
 *     Right panel content
 *   </WexResizable.Panel>
 * </WexResizable.Group>
 */

const WexResizablePanelGroup = React.forwardRef<
  React.ElementRef<typeof ResizablePanelGroupRoot>,
  React.ComponentPropsWithoutRef<typeof ResizablePanelGroupRoot>
>(({ className, ...props }, ref) => (
  <ResizablePanelGroupRoot
    ref={ref}
    className={cn("wex-resizable-group", className)}
    {...props}
  />
));
WexResizablePanelGroup.displayName = "WexResizable.Group";

// Create a namespace object for resizable components
export const WexResizable = {
  Group: WexResizablePanelGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
};


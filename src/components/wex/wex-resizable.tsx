import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

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

// Create a namespace object for resizable components
export const WexResizable = {
  Group: ResizablePanelGroup,
  Panel: ResizablePanel,
  Handle: ResizableHandle,
};


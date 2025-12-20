import {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";

/**
 * WexSheet - WEX Design System Sheet Component
 *
 * Slide-out panel from screen edge.
 * Uses namespace pattern: WexSheet.Trigger, WexSheet.Content, etc.
 *
 * @example
 * <WexSheet>
 *   <WexSheet.Trigger asChild>
 *     <WexButton intent="outline">Open Sheet</WexButton>
 *   </WexSheet.Trigger>
 *   <WexSheet.Content>
 *     <WexSheet.Header>
 *       <WexSheet.Title>Sheet Title</WexSheet.Title>
 *       <WexSheet.Description>Sheet description</WexSheet.Description>
 *     </WexSheet.Header>
 *     Content here
 *   </WexSheet.Content>
 * </WexSheet>
 */

export const WexSheet = Object.assign(Sheet, {
  Portal: SheetPortal,
  Overlay: SheetOverlay,
  Trigger: SheetTrigger,
  Close: SheetClose,
  Content: SheetContent,
  Header: SheetHeader,
  Footer: SheetFooter,
  Title: SheetTitle,
  Description: SheetDescription,
});


import {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * WexDialog - WEX Design System Dialog Component
 *
 * Modal dialog for focused content that requires user attention.
 * Uses namespace pattern: WexDialog.Trigger, WexDialog.Content, etc.
 *
 * @example
 * <WexDialog>
 *   <WexDialog.Trigger asChild>
 *     <WexButton>Open</WexButton>
 *   </WexDialog.Trigger>
 *   <WexDialog.Content>
 *     <WexDialog.Header>
 *       <WexDialog.Title>Title</WexDialog.Title>
 *       <WexDialog.Description>Description</WexDialog.Description>
 *     </WexDialog.Header>
 *     Content here
 *     <WexDialog.Footer>
 *       <WexButton>Confirm</WexButton>
 *     </WexDialog.Footer>
 *   </WexDialog.Content>
 * </WexDialog>
 */

// Re-export vendor components with Wex namespace
const WexDialogRoot = Dialog;
const WexDialogPortal = DialogPortal;
const WexDialogOverlay = DialogOverlay;
const WexDialogTrigger = DialogTrigger;
const WexDialogClose = DialogClose;
const WexDialogContent = DialogContent;
const WexDialogHeader = DialogHeader;
const WexDialogFooter = DialogFooter;
const WexDialogTitle = DialogTitle;
const WexDialogDescription = DialogDescription;

// Namespace pattern
export const WexDialog = Object.assign(WexDialogRoot, {
  Portal: WexDialogPortal,
  Overlay: WexDialogOverlay,
  Trigger: WexDialogTrigger,
  Close: WexDialogClose,
  Content: WexDialogContent,
  Header: WexDialogHeader,
  Footer: WexDialogFooter,
  Title: WexDialogTitle,
  Description: WexDialogDescription,
});


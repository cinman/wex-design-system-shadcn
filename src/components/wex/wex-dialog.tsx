import * as React from "react";
import {
  Dialog as DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogTrigger,
  DialogClose,
  DialogContent as DialogContentRoot,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

const WexDialogRoot = React.forwardRef<
  React.ElementRef<typeof DialogRoot>,
  React.ComponentPropsWithoutRef<typeof DialogRoot>
>((props, ref) => <DialogRoot ref={ref} {...props} />);
WexDialogRoot.displayName = "WexDialog";

const WexDialogContent = React.forwardRef<
  React.ElementRef<typeof DialogContentRoot>,
  React.ComponentPropsWithoutRef<typeof DialogContentRoot>
>(({ className, ...props }, ref) => (
  <DialogContentRoot
    ref={ref}
    className={cn("wex-dialog-content", className)}
    {...props}
  />
));
WexDialogContent.displayName = "WexDialog.Content";

const WexDialogRootWithNamespace: typeof WexDialogRoot & {
  Portal: typeof DialogPortal;
  Overlay: typeof DialogOverlay;
  Trigger: typeof DialogTrigger;
  Close: typeof DialogClose;
  Content: typeof WexDialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
} = Object.assign(WexDialogRoot, {
  Portal: DialogPortal,
  Overlay: DialogOverlay,
  Trigger: DialogTrigger,
  Close: DialogClose,
  Content: WexDialogContent,
  Header: DialogHeader,
  Footer: DialogFooter,
  Title: DialogTitle,
  Description: DialogDescription,
});

export const WexDialog = WexDialogRootWithNamespace;


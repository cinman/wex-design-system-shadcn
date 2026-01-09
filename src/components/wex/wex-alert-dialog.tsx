import * as React from "react";
import {
  AlertDialog as AlertDialogRoot,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent as AlertDialogContentRoot,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";

/**
 * WexAlertDialog - WEX Design System Alert Dialog Component
 *
 * Modal dialog for important confirmations that require user acknowledgment.
 * Uses namespace pattern: WexAlertDialog.Trigger, WexAlertDialog.Content, etc.
 *
 * @example
 * <WexAlertDialog>
 *   <WexAlertDialog.Trigger asChild>
 *     <WexButton intent="destructive">Delete</WexButton>
 *   </WexAlertDialog.Trigger>
 *   <WexAlertDialog.Content>
 *     <WexAlertDialog.Header>
 *       <WexAlertDialog.Title>Are you sure?</WexAlertDialog.Title>
 *       <WexAlertDialog.Description>This action cannot be undone.</WexAlertDialog.Description>
 *     </WexAlertDialog.Header>
 *     <WexAlertDialog.Footer>
 *       <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
 *       <WexAlertDialog.Action>Continue</WexAlertDialog.Action>
 *     </WexAlertDialog.Footer>
 *   </WexAlertDialog.Content>
 * </WexAlertDialog>
 */

const WexAlertDialogRoot = React.forwardRef<
  React.ElementRef<typeof AlertDialogRoot>,
  React.ComponentPropsWithoutRef<typeof AlertDialogRoot>
>((props, ref) => <AlertDialogRoot ref={ref} {...props} />);
WexAlertDialogRoot.displayName = "WexAlertDialog";

const WexAlertDialogContent = React.forwardRef<
  React.ElementRef<typeof AlertDialogContentRoot>,
  React.ComponentPropsWithoutRef<typeof AlertDialogContentRoot>
>(({ className, ...props }, ref) => (
  <AlertDialogContentRoot
    ref={ref}
    className={cn("wex-alert-dialog-content", className)}
    {...props}
  />
));
WexAlertDialogContent.displayName = "WexAlertDialog.Content";

export const WexAlertDialog = Object.assign(WexAlertDialogRoot, {
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Trigger: AlertDialogTrigger,
  Content: WexAlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});


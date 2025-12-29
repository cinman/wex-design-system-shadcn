import {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "../ui/alert-dialog";

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

export const WexAlertDialog = Object.assign(AlertDialog, {
  Portal: AlertDialogPortal,
  Overlay: AlertDialogOverlay,
  Trigger: AlertDialogTrigger,
  Content: AlertDialogContent,
  Header: AlertDialogHeader,
  Footer: AlertDialogFooter,
  Title: AlertDialogTitle,
  Description: AlertDialogDescription,
  Action: AlertDialogAction,
  Cancel: AlertDialogCancel,
});


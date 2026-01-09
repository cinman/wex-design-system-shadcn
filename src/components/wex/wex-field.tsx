import * as React from "react";
import {
  Field as FieldRoot,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

/**
 * WexField - WEX Design System Field Component
 *
 * Form field container with label, description, and error handling.
 * Uses namespace pattern: WexField.Label, WexField.Error, etc.
 *
 * @example
 * <WexField>
 *   <WexField.Label htmlFor="email">Email</WexField.Label>
 *   <WexInput id="email" />
 *   <WexField.Description>Your email address</WexField.Description>
 *   <WexField.Error>Invalid email format</WexField.Error>
 * </WexField>
 */

const WexFieldRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof FieldRoot>
>(({ className, ...props }, ref) => (
  <FieldRoot
    ref={ref}
    className={cn("wex-field", className)}
    {...props}
  />
));
WexFieldRoot.displayName = "WexField";

export const WexField = Object.assign(WexFieldRoot, {
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
  Group: FieldGroup,
  Legend: FieldLegend,
  Separator: FieldSeparator,
  Set: FieldSet,
  Content: FieldContent,
  Title: FieldTitle,
});


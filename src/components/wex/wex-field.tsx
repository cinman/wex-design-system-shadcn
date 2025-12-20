import {
  Field,
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

export const WexField = Object.assign(Field, {
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


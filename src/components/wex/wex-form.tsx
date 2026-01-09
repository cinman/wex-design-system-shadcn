import * as React from "react";
import {
  useFormField,
  Form as FormRoot,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

/**
 * WexForm - WEX Design System Form Component
 *
 * Form handling with validation using react-hook-form.
 * Uses namespace pattern: WexForm.Item, WexForm.Label, etc.
 *
 * @example
 * <WexForm {...form}>
 *   <form onSubmit={form.handleSubmit(onSubmit)}>
 *     <WexForm.Field
 *       control={form.control}
 *       name="email"
 *       render={({ field }) => (
 *         <WexForm.Item>
 *           <WexForm.Label>Email</WexForm.Label>
 *           <WexForm.Control>
 *             <WexInput {...field} />
 *           </WexForm.Control>
 *           <WexForm.Description>Your email address</WexForm.Description>
 *           <WexForm.Message />
 *         </WexForm.Item>
 *       )}
 *     />
 *   </form>
 * </WexForm>
 */

const WexFormRoot = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof FormRoot>
>(({ className, ...props }, ref) => (
  <FormRoot
    ref={ref}
    className={cn("wex-form", className)}
    {...props}
  />
));
WexFormRoot.displayName = "WexForm";

export const WexForm = Object.assign(WexFormRoot, {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
});

export { useFormField as useWexFormField };


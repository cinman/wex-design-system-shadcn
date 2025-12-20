import {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
} from "@/components/ui/form";

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

export const WexForm = Object.assign(Form, {
  Item: FormItem,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
  Field: FormField,
});

export { useFormField as useWexFormField };


import * as React from "react";
import {
  DatePicker as DatePickerRoot,
  DatePickerWithInput as DatePickerWithInputRoot,
} from "@/components/ui/date-picker";
import type {
  DatePickerProps,
  DatePickerWithInputProps,
} from "@/components/ui/date-picker";
import { cn } from "@/lib/utils";

/**
 * WexDatePicker - WEX Design System Date Picker Component
 *
 * Date selection input combining Calendar with Popover.
 * Supports single date selection with button trigger or input field.
 *
 * @example
 * <WexDatePicker
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Pick a date"
 * />
 *
 * // With input field
 * <WexDatePicker.WithInput
 *   date={date}
 *   onDateChange={setDate}
 *   placeholder="Enter or pick a date"
 * />
 */

const WexDatePickerRoot = React.forwardRef<
  HTMLDivElement,
  DatePickerProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("wex-date-picker", className)}>
    <DatePickerRoot {...props} />
  </div>
));
WexDatePickerRoot.displayName = "WexDatePicker";

const WexDatePickerWithInput = React.forwardRef<
  HTMLDivElement,
  DatePickerWithInputProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("wex-date-picker", className)}>
    <DatePickerWithInputRoot {...props} />
  </div>
));
WexDatePickerWithInput.displayName = "WexDatePicker.WithInput";

export const WexDatePicker = Object.assign(WexDatePickerRoot, {
  WithInput: WexDatePickerWithInput,
});

export type { DatePickerProps, DatePickerWithInputProps };


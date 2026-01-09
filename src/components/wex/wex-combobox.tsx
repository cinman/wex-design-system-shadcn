import * as React from "react";
import { Combobox as ComboboxRoot } from "@/components/ui/combobox";
import type { ComboboxProps, ComboboxOption } from "@/components/ui/combobox";
import { cn } from "@/lib/utils";

/**
 * WexCombobox - WEX Design System Combobox Component
 *
 * Autocomplete input combining Command search with Popover dropdown.
 * Allows users to search and select from a list of options.
 *
 * @example
 * const options = [
 *   { value: "apple", label: "Apple" },
 *   { value: "banana", label: "Banana" },
 * ];
 *
 * <WexCombobox
 *   options={options}
 *   value={value}
 *   onValueChange={setValue}
 *   placeholder="Select a fruit..."
 * />
 */

export const WexCombobox = React.forwardRef<
  HTMLButtonElement,
  ComboboxProps
>(({ className, ...props }, ref) => (
  <ComboboxRoot
    ref={ref}
    className={cn("wex-combobox", className)}
    {...props}
  />
));
WexCombobox.displayName = "WexCombobox";
export type { ComboboxProps, ComboboxOption };


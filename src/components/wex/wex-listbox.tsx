/**
 * WexListbox - WEX Design System Listbox Component
 *
 * A list selection component with full accessibility support.
 * Built on top of the base Listbox component for consistent styling.
 *
 * Features:
 * - Single and multiple selection modes
 * - Optional checkmarks or checkboxes
 * - Filtering support
 * - Grouped options
 * - Full keyboard navigation (Arrow keys, Home, End, Enter, Space, type-ahead)
 * - Roving tabindex for proper focus management
 * - ARIA compliant
 *
 * @example
 * // Basic single selection
 * <WexListbox
 *   options={cities}
 *   value={selected}
 *   onValueChange={setSelected}
 *   aria-label="Select a city"
 * >
 *   <WexListbox.Options />
 * </WexListbox>
 *
 * @example
 * // Multiple selection with checkboxes
 * <WexListbox
 *   options={cities}
 *   value={selectedCities}
 *   onValueChange={setSelectedCities}
 *   multiple
 *   checkbox
 *   aria-label="Select cities"
 * >
 *   <WexListbox.Options />
 * </WexListbox>
 *
 * @example
 * // With filter
 * <WexListbox
 *   options={cities}
 *   value={selected}
 *   onValueChange={setSelected}
 *   aria-label="Select a city"
 * >
 *   <WexListbox.Header>
 *     <WexListbox.Filter placeholder="Search city..." />
 *   </WexListbox.Header>
 *   <WexListbox.Options />
 *   <WexListbox.Empty>No cities found</WexListbox.Empty>
 * </WexListbox>
 */

import * as React from "react";
import {
  Listbox,
  ListboxRoot,
  ListboxHeader,
  ListboxFilter,
  ListboxSelectAll,
  ListboxOptions,
  ListboxOption,
  ListboxGroup,
  ListboxEmpty,
  listboxVariants,
  listboxOptionVariants,
  type ListboxOptionData,
  type ListboxRootProps,
  type ListboxHeaderProps,
  type ListboxFilterProps,
  type ListboxSelectAllProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
  type ListboxGroupProps,
  type ListboxEmptyProps,
} from "../ui/listbox";
import { cn } from "@/lib/utils";

const WexListboxRoot = React.forwardRef<
  React.ElementRef<typeof ListboxRoot>,
  ListboxRootProps
>(({ className, ...props }, ref) => (
  <ListboxRoot
    ref={ref}
    className={cn("wex-listbox", className)}
    {...props}
  />
));
WexListboxRoot.displayName = "WexListbox";

// Re-export the compound component with Wex prefix
const WexListbox = Object.assign(WexListboxRoot, {
  Header: ListboxHeader,
  Filter: ListboxFilter,
  SelectAll: ListboxSelectAll,
  Options: ListboxOptions,
  Option: ListboxOption,
  Group: ListboxGroup,
  Empty: ListboxEmpty,
});

// Re-export all sub-components and types
export {
  WexListbox,
  ListboxRoot,
  ListboxHeader,
  ListboxFilter,
  ListboxSelectAll,
  ListboxOptions,
  ListboxOption,
  ListboxGroup,
  ListboxEmpty,
  listboxVariants,
  listboxOptionVariants,
  type ListboxOptionData,
  type ListboxRootProps,
  type ListboxHeaderProps,
  type ListboxFilterProps,
  type ListboxSelectAllProps,
  type ListboxOptionsProps,
  type ListboxOptionProps,
  type ListboxGroupProps,
  type ListboxEmptyProps,
};


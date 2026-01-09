import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";
import { WexListbox, WexLabel, type ListboxOptionData } from "@/components/wex";

// Sample data
const cities: ListboxOptionData[] = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi" },
  { label: "Houston", value: "hou" },
  { label: "Phoenix", value: "phx" },
  { label: "San Diego", value: "sd" },
];

const citiesWithDisabled: ListboxOptionData[] = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi", disabled: true },
  { label: "Houston", value: "hou" },
  { label: "Phoenix", value: "phx", disabled: true },
  { label: "San Diego", value: "sd" },
];

const groupedCities: ListboxOptionData[] = [
  { label: "New York", value: "ny", group: "East Coast" },
  { label: "Boston", value: "bos", group: "East Coast" },
  { label: "Miami", value: "mia", group: "East Coast" },
  { label: "Los Angeles", value: "la", group: "West Coast" },
  { label: "San Francisco", value: "sf", group: "West Coast" },
  { label: "Seattle", value: "sea", group: "West Coast" },
  { label: "Chicago", value: "chi", group: "Midwest" },
  { label: "Detroit", value: "det", group: "Midwest" },
];

// Props documentation
const listboxProps: PropDefinition[] = [
  { name: "options", type: "ListboxOptionData[]", description: "Array of options to display" },
  { name: "value", type: "string | string[] | null", description: "Currently selected value(s)" },
  { name: "onValueChange", type: "(value: string | string[] | null) => void", description: "Callback when selection changes" },
  { name: "multiple", type: "boolean", default: "false", description: "Enable multiple selection" },
  { name: "checkmark", type: "boolean", default: "false", description: "Show checkmark next to selected items" },
  { name: "checkbox", type: "boolean", default: "false", description: "Show checkbox for multiple selection" },
  { name: "invalid", type: "boolean", default: "false", description: "Show invalid state styling" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the entire listbox" },
  { name: "aria-label", type: "string", description: "Accessible label for the listbox" },
  { name: "aria-labelledby", type: "string", description: "ID of element that labels this listbox" },
];

const optionDataProps: PropDefinition[] = [
  { name: "label", type: "string", required: true, description: "Display text for the option" },
  { name: "value", type: "string", required: true, description: "Value associated with the option" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable this specific option" },
  { name: "group", type: "string", description: "Group name for grouped options" },
];

export default function ListboxPage() {
  // Demo state
  const [singleValue, setSingleValue] = React.useState<string | null>(null);
  const [multiValue, setMultiValue] = React.useState<string[]>([]);
  const [checkmarkValue, setCheckmarkValue] = React.useState<string | null>(null);
  const [checkboxValue, setCheckboxValue] = React.useState<string[]>([]);
  const [selectAllValue, setSelectAllValue] = React.useState<string[]>([]);
  const [filterValue, setFilterValue] = React.useState<string | null>(null);
  const [groupedValue, setGroupedValue] = React.useState<string | null>(null);
  const [disabledOptionsValue, setDisabledOptionsValue] = React.useState<string | null>(null);
  const [invalidValue, setInvalidValue] = React.useState<string | null>(null);

  return (
    <ComponentPage
      title="Listbox"
      description="A list selection component for choosing from a set of options with full keyboard navigation and accessibility support."
      status="stable"
      registryKey="listbox"
    >
      {/* ============================================================
          OVERVIEW
          ============================================================ */}
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-xs space-y-2">
            <WexLabel id="overview-label">Select a City</WexLabel>
            <WexListbox
              options={cities}
              value={singleValue}
              onValueChange={(val) => setSingleValue(val as string)}
              aria-labelledby="overview-label"
            >
              <WexListbox.Options />
            </WexListbox>
            <p className="text-xs text-muted-foreground">
              Selected: {singleValue || "(none)"}
            </p>
          </div>
        </ExampleCard>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> Listbox is ideal for selecting one or more options from a list.
            It provides full keyboard navigation with Arrow keys, Home, End, Enter, Space, and type-ahead search.
            Use it when you need an inline selection list rather than a dropdown.
          </p>
        </div>
      </Section>

      {/* ============================================================
          SELECTION MODES
          ============================================================ */}
      <Section title="Selection Modes" description="Single and multiple selection options with visual indicators.">
        <div className="grid md:grid-cols-2 gap-6">
          <ExampleCard title="Single Selection">
            <div className="w-full space-y-2">
              <WexLabel id="single-label">Choose City</WexLabel>
              <WexListbox
                options={cities}
                value={singleValue}
                onValueChange={(val) => setSingleValue(val as string)}
                aria-labelledby="single-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Selected: {singleValue || "(none)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Single with Checkmark">
            <div className="w-full space-y-2">
              <WexLabel id="checkmark-label">Choose City</WexLabel>
              <WexListbox
                options={cities}
                value={checkmarkValue}
                onValueChange={(val) => setCheckmarkValue(val as string)}
                checkmark
                aria-labelledby="checkmark-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Selected: {checkmarkValue || "(none)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Multiple Selection">
            <div className="w-full space-y-2">
              <WexLabel id="multi-label">Select Cities</WexLabel>
              <WexListbox
                options={cities}
                value={multiValue}
                onValueChange={(val) => setMultiValue(val as string[])}
                multiple
                aria-labelledby="multi-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Selected: {multiValue.length > 0 ? multiValue.join(", ") : "(none)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Multiple with Checkboxes">
            <div className="w-full space-y-2">
              <WexLabel id="checkbox-label">Select Cities</WexLabel>
              <WexListbox
                options={cities}
                value={checkboxValue}
                onValueChange={(val) => setCheckboxValue(val as string[])}
                multiple
                checkbox
                aria-labelledby="checkbox-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Selected: {checkboxValue.length > 0 ? checkboxValue.join(", ") : "(none)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Multiple with Select All">
            <div className="w-full space-y-2">
              <WexLabel id="selectall-label">Select Cities</WexLabel>
              <WexListbox
                options={cities}
                value={selectAllValue}
                onValueChange={(val) => setSelectAllValue(val as string[])}
                multiple
                checkbox
                aria-labelledby="selectall-label"
              >
                <WexListbox.SelectAll />
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Selected: {selectAllValue.length > 0 ? selectAllValue.join(", ") : "(none)"}
              </p>
              <p className="text-xs text-muted-foreground italic">
                The Select All checkbox shows indeterminate state when some items are selected.
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          FILTER
          ============================================================ */}
      <Section title="Filter" description="Searchable listbox with filter input.">
        <ExampleCard title="With Search Filter">
          <div className="w-full max-w-xs space-y-2">
            <WexLabel id="filter-label">Search and Select City</WexLabel>
            <WexListbox
              options={cities}
              value={filterValue}
              onValueChange={(val) => setFilterValue(val as string)}
              checkmark
              aria-labelledby="filter-label"
            >
              <WexListbox.Header>
                <WexListbox.Filter placeholder="Search city..." />
              </WexListbox.Header>
              <WexListbox.Options />
              <WexListbox.Empty>No cities found</WexListbox.Empty>
            </WexListbox>
            <p className="text-xs text-muted-foreground">
              Selected: {filterValue || "(none)"}
            </p>
          </div>
        </ExampleCard>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> Add <code className="bg-muted px-1 rounded">WexListbox.Header</code> with <code className="bg-muted px-1 rounded">WexListbox.Filter</code> to enable search.
            Use <code className="bg-muted px-1 rounded">WexListbox.Empty</code> to customize the empty state message.
          </p>
        </div>
      </Section>

      {/* ============================================================
          GROUPED OPTIONS
          ============================================================ */}
      <Section title="Grouped Options" description="Options organized by category.">
        <ExampleCard title="Grouped by Region">
          <div className="w-full max-w-xs space-y-2">
            <WexLabel id="grouped-label">Select City by Region</WexLabel>
            <WexListbox
              options={groupedCities}
              value={groupedValue}
              onValueChange={(val) => setGroupedValue(val as string)}
              checkmark
              aria-labelledby="grouped-label"
            >
              <WexListbox.Options />
            </WexListbox>
            <p className="text-xs text-muted-foreground">
              Selected: {groupedValue || "(none)"}
            </p>
          </div>
        </ExampleCard>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> Add a <code className="bg-muted px-1 rounded">group</code> property to your options.
            Options with the same group name will be grouped together automatically.
          </p>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Disabled and invalid states.">
        <div className="grid md:grid-cols-2 gap-6">
          <ExampleCard title="Disabled Options">
            <div className="w-full space-y-2">
              <WexLabel id="disabled-options-label">Select City</WexLabel>
              <WexListbox
                options={citiesWithDisabled}
                value={disabledOptionsValue}
                onValueChange={(val) => setDisabledOptionsValue(val as string)}
                checkmark
                aria-labelledby="disabled-options-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Chicago and Phoenix are disabled
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Listbox">
            <div className="w-full space-y-2">
              <WexLabel id="disabled-listbox-label">Select City (Disabled)</WexLabel>
              <WexListbox
                options={cities}
                value="ny"
                onValueChange={() => {}}
                disabled
                aria-labelledby="disabled-listbox-label"
              >
                <WexListbox.Options />
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Entire listbox is disabled
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Invalid State">
            <div className="w-full space-y-2">
              <WexLabel id="invalid-label">Select City (Required)</WexLabel>
              <WexListbox
                options={cities}
                value={invalidValue}
                onValueChange={(val) => setInvalidValue(val as string)}
                invalid={!invalidValue}
                aria-labelledby="invalid-label"
                aria-invalid={!invalidValue}
              >
                <WexListbox.Options />
              </WexListbox>
              {!invalidValue && (
                <p className="text-xs text-destructive dark:text-red-400">Please select a city</p>
              )}
            </div>
          </ExampleCard>

          <ExampleCard title="Manual Options">
            <div className="w-full space-y-2">
              <WexLabel id="manual-label">Choose Option</WexLabel>
              <WexListbox
                value={singleValue}
                onValueChange={(val) => setSingleValue(val as string)}
                checkmark
                aria-labelledby="manual-label"
              >
                <WexListbox.Options>
                  <WexListbox.Option uKey="opt1">Option One</WexListbox.Option>
                  <WexListbox.Option uKey="opt2">Option Two</WexListbox.Option>
                  <WexListbox.Option uKey="opt3" disabled>Option Three (disabled)</WexListbox.Option>
                  <WexListbox.Option uKey="opt4">Option Four</WexListbox.Option>
                </WexListbox.Options>
              </WexListbox>
              <p className="text-xs text-muted-foreground">
                Using manual options with uKey
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          ACCESSIBILITY
          ============================================================ */}
      <AccessibilitySection
        compliance="2.2"
        level="AA"
        notes={[
          {
            title: "Keyboard Navigation",
            items: [
              "Tab: Focus the listbox (first option or last focused option)",
              "Arrow Down: Move focus to next option",
              "Arrow Up: Move focus to previous option",
              "Home: Move focus to first option",
              "End: Move focus to last option",
              "Enter/Space: Select the focused option",
              "Ctrl+A: Select all (in multiple mode)",
              "Type-ahead: Jump to option starting with typed characters",
            ],
          },
          {
            title: "ARIA Attributes",
            description:
              "The listbox uses role=\"listbox\" with aria-multiselectable for multiple selection. Options use role=\"option\" with aria-selected. Use aria-label or aria-labelledby for labeling.",
          },
          {
            title: "Focus Management",
            description:
              "Uses roving tabindex pattern - only the focused/first-enabled option is tabbable. This ensures proper keyboard navigation without requiring Tab to move between options.",
          },
        ]}
      />

      {/* ============================================================
          USAGE
          ============================================================ */}
      <Section title="Usage">
        <CodeBlock
          code={`import { WexListbox, type ListboxOptionData } from "@/components/wex";

// Define your options
const cities: ListboxOptionData[] = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi" },
];

// Basic single selection
<WexListbox
  options={cities}
  value={selected}
  onValueChange={setSelected}
  aria-label="Select a city"
>
  <WexListbox.Options />
</WexListbox>

// Multiple selection with checkboxes
<WexListbox
  options={cities}
  value={selectedCities}
  onValueChange={setSelectedCities}
  multiple
  checkbox
  aria-label="Select cities"
>
  <WexListbox.Options />
</WexListbox>

// With filter search
<WexListbox
  options={cities}
  value={selected}
  onValueChange={setSelected}
  checkmark
  aria-label="Select a city"
>
  <WexListbox.Header>
    <WexListbox.Filter placeholder="Search..." />
  </WexListbox.Header>
  <WexListbox.Options />
  <WexListbox.Empty>No results</WexListbox.Empty>
</WexListbox>

// Grouped options (add group property to options)
const groupedCities: ListboxOptionData[] = [
  { label: "New York", value: "ny", group: "East Coast" },
  { label: "Los Angeles", value: "la", group: "West Coast" },
];

// Manual options
<WexListbox value={selected} onValueChange={setSelected}>
  <WexListbox.Options>
    <WexListbox.Option uKey="opt1">Option One</WexListbox.Option>
    <WexListbox.Option uKey="opt2" disabled>Option Two</WexListbox.Option>
  </WexListbox.Options>
</WexListbox>`}
        />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <h3 className="text-lg font-semibold mb-3">WexListbox Props</h3>
        <PropsTable props={listboxProps} />

        <h3 className="text-lg font-semibold mt-8 mb-3">ListboxOptionData</h3>
        <PropsTable props={optionDataProps} />
      </Section>
    </ComponentPage>
  );
}


import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";
import { WexMultiSelect, WexLabel, WexFloatLabel } from "@/components/wex";

// Sample data
const cities = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi" },
  { label: "Houston", value: "hou" },
  { label: "Phoenix", value: "phx" },
  { label: "Philadelphia", value: "phi" },
  { label: "San Antonio", value: "sa" },
  { label: "San Diego", value: "sd" },
];

const groupedCities = [
  { label: "New York", value: "ny", group: "East Coast" },
  { label: "Boston", value: "bos", group: "East Coast" },
  { label: "Philadelphia", value: "phi", group: "East Coast" },
  { label: "Los Angeles", value: "la", group: "West Coast" },
  { label: "San Francisco", value: "sf", group: "West Coast" },
  { label: "Seattle", value: "sea", group: "West Coast" },
  { label: "Chicago", value: "chi", group: "Midwest" },
  { label: "Detroit", value: "det", group: "Midwest" },
];

const citiesWithDisabled = [
  { label: "New York", value: "ny" },
  { label: "Los Angeles", value: "la" },
  { label: "Chicago", value: "chi", disabled: true },
  { label: "Houston", value: "hou" },
  { label: "Phoenix", value: "phx", disabled: true },
];

// Props documentation
const multiSelectProps: PropDefinition[] = [
  { name: "options", type: "MultiSelectOption[]", required: true, description: "Array of options with label, value, disabled?, and group?" },
  { name: "value", type: "string[]", description: "Currently selected values" },
  { name: "onValueChange", type: "(value: string[]) => void", description: "Callback when selection changes" },
  { name: "display", type: '"comma" | "chips"', default: '"comma"', description: "Display mode for selected items" },
  { name: "placeholder", type: "string", default: '"Select..."', description: "Placeholder text when nothing selected" },
  { name: "maxSelectedLabels", type: "number", default: "3", description: "When selection exceeds this number, shows 'X items selected' instead" },
  { name: "filter", type: "boolean", default: "false", description: "Show filter input" },
  { name: "filterPlaceholder", type: "string", default: '"Search..."', description: "Filter input placeholder" },
  { name: "showSelectAll", type: "boolean", default: "false", description: "Show select all checkbox" },
  { name: "selectAllLabel", type: "string", default: '"Select All"', description: "Label for select all checkbox" },
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size variant" },
  { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Visual variant" },
  { name: "disabled", type: "boolean", default: "false", description: "Disabled state" },
  { name: "invalid", type: "boolean", default: "false", description: "Invalid state" },
  { name: "floatLabel", type: "boolean", default: "false", description: "Adjusts styling for WexFloatLabel wrapper" },
  { name: "emptyText", type: "string", default: '"No options found"', description: "Empty state text when filter returns no results" },
];

export default function MultiSelectPage() {
  // Demo state - each section has its own state
  const [overviewValue, setOverviewValue] = React.useState<string[]>([]);
  
  // Display modes - separate state for each
  const [commaValue, setCommaValue] = React.useState<string[]>(["ny", "la"]);
  const [chipsValue, setChipsValue] = React.useState<string[]>(["ny", "la"]);
  const [maxLabelsValue, setMaxLabelsValue] = React.useState<string[]>(["ny", "la", "chi", "hou"]);
  
  // Filter and Select All
  const [filterValue, setFilterValue] = React.useState<string[]>([]);
  const [selectAllValue, setSelectAllValue] = React.useState<string[]>([]);
  const [filterSelectAllValue, setFilterSelectAllValue] = React.useState<string[]>([]);
  
  // Float Label - separate state for each
  const [floatDefaultValue, setFloatDefaultValue] = React.useState<string[]>([]);
  const [floatFilledValue, setFloatFilledValue] = React.useState<string[]>([]);
  const [floatChipsValue, setFloatChipsValue] = React.useState<string[]>(["ny"]);
  const [floatFilterValue, setFloatFilterValue] = React.useState<string[]>([]);
  
  // Sizes
  const [sizesSmValue, setSizesSmValue] = React.useState<string[]>([]);
  const [sizesMdValue, setSizesMdValue] = React.useState<string[]>([]);
  const [sizesLgValue, setSizesLgValue] = React.useState<string[]>([]);
  
  // Variants
  const [variantDefaultValue, setVariantDefaultValue] = React.useState<string[]>([]);
  const [variantFilledValue, setVariantFilledValue] = React.useState<string[]>([]);
  
  // States
  const [invalidValue, setInvalidValue] = React.useState<string[]>([]);
  const [invalidFilledValue, setInvalidFilledValue] = React.useState<string[]>([]);
  const [disabledOptionsValue, setDisabledOptionsValue] = React.useState<string[]>([]);
  
  // Grouped
  const [groupedValue, setGroupedValue] = React.useState<string[]>([]);

  return (
    <ComponentPage
      title="Multi Select"
      description="A dropdown component for selecting multiple options with various display modes."
      status="stable"
      registryKey="multi-select"
    >
      {/* ============================================================
          OVERVIEW
          ============================================================ */}
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-xs space-y-2">
            <WexLabel htmlFor="overview-multiselect">Select Cities</WexLabel>
            <WexMultiSelect
              id="overview-multiselect"
              options={cities}
              value={overviewValue}
              onValueChange={setOverviewValue}
              placeholder="Select cities..."
              aria-label="Select cities"
            />
            <p className="text-xs text-muted-foreground">
              Selected: {overviewValue.length > 0 ? overviewValue.join(", ") : "(none)"}
            </p>
          </div>
        </ExampleCard>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> MultiSelect is ideal for scenarios where users need to select
            multiple items from a list, such as selecting cities, tags, categories, or permissions.
            The component supports filtering, select all, and various display modes.
          </p>
        </div>
      </Section>

      {/* ============================================================
          DISPLAY MODES
          ============================================================ */}
      <Section title="Display Modes" description="Different ways to display selected items.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Comma (Default)">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="comma-mode">Comma Display</WexLabel>
              <WexMultiSelect
                id="comma-mode"
                options={cities}
                value={commaValue}
                onValueChange={setCommaValue}
                display="comma"
                placeholder="Select cities..."
                aria-label="Comma display mode"
                maxSelectedLabels={6}
              />
              <p className="text-xs text-muted-foreground">
                Shows comma-separated labels: "Item1, Item2, Item3"
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Chips">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="chips-mode">Chips Display</WexLabel>
              <WexMultiSelect
                id="chips-mode"
                options={cities}
                value={chipsValue}
                onValueChange={setChipsValue}
                display="chips"
                placeholder="Select cities..."
                aria-label="Chips display mode"
              />
              <p className="text-xs text-muted-foreground">
                Shows removable badge chips
              </p>
            </div>
          </ExampleCard>
        </div>

        <div className="mt-4">
          <ExampleCard title="maxSelectedLabels Behavior">
            <div className="space-y-2 w-full max-w-xs">
              <WexLabel htmlFor="max-labels">maxSelectedLabels=3</WexLabel>
              <WexMultiSelect
                id="max-labels"
                options={cities}
                value={maxLabelsValue}
                onValueChange={setMaxLabelsValue}
                placeholder="Select cities..."
                aria-label="Max labels demo"
              />
              <p className="text-xs text-muted-foreground">
                When more than 3 items are selected, shows "X items selected" instead
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          FILTER
          ============================================================ */}
      <Section title="Filter" description="Enable search/filter functionality.">
        <ExampleCard title="With Filter">
          <div className="space-y-2 w-full max-w-xs">
            <WexLabel htmlFor="filter-multiselect">Search Cities</WexLabel>
            <WexMultiSelect
              id="filter-multiselect"
              options={cities}
              value={filterValue}
              onValueChange={setFilterValue}
              filter
              filterPlaceholder="Search cities..."
              placeholder="Select cities..."
              aria-label="Searchable multi-select"
            />
            <p className="text-xs text-muted-foreground">
              Type to filter the options list
            </p>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          SELECT ALL
          ============================================================ */}
      <Section title="Select All" description="Enable select/deselect all functionality.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="With Select All">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="selectall-multiselect">Select Cities</WexLabel>
              <WexMultiSelect
                id="selectall-multiselect"
                options={cities}
                value={selectAllValue}
                onValueChange={setSelectAllValue}
                showSelectAll
                selectAllLabel="Select All Cities"
                placeholder="Select cities..."
                aria-label="Multi-select with select all"
              />
              <p className="text-xs text-muted-foreground">
                Use the checkbox to select/deselect all
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="With Filter and Select All">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="filter-selectall">Combined Features</WexLabel>
              <WexMultiSelect
                id="filter-selectall"
                options={cities}
                value={filterSelectAllValue}
                onValueChange={setFilterSelectAllValue}
                filter
                showSelectAll
                placeholder="Select cities..."
                aria-label="Multi-select with filter and select all"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          FLOAT LABEL
          ============================================================ */}
      <Section title="Float Label" description="Use WexFloatLabel wrapper for floating label behavior.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Default Variant">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexMultiSelect
                  options={cities}
                  value={floatDefaultValue}
                  onValueChange={setFloatDefaultValue}
                  floatLabel
                  aria-label="Cities with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Select Cities</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Filled Variant">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexMultiSelect
                  options={cities}
                  value={floatFilledValue}
                  onValueChange={setFloatFilledValue}
                  variant="filled"
                  floatLabel
                  aria-label="Cities with float label filled"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Select Cities</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="With Chips">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexMultiSelect
                  options={cities}
                  value={floatChipsValue}
                  onValueChange={setFloatChipsValue}
                  display="chips"
                  floatLabel
                  aria-label="Chips with float label"
                  maxSelectedLabels={6}
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Select Cities</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="With Filter">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexMultiSelect
                  options={cities}
                  value={floatFilterValue}
                  onValueChange={setFloatFilterValue}
                  filter
                  floatLabel
                  aria-label="Filter with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Select Cities</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> Add the <code className="bg-muted px-1 rounded">floatLabel</code> prop
            to adjust height and padding. Wrap in <code className="bg-muted px-1 rounded">WexFloatLabel.Input</code> and add a <code className="bg-muted px-1 rounded">WexFloatLabel.Label</code>.
            When using float label, the placeholder is hidden and the label acts as the placeholder.
          </p>
        </div>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Available size options.">
        <ExampleCard>
          <div className="flex flex-col gap-4 w-64">
            <div className="space-y-1">
              <WexLabel htmlFor="size-sm" className="text-xs">Small</WexLabel>
              <WexMultiSelect
                id="size-sm"
                options={cities}
                value={sizesSmValue}
                onValueChange={setSizesSmValue}
                size="sm"
                placeholder="Select cities..."
                aria-label="Small size multi-select"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-md">Medium (Default)</WexLabel>
              <WexMultiSelect
                id="size-md"
                options={cities}
                value={sizesMdValue}
                onValueChange={setSizesMdValue}
                size="md"
                placeholder="Select cities..."
                aria-label="Medium size multi-select"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-lg" className="text-lg">Large</WexLabel>
              <WexMultiSelect
                id="size-lg"
                options={cities}
                value={sizesLgValue}
                onValueChange={setSizesLgValue}
                size="lg"
                placeholder="Select cities..."
                aria-label="Large size multi-select"
              />
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          VARIANTS
          ============================================================ */}
      <Section title="Variants" description="Visual styling variants.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Default">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="variant-default">Default Variant</WexLabel>
              <WexMultiSelect
                id="variant-default"
                options={cities}
                value={variantDefaultValue}
                onValueChange={setVariantDefaultValue}
                variant="default"
                placeholder="Select cities..."
                aria-label="Default variant multi-select"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Filled">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="variant-filled">Filled Variant</WexLabel>
              <WexMultiSelect
                id="variant-filled"
                options={cities}
                value={variantFilledValue}
                onValueChange={setVariantFilledValue}
                variant="filled"
                placeholder="Select cities..."
                aria-label="Filled variant multi-select"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and validation states.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Invalid">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="invalid-multiselect">Select at least 2 cities</WexLabel>
              <WexMultiSelect
                id="invalid-multiselect"
                options={cities}
                value={invalidValue}
                onValueChange={setInvalidValue}
                invalid={invalidValue.length < 2}
                placeholder="Select cities..."
                aria-label="Invalid state multi-select"
              />
              {invalidValue.length < 2 ? (
                <p className="text-xs text-destructive dark:text-red-400">Please select at least 2 cities</p>
              ) : (
                <p className="text-xs text-success">✓ Valid</p>
              )}
            </div>
          </ExampleCard>

          <ExampleCard title="Invalid (Filled Variant)">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="invalid-filled">Required Field</WexLabel>
              <WexMultiSelect
                id="invalid-filled"
                options={cities}
                value={invalidFilledValue}
                onValueChange={setInvalidFilledValue}
                variant="filled"
                invalid={invalidFilledValue.length === 0}
                placeholder="Select cities..."
                aria-label="Invalid filled multi-select"
              />
              {invalidFilledValue.length === 0 && (
                <p className="text-xs text-destructive dark:text-red-400">This field is required</p>
              )}
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="disabled-multiselect">Read Only Selection</WexLabel>
              <WexMultiSelect
                id="disabled-multiselect"
                options={cities}
                value={["ny", "la"]}
                disabled
                placeholder="Select cities..."
                aria-label="Disabled multi-select"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Options">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="disabled-options">Some Options Disabled</WexLabel>
              <WexMultiSelect
                id="disabled-options"
                options={citiesWithDisabled}
                value={disabledOptionsValue}
                onValueChange={setDisabledOptionsValue}
                placeholder="Select cities..."
                aria-label="Multi-select with disabled options"
              />
              <p className="text-xs text-muted-foreground">
                Chicago and Phoenix are disabled
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          GROUPED OPTIONS
          ============================================================ */}
      <Section title="Grouped Options" description="Options organized by group.">
        <ExampleCard title="Grouped by Region">
          <div className="space-y-2 w-full max-w-xs">
            <WexLabel htmlFor="grouped-multiselect">Select Cities by Region</WexLabel>
            <WexMultiSelect
              id="grouped-multiselect"
              options={groupedCities}
              value={groupedValue}
              onValueChange={setGroupedValue}
              showSelectAll
              filter
              placeholder="Select cities..."
              aria-label="Grouped multi-select"
            />
            <p className="text-xs text-muted-foreground">
              Options are grouped by region
            </p>
          </div>
        </ExampleCard>
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
              "Enter/Space: Open dropdown or select focused option",
              "Escape: Close dropdown",
              "Arrow Down/Up: Navigate through options",
              "Home: Jump to first option",
              "End: Jump to last option",
              "Tab: Close dropdown and move focus",
            ],
          },
          {
            title: "ARIA Attributes",
            description:
              "Uses role='combobox' on trigger, role='listbox' on options container, and role='option' on each option. aria-selected indicates selection state.",
          },
          {
            title: "Focus Management",
            description:
              "Focus stays within the dropdown while open. Closing returns focus to the trigger. Selected options have visible focus indicators.",
          },
        ]}
      />

      {/* ============================================================
          USAGE
          ============================================================ */}
      <Section title="Usage">
        <CodeBlock
          code={`import { WexMultiSelect, WexFloatLabel } from "@/components/wex";

// Basic usage
<WexMultiSelect
  options={cities}
  value={selected}
  onValueChange={setSelected}
  placeholder="Select cities..."
/>

// Chips display with filter
<WexMultiSelect
  options={cities}
  value={selected}
  onValueChange={setSelected}
  display="chips"
  filter
/>

// With select all
<WexMultiSelect
  options={cities}
  value={selected}
  onValueChange={setSelected}
  showSelectAll
  selectAllLabel="Select All Cities"
/>

// Using maxSelectedLabels (shows "X items selected" when exceeded)
<WexMultiSelect
  options={cities}
  value={selected}
  onValueChange={setSelected}
  maxSelectedLabels={3}
/>

// With Float Label
<WexFloatLabel>
  <WexFloatLabel.Input>
    <WexMultiSelect
      options={cities}
      value={selected}
      onValueChange={setSelected}
      floatLabel
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Select Cities</WexFloatLabel.Label>
</WexFloatLabel>

// Grouped options
<WexMultiSelect
  options={[
    { label: "New York", value: "ny", group: "East Coast" },
    { label: "Boston", value: "bos", group: "East Coast" },
    { label: "Los Angeles", value: "la", group: "West Coast" },
  ]}
  value={selected}
  onValueChange={setSelected}
/>`}
        />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <PropsTable props={multiSelectProps} />
      </Section>
    </ComponentPage>
  );
}


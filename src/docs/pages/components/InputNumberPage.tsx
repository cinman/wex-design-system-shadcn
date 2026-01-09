import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";
import { WexInputNumber, WexLabel, WexFloatLabel } from "@/components/wex";

// Props documentation for WexInputNumber
const inputNumberProps: PropDefinition[] = [
  { name: "value", type: "number | null", description: "Controlled value" },
  { name: "defaultValue", type: "number | null", description: "Default value for uncontrolled usage" },
  { name: "onValueChange", type: "(value: number | null) => void", description: "Callback when value changes" },
  { name: "mode", type: '"decimal" | "currency"', default: '"decimal"', description: "Number format mode" },
  { name: "currency", type: "string", default: '"USD"', description: "Currency code (ISO 4217) for currency mode" },
  { name: "currencyDisplay", type: '"symbol" | "code" | "name"', default: '"symbol"', description: "Currency display format" },
  { name: "locale", type: "string", description: "Locale for number formatting (defaults to browser locale)" },
  { name: "useGrouping", type: "boolean", default: "true", description: "Use digit grouping (thousand separators)" },
  { name: "minFractionDigits", type: "number", description: "Minimum fraction digits" },
  { name: "maxFractionDigits", type: "number", description: "Maximum fraction digits" },
  { name: "min", type: "number", description: "Minimum allowed value" },
  { name: "max", type: "number", description: "Maximum allowed value" },
  { name: "step", type: "number", default: "1", description: "Step for increment/decrement" },
  { name: "prefix", type: "string", description: "Text before the value (decimal mode)" },
  { name: "suffix", type: "string", description: "Text after the value (decimal mode)" },
  { name: "showButtons", type: "boolean", default: "false", description: "Show increment/decrement buttons" },
  { name: "buttonLayout", type: '"stacked" | "horizontal" | "none"', default: '"none"', description: "Button layout when showButtons is true" },
  { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
  { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Visual variant" },
  { name: "invalid", type: "boolean", default: "false", description: "Invalid state" },
  { name: "allowEmpty", type: "boolean", default: "true", description: "Allow empty/null value" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
  { name: "fluid", type: "boolean", default: "true", description: "Full width" },
];

export default function InputNumberPage() {
  // Demo state
  const [basicValue, setBasicValue] = React.useState<number | null>(42);
  const [currencyValue, setCurrencyValue] = React.useState<number | null>(1500);
  const [percentValue, setPercentValue] = React.useState<number | null>(25);
  const [quantityValue, setQuantityValue] = React.useState<number | null>(1);
  const [boundedValue, setBoundedValue] = React.useState<number | null>(50);
  const [invalidDemoValue, setInvalidDemoValue] = React.useState<number | null>(null);

  return (
    <ComponentPage
      title="Input Number"
      description="Numeric input with increment/decrement buttons, supporting decimal, currency, and locale-aware formatting."
      status="stable"
      registryKey="input-number"
    >
      {/* ============================================================
          OVERVIEW
          ============================================================ */}
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-xs space-y-2">
            <WexLabel htmlFor="overview-input">Quantity</WexLabel>
            <WexInputNumber
              id="overview-input"
              value={basicValue}
              onValueChange={setBasicValue}
            />
            <p className="text-xs text-muted-foreground">Value: {basicValue ?? "null"}</p>
          </div>
        </ExampleCard>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> InputNumber is ideal for numeric data entry like quantities, 
            prices, percentages, and measurements. It provides locale-aware formatting and 
            optional increment/decrement buttons.
          </p>
        </div>
      </Section>

      {/* ============================================================
          NUMERALS
          ============================================================ */}
      <Section title="Numerals" description="Control decimal precision and grouping.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Integer Only">
            <div className="space-y-2">
              <WexLabel htmlFor="int-only">Integer Only</WexLabel>
              <WexInputNumber
                id="int-only"
                defaultValue={42723}
                maxFractionDigits={0}
                aria-label="Integer only value"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Without Grouping">
            <div className="space-y-2">
              <WexLabel htmlFor="no-grouping">Without Grouping</WexLabel>
              <WexInputNumber
                id="no-grouping"
                defaultValue={58151}
                useGrouping={false}
                aria-label="Number without grouping"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Fraction Digits">
            <div className="space-y-2">
              <WexLabel htmlFor="fraction">Min 2, Max 5 Fraction Digits</WexLabel>
              <WexInputNumber
                id="fraction"
                defaultValue={2351.35}
                minFractionDigits={2}
                maxFractionDigits={5}
                aria-label="Decimal value with fraction digits"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Min-Max Boundaries">
            <div className="space-y-2">
              <WexLabel htmlFor="bounded">Min: 0, Max: 100</WexLabel>
              <WexInputNumber
                id="bounded"
                value={boundedValue}
                onValueChange={setBoundedValue}
                min={0}
                max={100}
                aria-label="Bounded value between 0 and 100"
              />
              <p className="text-xs text-muted-foreground">Value: {boundedValue}</p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          CURRENCY
          ============================================================ */}
      <Section title="Currency" description="Display monetary values with currency formatting.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="US Dollars">
            <div className="space-y-2">
              <WexLabel htmlFor="usd-price">Price (USD)</WexLabel>
              <WexInputNumber
                id="usd-price"
                value={currencyValue}
                onValueChange={setCurrencyValue}
                mode="currency"
                currency="USD"
                locale="en-US"
                aria-label="Price in US dollars"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Euros">
            <div className="space-y-2">
              <WexLabel htmlFor="eur-price">Price (EUR)</WexLabel>
              <WexInputNumber
                id="eur-price"
                defaultValue={2500}
                mode="currency"
                currency="EUR"
                locale="de-DE"
                aria-label="Price in Euros"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Currency Code Display">
            <div className="space-y-2">
              <WexLabel htmlFor="inr-price">Price (INR)</WexLabel>
              <WexInputNumber
                id="inr-price"
                defaultValue={4250}
                mode="currency"
                currency="INR"
                currencyDisplay="code"
                locale="en-IN"
                aria-label="Price in Indian Rupees"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Japanese Yen">
            <div className="space-y-2">
              <WexLabel htmlFor="jpy-price">Price (JPY)</WexLabel>
              <WexInputNumber
                id="jpy-price"
                defaultValue={5002}
                mode="currency"
                currency="JPY"
                locale="ja-JP"
                aria-label="Price in Japanese Yen"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          PREFIX & SUFFIX
          ============================================================ */}
      <Section title="Prefix & Suffix" description="Add text before or after the value.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Prefix - Currency Symbol">
            <div className="space-y-2">
              <WexLabel htmlFor="prefix-price">Price</WexLabel>
              <WexInputNumber
                id="prefix-price"
                defaultValue={99}
                prefix="$"
                aria-label="Price with dollar prefix"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Suffix - Distance">
            <div className="space-y-2">
              <WexLabel htmlFor="distance">Distance</WexLabel>
              <WexInputNumber
                id="distance"
                defaultValue={20}
                suffix=" mi"
                aria-label="Distance in miles"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Suffix - Percentage">
            <div className="space-y-2">
              <WexLabel htmlFor="discount">Discount</WexLabel>
              <WexInputNumber
                id="discount"
                value={percentValue}
                onValueChange={setPercentValue}
                suffix="%"
                min={0}
                max={100}
                aria-label="Discount percentage"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Suffix - Duration">
            <div className="space-y-2">
              <WexLabel htmlFor="expiry">Expiry</WexLabel>
              <WexInputNumber
                id="expiry"
                defaultValue={24}
                suffix=" months"
                aria-label="Expiry duration in months"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Both Prefix & Suffix">
            <div className="space-y-2">
              <WexLabel htmlFor="temp-change">Temperature Change</WexLabel>
              <WexInputNumber
                id="temp-change"
                defaultValue={10}
                prefix="↑ "
                suffix="°C"
                aria-label="Temperature change in Celsius"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Suffix - Weight">
            <div className="space-y-2">
              <WexLabel htmlFor="weight">Weight</WexLabel>
              <WexInputNumber
                id="weight"
                defaultValue={75}
                suffix=" kg"
                aria-label="Weight in kilograms"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          BUTTONS
          ============================================================ */}
      <Section title="Buttons" description="Show increment/decrement buttons.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Stacked Buttons">
            <div className="space-y-2">
              <WexLabel htmlFor="qty-stacked">Quantity</WexLabel>
              <WexInputNumber
                id="qty-stacked"
                value={quantityValue}
                onValueChange={setQuantityValue}
                showButtons
                buttonLayout="stacked"
                min={1}
                max={99}
                aria-label="Quantity with stacked buttons"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Horizontal Buttons">
            <div className="space-y-2">
              <WexLabel htmlFor="qty-horizontal">Quantity</WexLabel>
              <WexInputNumber
                id="qty-horizontal"
                defaultValue={5}
                showButtons
                buttonLayout="horizontal"
                min={0}
                max={20}
                aria-label="Quantity with horizontal buttons"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="With Step">
            <div className="space-y-2">
              <WexLabel htmlFor="step-value">Value (step: 5)</WexLabel>
              <WexInputNumber
                id="step-value"
                defaultValue={50}
                showButtons
                buttonLayout="stacked"
                step={5}
                min={0}
                max={100}
                aria-label="Value with step increment of 5"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Currency with Buttons">
            <div className="space-y-2">
              <WexLabel htmlFor="donation">Donation Amount</WexLabel>
              <WexInputNumber
                id="donation"
                defaultValue={25}
                showButtons
                buttonLayout="horizontal"
                mode="currency"
                currency="USD"
                locale="en-US"
                step={5}
                min={5}
                max={500}
                aria-label="Donation amount in US dollars"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Available size options.">
        <ExampleCard>
          <div className="flex flex-col gap-4 max-w-xs">
            <div className="space-y-1">
              <WexLabel htmlFor="size-sm" className="text-xs">Small</WexLabel>
              <WexInputNumber
                id="size-sm"
                defaultValue={100}
                inputSize="sm"
                showButtons
                buttonLayout="stacked"
                aria-label="Small size input"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-md">Medium (Default)</WexLabel>
              <WexInputNumber
                id="size-md"
                defaultValue={100}
                inputSize="md"
                showButtons
                buttonLayout="stacked"
                aria-label="Medium size input"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-lg" className="text-lg">Large</WexLabel>
              <WexInputNumber
                id="size-lg"
                defaultValue={100}
                inputSize="lg"
                showButtons
                buttonLayout="stacked"
                aria-label="Large size input"
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
            <div className="space-y-2">
              <WexLabel htmlFor="variant-default">Default Variant</WexLabel>
              <WexInputNumber
                id="variant-default"
                defaultValue={50}
                variant="default"
                aria-label="Default variant input"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Filled">
            <div className="space-y-2">
              <WexLabel htmlFor="variant-filled">Filled Variant</WexLabel>
              <WexInputNumber
                id="variant-filled"
                defaultValue={50}
                variant="filled"
                aria-label="Filled variant input"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          FLOAT LABEL
          ============================================================ */}
      <Section title="Float Label" description="Use WexFloatLabel wrapper for floating label behavior with any input.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Basic Float Label">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={10} floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Quantity</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="With Buttons (Min 1, Max 99)">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber
                  defaultValue={5}
                  showButtons
                  buttonLayout="stacked"
                  min={1}
                  max={99}
                  floatLabel
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Items</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Currency Float Label">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber
                  defaultValue={1999.99}
                  mode="currency"
                  currency="USD"
                  locale="en-US"
                  floatLabel
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Price</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Filled Variant">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={100} variant="filled" floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Amount</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> The WexFloatLabel wrapper works with any input component. For InputNumber, add the <code className="bg-muted px-1 rounded">floatLabel</code> prop 
            to adjust height and padding. Wrap your input in <code className="bg-muted px-1 rounded">WexFloatLabel.Input</code> and add a <code className="bg-muted px-1 rounded">WexFloatLabel.Label</code>.
          </p>
        </div>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Interactive and validation states.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Invalid">
            <div className="space-y-2">
              <WexLabel htmlFor="invalid-amount">Amount (required)</WexLabel>
              <WexInputNumber
                id="invalid-amount"
                value={invalidDemoValue}
                onValueChange={setInvalidDemoValue}
                invalid={invalidDemoValue === null}
                placeholder="Enter amount"
                aria-label="Required amount field"
                aria-invalid={invalidDemoValue === null}
              />
              {invalidDemoValue === null ? (
                <p className="text-xs text-destructive dark:text-red-400">This field is required</p>
              ) : (
                <p className="text-xs text-success">✓ Valid</p>
              )}
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled">
            <div className="space-y-2">
              <WexLabel htmlFor="disabled-value">Read Only Value</WexLabel>
              <WexInputNumber
                id="disabled-value"
                defaultValue={100}
                disabled
                showButtons
                buttonLayout="stacked"
                aria-label="Disabled read only value"
              />
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
              "Tab: Focus the input",
              "Arrow Up: Increment value",
              "Arrow Down: Decrement value",
              "Home: Set to minimum value (if defined)",
              "End: Set to maximum value (if defined)",
            ],
          },
          {
            title: "ARIA Attributes",
            description:
              "The input uses role='spinbutton' with aria-valuenow, aria-valuemin, and aria-valuemax for screen reader support.",
          },
          {
            title: "Labels",
            description:
              "Always provide a visible label using WexLabel with htmlFor, or use aria-label for icon-only contexts.",
          },
        ]}
      />

      {/* ============================================================
          USAGE
          ============================================================ */}
      <Section title="Usage">
        <CodeBlock
          code={`import { WexInputNumber, WexFloatLabel } from "@/components/wex";

// Basic usage
<WexInputNumber value={quantity} onValueChange={setQuantity} />

// Currency formatting
<WexInputNumber
  value={price}
  onValueChange={setPrice}
  mode="currency"
  currency="USD"
  locale="en-US"
/>

// With increment/decrement buttons
<WexInputNumber
  value={count}
  onValueChange={setCount}
  showButtons
  buttonLayout="stacked"
  min={1}
  max={99}
/>

// With prefix
<WexInputNumber value={price} prefix="$" />

// With suffix
<WexInputNumber value={percentage} suffix="%" min={0} max={100} />

// With both prefix and suffix
<WexInputNumber value={temp} prefix="↑ " suffix="°C" />

// With Float Label (works with any input)
<WexFloatLabel>
  <WexFloatLabel.Input>
    <WexInputNumber
      value={amount}
      onValueChange={setAmount}
      mode="currency"
      currency="USD"
      floatLabel
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Amount</WexFloatLabel.Label>
</WexFloatLabel>`}
        />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <PropsTable props={inputNumberProps} />
      </Section>
    </ComponentPage>
  );
}


import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";
import { WexInputMask, WexLabel, WexFloatLabel } from "@/components/wex";

// Props documentation for WexInputMask
const inputMaskProps: PropDefinition[] = [
  { name: "mask", type: "string", required: true, description: "Mask pattern (9=digit, a=alpha, *=alphanumeric)" },
  { name: "slotChar", type: "string", default: '"_"', description: "Placeholder character for unfilled slots" },
  { name: "value", type: "string", description: "Controlled value (raw, without mask literals)" },
  { name: "defaultValue", type: "string", description: "Default value for uncontrolled usage" },
  { name: "onValueChange", type: "(value: string, isComplete: boolean) => void", description: "Callback when value changes" },
  { name: "onComplete", type: "(value: string) => void", description: "Callback when all slots are filled" },
  { name: "autoClear", type: "boolean", default: "false", description: "Clear incomplete value on blur" },
  { name: "inputSize", type: '"sm" | "md" | "lg"', default: '"md"', description: "Input size" },
  { name: "variant", type: '"default" | "filled"', default: '"default"', description: "Visual variant" },
  { name: "invalid", type: "boolean", default: "false", description: "Invalid state" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the input" },
  { name: "floatLabel", type: "boolean", default: "false", description: "Adjusts styling for WexFloatLabel wrapper" },
];

export default function InputMaskPage() {
  // Demo state
  const [basicValue, setBasicValue] = React.useState<string>("");
  const [ssnValue, setSsnValue] = React.useState<string>("");
  const [phoneValue, setPhoneValue] = React.useState<string>("");
  const [serialValue, setSerialValue] = React.useState<string>("");
  const [dateValue, setDateValue] = React.useState<string>("");
  const [invalidValue, setInvalidValue] = React.useState<string>("");

  return (
    <ComponentPage
      title="Input Mask"
      description="Masked input for formatted data entry such as phone numbers, SSN, dates, and serial numbers."
      status="stable"
      registryKey="input-mask"
    >
      {/* ============================================================
          OVERVIEW
          ============================================================ */}
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-xs space-y-2">
            <WexLabel htmlFor="overview-mask">Serial Key</WexLabel>
            <WexInputMask
              id="overview-mask"
              mask="99-999999"
              value={basicValue}
              onValueChange={(val) => setBasicValue(val)}
              aria-label="Serial key input"
              placeholder="99-999999"
            />
            <p className="text-xs text-muted-foreground">
              Value: {basicValue || "(empty)"}
            </p>
          </div>
        </ExampleCard>
        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> InputMask is ideal for structured data entry where the format
            is fixed, such as phone numbers, social security numbers, dates, and serial codes.
            The mask pattern defines which characters are allowed at each position.
          </p>
        </div>
      </Section>

      {/* ============================================================
          MASK PATTERNS
          ============================================================ */}
      <Section title="Mask Patterns" description="Common mask patterns for different data types.">
        <div className="mb-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Mask characters:</strong>
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li><code className="bg-muted px-1 rounded">9</code> - Numeric (0-9)</li>
            <li><code className="bg-muted px-1 rounded">a</code> - Alphabetic (A-Z, a-z)</li>
            <li><code className="bg-muted px-1 rounded">*</code> - Alphanumeric (0-9, A-Z, a-z)</li>
            <li>Any other character is treated as a literal</li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="SSN">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="ssn-mask">Social Security Number</WexLabel>
              <WexInputMask
                id="ssn-mask"
                mask="999-99-9999"
                value={ssnValue}
                onValueChange={(val) => setSsnValue(val)}
                aria-label="Social security number"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Mask: 999-99-9999 | Value: {ssnValue || "(empty)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Phone Number">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="phone-mask">Phone</WexLabel>
              <WexInputMask
                id="phone-mask"
                mask="(999) 999-9999"
                value={phoneValue}
                onValueChange={(val) => setPhoneValue(val)}
                aria-label="Phone number"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Mask: (999) 999-9999 | Value: {phoneValue || "(empty)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Serial Number (Mixed)">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="serial-mask">Serial Number</WexLabel>
              <WexInputMask
                id="serial-mask"
                mask="a*-999-a999"
                value={serialValue}
                onValueChange={(val) => setSerialValue(val)}
                aria-label="Serial number with mixed characters"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Mask: a*-999-a999 | Value: {serialValue || "(empty)"}
              </p>
            </div>
          </ExampleCard>

          <ExampleCard title="Date">
            <div className="space-y-2 w-full">
              <WexLabel htmlFor="date-mask">Date (MM/DD/YYYY)</WexLabel>
              <WexInputMask
                id="date-mask"
                mask="99/99/9999"
                value={dateValue}
                onValueChange={(val) => setDateValue(val)}
                aria-label="Date input"
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Mask: 99/99/9999 | Value: {dateValue || "(empty)"}
              </p>
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          FLOAT LABEL
          ============================================================ */}
      <Section title="Float Label" description="Use WexFloatLabel wrapper for floating label behavior.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Phone with Float Label">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputMask
                  mask="(999) 999-9999"
                  floatLabel
                  aria-label="Phone number with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Phone Number</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="SSN with Float Label">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputMask
                  mask="999-99-9999"
                  floatLabel
                  aria-label="SSN with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Social Security Number</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Date with Float Label (Filled)">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputMask
                  mask="99/99/9999"
                  variant="filled"
                  floatLabel
                  aria-label="Date with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Date of Birth</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Serial with Float Label">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputMask
                  mask="a*-999-a999"
                  floatLabel
                  aria-label="Serial number with float label"
                />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Serial Number</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>
        </div>

        <div className="mt-4 p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Usage:</strong> Add the <code className="bg-muted px-1 rounded">floatLabel</code> prop 
            to adjust height and padding. Wrap your input in <code className="bg-muted px-1 rounded">WexFloatLabel.Input</code> and add a <code className="bg-muted px-1 rounded">WexFloatLabel.Label</code>.
          </p>
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
              <WexInputMask
                id="size-sm"
                mask="(999) 999-9999"
                inputSize="sm"
                aria-label="Small size input"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-md">Medium (Default)</WexLabel>
              <WexInputMask
                id="size-md"
                mask="(999) 999-9999"
                inputSize="md"
                aria-label="Medium size input"
              />
            </div>
            <div className="space-y-1">
              <WexLabel htmlFor="size-lg" className="text-lg">Large</WexLabel>
              <WexInputMask
                id="size-lg"
                mask="(999) 999-9999"
                inputSize="lg"
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
              <WexInputMask
                id="variant-default"
                mask="999-99-9999"
                variant="default"
                aria-label="Default variant input"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Filled">
            <div className="space-y-2">
              <WexLabel htmlFor="variant-filled">Filled Variant</WexLabel>
              <WexInputMask
                id="variant-filled"
                mask="999-99-9999"
                variant="filled"
                aria-label="Filled variant input"
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
            <div className="space-y-2">
              <WexLabel htmlFor="invalid-mask">Phone (required)</WexLabel>
              <WexInputMask
                id="invalid-mask"
                mask="(999) 999-9999"
                value={invalidValue}
                onValueChange={(val) => setInvalidValue(val)}
                invalid={invalidValue.length < 10}
                aria-label="Required phone field"
                aria-invalid={invalidValue.length < 10}
              />
              {invalidValue.length < 10 ? (
                <p className="text-xs text-destructive dark:text-red-400">Please enter a complete phone number</p>
              ) : (
                <p className="text-xs text-success">✓ Valid</p>
              )}
            </div>
          </ExampleCard>

          <ExampleCard title="Invalid (Filled Variant)">
            <div className="space-y-2">
              <WexLabel htmlFor="invalid-filled-mask">Serial Key</WexLabel>
              <WexInputMask
                id="invalid-filled-mask"
                mask="99-999999"
                variant="filled"
                invalid
                aria-label="Invalid serial key field"
                aria-invalid="true"
              />
              <p className="text-xs text-destructive dark:text-red-400">Invalid serial key format</p>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled">
            <div className="space-y-2">
              <WexLabel htmlFor="disabled-mask">Read Only Value</WexLabel>
              <WexInputMask
                id="disabled-mask"
                mask="999-99-9999"
                defaultValue="123456789"
                disabled
                aria-label="Disabled SSN value"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled (Filled Variant)">
            <div className="space-y-2">
              <WexLabel htmlFor="disabled-filled-mask">Filled Disabled</WexLabel>
              <WexInputMask
                id="disabled-filled-mask"
                mask="(999) 999-9999"
                defaultValue="5551234567"
                variant="filled"
                disabled
                aria-label="Disabled phone value"
              />
            </div>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          SLOT CHARACTER
          ============================================================ */}
      <Section title="Slot Character" description="Customize the placeholder character.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Default (underscore)">
            <div className="space-y-2">
              <WexLabel htmlFor="slot-default">Default: _</WexLabel>
              <WexInputMask
                id="slot-default"
                mask="99/99/9999"
                slotChar="_"
                aria-label="Default slot character"
              />
            </div>
          </ExampleCard>

          <ExampleCard title="Custom (dash)">
            <div className="space-y-2">
              <WexLabel htmlFor="slot-dash">Custom: -</WexLabel>
              <WexInputMask
                id="slot-dash"
                mask="99/99/9999"
                slotChar="-"
                aria-label="Custom slot character dash"
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
              "Type: Enter valid characters per mask slot",
              "Backspace: Delete previous character",
              "Delete: Delete current character",
              "Arrow Left/Right: Navigate within the mask",
              "Home: Move to first input slot",
              "End: Move to end of filled content",
            ],
          },
          {
            title: "ARIA Attributes",
            description:
              "Use aria-label or visible label with htmlFor/id pairing. aria-invalid is set when invalid prop is true.",
          },
          {
            title: "Input Validation",
            description:
              "Invalid characters are automatically rejected. Only characters matching the mask slot type are accepted.",
          },
        ]}
      />

      {/* ============================================================
          USAGE
          ============================================================ */}
      <Section title="Usage">
        <CodeBlock
          code={`import { WexInputMask, WexFloatLabel } from "@/components/wex";

// Basic phone mask
<WexInputMask
  mask="(999) 999-9999"
  value={phone}
  onValueChange={(val, isComplete) => {
    setPhone(val);
    if (isComplete) console.log("Phone complete!");
  }}
/>

// SSN with autoClear (clears incomplete values on blur)
<WexInputMask
  mask="999-99-9999"
  value={ssn}
  onValueChange={setSsn}
  autoClear
/>

// Serial number with mixed mask (alpha, alphanumeric, numeric)
<WexInputMask
  mask="a*-999-a999"
  value={serial}
  onValueChange={setSerial}
/>

// With Float Label
<WexFloatLabel>
  <WexFloatLabel.Input>
    <WexInputMask
      mask="(999) 999-9999"
      floatLabel
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Phone Number</WexFloatLabel.Label>
</WexFloatLabel>

// With validation
<WexInputMask
  mask="999-99-9999"
  value={ssn}
  onValueChange={(val, isComplete) => {
    setSsn(val);
    setIsValid(isComplete);
  }}
  invalid={!isValid && ssn.length > 0}
/>`}
        />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <PropsTable props={inputMaskProps} />
      </Section>
    </ComponentPage>
  );
}


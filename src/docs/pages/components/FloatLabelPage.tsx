import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { Guidance } from "@/docs/components/ProseBlock";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexFloatLabel, WexInputNumber } from "@/components/wex";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";

// Props documentation for WexFloatLabel wrapper
const floatLabelProps: PropDefinition[] = [
  { name: "size", type: '"sm" | "md" | "lg"', default: '"md"', description: "Size variant affecting label positioning" },
  { name: "children", type: "ReactNode", required: true, description: "Should include WexFloatLabel.Input and WexFloatLabel.Label" },
  { name: "className", type: "string", description: "Additional CSS classes for the container" },
];

const floatLabelInputProps: PropDefinition[] = [
  { name: "children", type: "ReactElement", required: true, description: "Any input component (Input, InputNumber, Textarea, etc.)" },
];

const floatLabelLabelProps: PropDefinition[] = [
  { name: "children", type: "ReactNode", required: true, description: "Label text" },
  { name: "className", type: "string", description: "Additional CSS classes for the label" },
];

// Token mappings for FloatLabel - Layer 3 component tokens
const floatLabelTokens: TokenRow[] = [
  { element: "Label", property: "Text (Default)", token: "--wex-component-floatlabel-label-fg" },
  { element: "Label", property: "Text (Focused)", token: "--wex-component-floatlabel-label-focus-fg" },
  { element: "Label", property: "Text (Filled)", token: "--wex-component-floatlabel-label-filled-fg" },
  { element: "Input", property: "Background", token: "--wex-component-input-bg" },
  { element: "Input", property: "Border", token: "--wex-component-input-border" },
  { element: "Input", property: "Border (Focus)", token: "--wex-component-input-border-focus" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-input-focus-ring" },
];

export default function FloatLabelPage() {
  return (
    <ComponentPage
      title="Float Label"
      description="A wrapper component that provides floating label functionality for any input - Input, InputNumber, Textarea, etc."
      status="stable"
      registryKey="float-label"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="w-full max-w-sm">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <Input />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Username</WexFloatLabel.Label>
            </WexFloatLabel>
          </div>
        </ExampleCard>
        <Guidance>
          WexFloatLabel is a wrapper component that provides Material Design / PrimeNG-style 
          floating label functionality for any input. The label appears inside the input when 
          empty, then animates to float above when focused or containing a value.
        </Guidance>
      </Section>

      {/* ============================================================
          WITH DIFFERENT INPUTS
          ============================================================ */}
      <Section title="With Different Inputs" description="Works with Input, InputNumber, Textarea, and more.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Text Input">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <Input type="text" />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Full Name</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Email Input">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <Input type="email" />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Email Address</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Input Number">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Quantity</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Currency Input">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber mode="currency" currency="USD" locale="en-US" floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Price</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>
        </div>

        <CodeBlock language="tsx" code={`import { WexFloatLabel, WexInputNumber } from "@/components/wex";
import { Input } from "@/components/ui/input";

// With text input
<WexFloatLabel>
  <WexFloatLabel.Input>
    <Input type="text" />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Full Name</WexFloatLabel.Label>
</WexFloatLabel>

// With InputNumber (add floatLabel prop for proper height)
<WexFloatLabel>
  <WexFloatLabel.Input>
    <WexInputNumber mode="currency" currency="USD" floatLabel />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Price</WexFloatLabel.Label>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          SIZES
          ============================================================ */}
      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard title="All Sizes">
          <div className="w-full max-w-sm space-y-6">
            <WexFloatLabel size="sm">
              <WexFloatLabel.Input>
                <Input />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Small</WexFloatLabel.Label>
            </WexFloatLabel>

            <WexFloatLabel size="md">
              <WexFloatLabel.Input>
                <Input />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Medium (Default)</WexFloatLabel.Label>
            </WexFloatLabel>

            <WexFloatLabel size="lg">
              <WexFloatLabel.Input>
                <Input />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Large</WexFloatLabel.Label>
            </WexFloatLabel>
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel size="sm">
  <WexFloatLabel.Input><Input /></WexFloatLabel.Input>
  <WexFloatLabel.Label>Small</WexFloatLabel.Label>
</WexFloatLabel>

<WexFloatLabel size="md">
  <WexFloatLabel.Input><Input /></WexFloatLabel.Input>
  <WexFloatLabel.Label>Medium (Default)</WexFloatLabel.Label>
</WexFloatLabel>

<WexFloatLabel size="lg">
  <WexFloatLabel.Input><Input /></WexFloatLabel.Input>
  <WexFloatLabel.Label>Large</WexFloatLabel.Label>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          INPUT NUMBER EXAMPLES
          ============================================================ */}
      <Section title="InputNumber Examples" description="Float label with various InputNumber configurations.">
        <div className="grid md:grid-cols-2 gap-4">
          <ExampleCard title="Basic Number">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={100} floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Amount</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="With Buttons (Min 0, Max 99)">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={5} showButtons buttonLayout="stacked" min={0} max={99} floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Quantity</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Percentage">
            
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={25} suffix="%" floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Discount</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>

          <ExampleCard title="Currency">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <WexInputNumber defaultValue={1500} mode="currency" currency="EUR" locale="de-DE" floatLabel />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Total Price</WexFloatLabel.Label>
            </WexFloatLabel>
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          TEXTAREA
          ============================================================ */}
      <Section title="With Textarea" description="Float label works with textarea too.">
        <ExampleCard title="Textarea">
          <div className="w-full max-w-md">
            <WexFloatLabel>
              <WexFloatLabel.Input>
                <Textarea className="h-14 pt-5 pb-2 min-h-[100px] resize-none" />
              </WexFloatLabel.Input>
              <WexFloatLabel.Label>Description</WexFloatLabel.Label>
            </WexFloatLabel>
          </div>
        </ExampleCard>
        <CodeBlock language="tsx" code={`<WexFloatLabel>
  <WexFloatLabel.Input>
    <Textarea className="h-14 pt-5 pb-2 min-h-[100px] resize-none" />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Description</WexFloatLabel.Label>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          PASSWORD WITH TOGGLE
          ============================================================ */}
      <Section title="Password with Toggle" description="Example with icon buttons.">
        <PasswordWithToggle />
        <CodeBlock language="tsx" code={`const [show, setShow] = React.useState(false);

<WexFloatLabel>
  <WexFloatLabel.Input>
    <Input 
      type={show ? "text" : "password"} 
      className="pr-10"
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Password</WexFloatLabel.Label>
  <button 
    type="button"
    className="absolute right-3 top-1/2 -translate-y-1/2"
    onClick={() => setShow(!show)}
  >
    {show ? <EyeOff /> : <Eye />}
  </button>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          CONTROLLED EXAMPLE
          ============================================================ */}
      <Section title="Controlled" description="Works with controlled inputs.">
        <ControlledExample />
        <CodeBlock language="tsx" code={`const [value, setValue] = React.useState("");

<WexFloatLabel>
  <WexFloatLabel.Input>
    <Input 
      value={value} 
      onChange={(e) => setValue(e.target.value)} 
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Controlled Input</WexFloatLabel.Label>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          CONTROLLED NUMBER EXAMPLE
          ============================================================ */}
      <Section title="Controlled InputNumber" description="Works with controlled InputNumber.">
        <ControlledNumberExample />
        <CodeBlock language="tsx" code={`const [value, setValue] = React.useState<number | null>(100);

<WexFloatLabel>
  <WexFloatLabel.Input>
    <WexInputNumber 
      value={value} 
      onValueChange={setValue}
      mode="currency"
      currency="USD"
      floatLabel
    />
  </WexFloatLabel.Input>
  <WexFloatLabel.Label>Amount</WexFloatLabel.Label>
</WexFloatLabel>`} />
      </Section>

      {/* ============================================================
          API REFERENCE
          ============================================================ */}
      <Section title="API Reference">
        <div className="space-y-6">
          <div>
            <h4 className="font-medium mb-2">WexFloatLabel (Wrapper)</h4>
            <PropsTable props={floatLabelProps} />
          </div>
          <div>
            <h4 className="font-medium mb-2">WexFloatLabel.Input</h4>
            <PropsTable props={floatLabelInputProps} />
          </div>
          <div>
            <h4 className="font-medium mb-2">WexFloatLabel.Label</h4>
            <PropsTable props={floatLabelLabelProps} />
          </div>
        </div>
      </Section>

      {/* ============================================================
          TOKENS
          ============================================================ */}
      <Section title="Token Reference">
        <TokenReference tokens={floatLabelTokens} />
      </Section>

      {/* ============================================================
          USAGE NOTES
          ============================================================ */}
      <Section title="Usage Notes">
        <Guidance>
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Composable:</strong> WexFloatLabel works with any input component - 
              Input, InputNumber, Textarea, Select, etc.
            </li>
            <li>
              <strong>Automatic State:</strong> The wrapper automatically tracks focus and 
              value state from the child input.
            </li>
            <li>
              <strong>Height Adjustment:</strong> Child inputs may need height/padding 
              adjustments (e.g., <code className="bg-muted px-1 rounded">h-14 pt-5 pb-2</code>).
            </li>
            <li>
              <strong>PrimeNG Pattern:</strong> This follows the PrimeNG compound component 
              pattern where FloatLabel wraps any input.
            </li>
          </ul>
        </Guidance>
      </Section>
    </ComponentPage>
  );
}

// Controlled example component
function ControlledExample() {
  const [value, setValue] = React.useState("");

  return (
    <ExampleCard title="Controlled">
      <div className="w-full max-w-sm space-y-4">
        <WexFloatLabel>
          <WexFloatLabel.Input>
            <Input 
              value={value} 
              onChange={(e) => setValue(e.target.value)} 
            />
          </WexFloatLabel.Input>
          <WexFloatLabel.Label>Type something...</WexFloatLabel.Label>
        </WexFloatLabel>
        <p className="text-sm text-muted-foreground">
          Current value: {value ? `"${value}"` : "(empty)"}
        </p>
      </div>
    </ExampleCard>
  );
}

// Controlled InputNumber example
function ControlledNumberExample() {
  const [value, setValue] = React.useState<number | null>(100);

  return (
    <ExampleCard title="Controlled InputNumber">
      <div className="w-full max-w-sm space-y-4">
        <WexFloatLabel>
          <WexFloatLabel.Input>
            <WexInputNumber 
              value={value} 
              onValueChange={setValue}
              mode="currency"
              currency="USD"
              locale="en-US"
              floatLabel
            />
          </WexFloatLabel.Input>
          <WexFloatLabel.Label>Amount</WexFloatLabel.Label>
        </WexFloatLabel>
        <p className="text-sm text-muted-foreground">
          Current value: {value !== null ? `$${value}` : "(empty)"}
        </p>
      </div>
    </ExampleCard>
  );
}

// Password with toggle visibility example
function PasswordWithToggle() {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <ExampleCard title="Password with Toggle">
      <div className="w-full max-w-sm">
        <WexFloatLabel>
          <WexFloatLabel.Input>
            <Input 
              type={showPassword ? "text" : "password"} 
              className="pr-10"
            />
          </WexFloatLabel.Input>
          <WexFloatLabel.Label>Password</WexFloatLabel.Label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors min-h-6 min-w-6 flex items-center justify-center"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </WexFloatLabel>
      </div>
    </ExampleCard>
  );
}

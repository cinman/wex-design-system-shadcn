import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { PropsTable, type PropDefinition } from "@/docs/components/PropsTable";
import { WexCheckbox, WexLabel } from "@/components/wex";

// Interactive Indeterminate Demo Component
function IndeterminateDemo() {
  const [itemsChecked, setItemsChecked] = React.useState([true, false, true]);

  // Calculate parent state
  const allChecked = itemsChecked.every(Boolean);
  const noneChecked = itemsChecked.every((v) => !v);
  const parentState: boolean | "indeterminate" = allChecked
    ? true
    : noneChecked
    ? false
    : "indeterminate";

  // Handle parent checkbox change
  const handleParentChange = (checked: boolean | "indeterminate") => {
    // When parent is clicked, toggle all items on or off
    const newValue = checked === true;
    setItemsChecked([newValue, newValue, newValue]);
  };

  // Handle child checkbox change
  const handleItemChange = (index: number, checked: boolean) => {
    setItemsChecked((prev) => {
      const next = [...prev];
      next[index] = checked;
      return next;
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Click the parent checkbox or individual items to see the indeterminate state in action.
      </p>
      <div className="flex items-center space-x-2">
        <WexCheckbox
          id="select-all"
          checked={parentState}
          onCheckedChange={handleParentChange}
        />
        <WexLabel htmlFor="select-all">Select all items</WexLabel>
      </div>
      <div className="ml-6 space-y-2">
        <div className="flex items-center space-x-2">
          <WexCheckbox
            id="item1"
            checked={itemsChecked[0]}
            onCheckedChange={(checked) => handleItemChange(0, checked === true)}
          />
          <WexLabel htmlFor="item1">Item 1</WexLabel>
        </div>
        <div className="flex items-center space-x-2">
          <WexCheckbox
            id="item2"
            checked={itemsChecked[1]}
            onCheckedChange={(checked) => handleItemChange(1, checked === true)}
          />
          <WexLabel htmlFor="item2">Item 2</WexLabel>
        </div>
        <div className="flex items-center space-x-2">
          <WexCheckbox
            id="item3"
            checked={itemsChecked[2]}
            onCheckedChange={(checked) => handleItemChange(2, checked === true)}
          />
          <WexLabel htmlFor="item3">Item 3</WexLabel>
        </div>
      </div>
    </div>
  );
}

// Props documentation for WexCheckbox
const checkboxProps: PropDefinition[] = [
  { name: "checked", type: 'boolean | "indeterminate"', description: "Controlled checked state" },
  { name: "defaultChecked", type: "boolean", default: "false", description: "Default checked state for uncontrolled usage" },
  { name: "onCheckedChange", type: "(checked: boolean) => void", description: "Callback when checked state changes" },
  { name: "disabled", type: "boolean", default: "false", description: "Disables the checkbox" },
  { name: "required", type: "boolean", default: "false", description: "Marks the checkbox as required" },
  { name: "name", type: "string", description: "Name for form submission" },
  { name: "value", type: "string", default: '"on"', description: "Value for form submission" },
  { name: "id", type: "string", description: "ID for label association" },
];

// Token mappings for Checkbox
// Layer 3 component tokens
const checkboxTokens: TokenRow[] = [
  { element: "Box", property: "Background", token: "--wex-component-checkbox-bg" },
  { element: "Box", property: "Border", token: "--wex-component-checkbox-border" },
  { element: "Box (Checked)", property: "Background", token: "--wex-component-checkbox-checked-bg" },
  { element: "Checkmark", property: "Color", token: "--wex-component-checkbox-checked-fg" },
  { element: "Focus Ring", property: "Color", token: "--wex-component-checkbox-focus-ring" },
  { element: "Disabled", property: "Opacity", token: "--wex-component-checkbox-disabled-opacity" },
];

export default function CheckboxPage() {
  return (
    <ComponentPage
      title="Checkbox"
      description="A control that allows toggling between checked and not checked."
      status="stable"
      registryKey="checkbox"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center space-x-2">
            <WexCheckbox id="terms" />
            <WexLabel htmlFor="terms">Accept terms and conditions</WexLabel>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          STATES
          ============================================================ */}
      <Section title="States" description="Checkbox supports multiple interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Unchecked">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="unchecked" />
              <WexLabel htmlFor="unchecked">Unchecked option</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Checked">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="checked" defaultChecked />
              <WexLabel htmlFor="checked">Checked option</WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Unchecked">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="disabled-unchecked" disabled />
              <WexLabel htmlFor="disabled-unchecked" className="text-muted-foreground">
                Disabled option
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Disabled Checked">
            <div className="flex items-center space-x-2">
              <WexCheckbox id="disabled-checked" disabled defaultChecked />
              <WexLabel htmlFor="disabled-checked" className="text-muted-foreground">
                Locked selection
              </WexLabel>
            </div>
          </ExampleCard>

          <ExampleCard title="Indeterminate">
            <IndeterminateDemo />
          </ExampleCard>
        </div>
      </Section>

      {/* ============================================================
          CHECKBOX GROUPS
          ============================================================ */}
      <Section title="Checkbox Groups" description="Multiple checkboxes for multi-select scenarios.">
        <ExampleCard title="Vertical Group">
          <div className="space-y-3">
            <WexLabel className="text-base font-medium">Select your interests</WexLabel>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <WexCheckbox id="tech" />
                <WexLabel htmlFor="tech">Technology</WexLabel>
              </div>
              <div className="flex items-center space-x-2">
                <WexCheckbox id="design" defaultChecked />
                <WexLabel htmlFor="design">Design</WexLabel>
              </div>
              <div className="flex items-center space-x-2">
                <WexCheckbox id="business" />
                <WexLabel htmlFor="business">Business</WexLabel>
              </div>
            </div>
          </div>
        </ExampleCard>

        <ExampleCard title="Inline Group">
          <div className="space-y-2">
            <WexLabel className="text-base font-medium">Notifications</WexLabel>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <WexCheckbox id="email-notify" defaultChecked />
                <WexLabel htmlFor="email-notify">Email</WexLabel>
              </div>
              <div className="flex items-center space-x-2">
                <WexCheckbox id="sms-notify" />
                <WexLabel htmlFor="sms-notify">SMS</WexLabel>
              </div>
              <div className="flex items-center space-x-2">
                <WexCheckbox id="push-notify" defaultChecked />
                <WexLabel htmlFor="push-notify">Push</WexLabel>
              </div>
            </div>
          </div>
        </ExampleCard>
      </Section>

      {/* ============================================================
          WITH DESCRIPTION
          ============================================================ */}
      <Section title="With Description" description="Checkbox with additional helper text.">
        <ExampleCard>
          <div className="items-top flex space-x-2">
            <WexCheckbox id="newsletter" />
            <div className="grid gap-1.5 leading-none">
              <WexLabel htmlFor="newsletter">Subscribe to newsletter</WexLabel>
              <p className="text-sm text-muted-foreground">
                Get updates about new features and product announcements.
              </p>
            </div>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Label Association</h3>
            <p className="text-sm text-muted-foreground">
              Always associate checkboxes with labels using matching id and htmlFor attributes.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Move focus to/from checkbox</li>
              <li>Space: Toggle checkbox state</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCheckbox } from "@/components/wex";

// With label
<div className="flex items-center space-x-2">
  <WexCheckbox id="option" />
  <Label htmlFor="option">Option label</Label>
</div>

// Controlled
const [checked, setChecked] = useState(false);
<WexCheckbox 
  checked={checked} 
  onCheckedChange={setChecked} 
/>

// Indeterminate (for "select all" patterns)
const [items, setItems] = useState([true, false, true]);
const allChecked = items.every(Boolean);
const noneChecked = items.every((v) => !v);
const parentState = allChecked ? true : noneChecked ? false : "indeterminate";

<WexCheckbox 
  checked={parentState}
  onCheckedChange={(checked) => {
    // Toggle all items when parent is clicked
    setItems([checked === true, checked === true, checked === true]);
  }} 
/>`}
        />
      </Section>

      <Section title="API Reference">
        <PropsTable props={checkboxProps} />
      </Section>

      <TokenReference tokens={checkboxTokens} className="mt-12" />
    </ComponentPage>
  );
}

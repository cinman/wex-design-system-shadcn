import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexButton } from "@/components/wex";
import { Loader2, Mail, Plus, Trash2, Settings, Download } from "lucide-react";

// Token mappings for WexButton variants - using Layer 3 component tokens
const buttonTokens: TokenRow[] = [
  // Primary (Layer 3)
  { element: "Primary", property: "Background", token: "--wex-component-button-primary-bg" },
  { element: "Primary", property: "Text", token: "--wex-component-button-primary-fg" },
  { element: "Primary", property: "Hover", token: "--wex-component-button-primary-hover-bg" },
  { element: "Primary", property: "Active", token: "--wex-component-button-primary-active-bg" },
  { element: "Primary", property: "Focus Ring", token: "--wex-component-button-primary-focus-ring" },
  { element: "Primary", property: "Disabled BG", token: "--wex-component-button-primary-disabled-bg" },
  // Secondary (Layer 3)
  { element: "Secondary", property: "Background", token: "--wex-component-button-secondary-bg" },
  { element: "Secondary", property: "Text", token: "--wex-component-button-secondary-fg" },
  { element: "Secondary", property: "Border", token: "--wex-component-button-secondary-border" },
  { element: "Secondary", property: "Hover", token: "--wex-component-button-secondary-hover-bg" },
  // Destructive (Layer 3)
  { element: "Destructive", property: "Background", token: "--wex-component-button-destructive-bg" },
  { element: "Destructive", property: "Text", token: "--wex-component-button-destructive-fg" },
  { element: "Destructive", property: "Hover", token: "--wex-component-button-destructive-hover-bg" },
  { element: "Destructive", property: "Active", token: "--wex-component-button-destructive-active-bg" },
  // Tertiary (Layer 3 - tokens only, no CVA variant yet)
  { element: "Tertiary", property: "Text", token: "--wex-component-button-tertiary-fg" },
  { element: "Tertiary", property: "Hover BG", token: "--wex-component-button-tertiary-hover-bg" },
  { element: "Tertiary", property: "Active BG", token: "--wex-component-button-tertiary-active-bg" },
  // Ghost/Outline (still using Layer 2 shadcn bridge)
  { element: "Ghost", property: "Hover Background", token: "--accent" },
  { element: "Outline", property: "Border", token: "--input" },
  // Shared
  { element: "All Variants", property: "Disabled Opacity", token: "--wex-component-button-disabled-opacity" },
  { element: "Focus Ring", property: "Width", token: "--wex-focus-ring-width" },
  { element: "Focus Ring", property: "Offset", token: "--wex-focus-ring-offset" },
];

export default function ButtonPage() {
  return (
    <ComponentPage
      title="Button"
      description="Primary interactive element for triggering actions and submitting forms."
      status="stable"
      registryKey="button"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexButton>Primary Button</WexButton>
        </ExampleCard>
        <Guidance>
          WexButton is the foundational action element. It's hardened with 
          WCAG 2.5.5 compliant touch targets (44px minimum) and consistent 
          focus ring styling using WEX tokens.
        </Guidance>
      </Section>

      <Section title="All Variants at a Glance" description="Complete overview of all button intents across all states.">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Intent</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Default</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Hover</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Disabled</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">With Icon</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Primary</td>
                <td className="py-4 px-4"><WexButton intent="primary">Primary</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="primary" className="bg-primary-hover">Hover</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="primary" disabled>Disabled</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="primary"><Plus className="h-4 w-4" />Add</WexButton></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Secondary</td>
                <td className="py-4 px-4"><WexButton intent="secondary">Secondary</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="secondary" className="bg-secondary-hover">Hover</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="secondary" disabled>Disabled</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="secondary"><Mail className="h-4 w-4" />Email</WexButton></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Destructive</td>
                <td className="py-4 px-4"><WexButton intent="destructive">Destructive</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="destructive" className="bg-destructive-hover">Hover</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="destructive" disabled>Disabled</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="destructive"><Trash2 className="h-4 w-4" />Delete</WexButton></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Ghost</td>
                <td className="py-4 px-4"><WexButton intent="ghost">Ghost</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="ghost" className="bg-accent text-accent-foreground">Hover</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="ghost" disabled>Disabled</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="ghost"><Settings className="h-4 w-4" />Settings</WexButton></td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-4 px-4 font-medium">Outline</td>
                <td className="py-4 px-4"><WexButton intent="outline">Outline</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="outline" className="bg-accent text-accent-foreground">Hover</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="outline" disabled>Disabled</WexButton></td>
                <td className="py-4 px-4"><WexButton intent="outline"><Download className="h-4 w-4" />Export</WexButton></td>
              </tr>
            </tbody>
          </table>
        </div>
        <Guidance>
          This table shows all 5 supported button intents with their default, hover, disabled, and icon states.
          Each variant uses dedicated component slot tokens from Layer 3 for granular theming control.
        </Guidance>
      </Section>

      <Section title="Variants (Intent)" description="Button intents communicate action importance and type.">
        <div className="space-y-4">
          <ExampleCard title="Primary" description="Use for the main action on a page.">
            <WexButton intent="primary">Primary Action</WexButton>
          </ExampleCard>
          <Guidance>
            Use Primary for the single most important action, such as "Save", "Submit", or "Continue".
            There should typically be only one primary button per section.
          </Guidance>

          <ExampleCard title="Secondary" description="Use for secondary actions.">
            <WexButton intent="secondary">Secondary Action</WexButton>
          </ExampleCard>
          <Guidance>
            Secondary buttons are for actions that are important but not the primary path.
          </Guidance>

          <ExampleCard title="Ghost" description="Use for tertiary or subtle actions.">
            <WexButton intent="ghost">Ghost Action</WexButton>
          </ExampleCard>
          <Guidance>
            Ghost buttons are for low-emphasis actions that shouldn't distract from primary content.
          </Guidance>

          <ExampleCard title="Destructive" description="Use for dangerous or irreversible actions.">
            <WexButton intent="destructive">Delete</WexButton>
          </ExampleCard>
          <Guidance>
            Reserve destructive buttons for actions like delete, remove, or cancel that have significant consequences.
          </Guidance>

          <ExampleCard title="Outline" description="Use for bordered, neutral actions.">
            <WexButton intent="outline">Outline Action</WexButton>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizes" description="Three sizes for different contexts.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexButton intent="primary" size="sm">Small</WexButton>
            <WexButton intent="primary" size="md">Medium</WexButton>
            <WexButton intent="primary" size="lg">Large</WexButton>
          </div>
        </ExampleCard>
        <div className="mt-4 text-sm text-muted-foreground">
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Small (sm)</strong>: Compact contexts like table rows or dense UIs (h-9)</li>
            <li><strong>Medium (md)</strong>: Default size for most use cases (h-11)</li>
            <li><strong>Large (lg)</strong>: Hero sections or when extra emphasis is needed (h-12)</li>
          </ul>
        </div>

        <ExampleCard title="Icon Size" description="Square button for icon-only actions.">
          <WexButton intent="outline" size="icon" aria-label="Add item">
            <Plus className="h-4 w-4" />
          </WexButton>
        </ExampleCard>
        <Guidance>
          Icon-only buttons MUST have an aria-label for accessibility.
        </Guidance>
      </Section>

      <Section title="States" description="Interactive and display states.">
        <div className="space-y-4">
          <ExampleCard title="Disabled" description="Prevents interaction when action is unavailable.">
            <WexButton disabled>Disabled</WexButton>
          </ExampleCard>

          <ExampleCard title="Loading" description="Indicates ongoing operation.">
            <WexButton disabled>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Loading...
            </WexButton>
          </ExampleCard>

          <ExampleCard title="With Icon" description="Icon paired with text.">
            <WexButton>
              <Mail className="h-4 w-4 mr-2" />
              Send Email
            </WexButton>
          </ExampleCard>

          <ExampleCard title="Full Width" description="Button spanning container width.">
            <WexButton className="w-full">Full Width Button</WexButton>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Touch Target</h3>
            <p className="text-sm text-muted-foreground">
              WexButton enforces a minimum 44px touch target (WCAG 2.5.5) via 
              min-h-target and min-w-target utilities mapped to WEX tokens.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Focus Ring</h3>
            <p className="text-sm text-muted-foreground">
              Focus ring uses --wex-focus-ring-width and --wex-focus-ring-offset 
              tokens for consistent, visible keyboard focus across all buttons.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Icon-Only Buttons</h3>
            <p className="text-sm text-muted-foreground">
              Icon-only buttons (size="icon") must include aria-label to provide 
              an accessible name for screen readers.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexButton } from "@/components/wex";
import { Mail, Plus, Loader2 } from "lucide-react";

// Basic usage
<WexButton>Click Me</WexButton>

// Different intents
<WexButton intent="primary">Primary</WexButton>
<WexButton intent="secondary">Secondary</WexButton>
<WexButton intent="ghost">Ghost</WexButton>
<WexButton intent="destructive">Delete</WexButton>
<WexButton intent="outline">Outline</WexButton>

// Sizes
<WexButton size="sm">Small</WexButton>
<WexButton size="md">Medium</WexButton>
<WexButton size="lg">Large</WexButton>

// Icon button (MUST have aria-label)
<WexButton size="icon" aria-label="Add item">
  <Plus className="h-4 w-4" />
</WexButton>

// With icon and text
<WexButton>
  <Mail className="h-4 w-4 mr-2" />
  Send Email
</WexButton>

// Loading state
<WexButton disabled>
  <Loader2 className="h-4 w-4 animate-spin mr-2" />
  Loading...
</WexButton>

// As child (for links styled as buttons)
<WexButton asChild>
  <a href="/docs">Go to Docs</a>
</WexButton>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li><code className="bg-muted px-1 rounded">intent</code>: "primary" | "secondary" | "ghost" | "destructive" | "outline"</li>
            <li><code className="bg-muted px-1 rounded">size</code>: "sm" | "md" | "lg" | "icon"</li>
            <li><code className="bg-muted px-1 rounded">asChild</code>: Render as child element (for polymorphic usage)</li>
            <li><code className="bg-muted px-1 rounded">disabled</code>: Disable the button</li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={buttonTokens} className="mt-12" />
    </ComponentPage>
  );
}

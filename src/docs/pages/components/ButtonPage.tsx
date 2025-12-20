import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexButton } from "@/components/wex";
import { Loader2, Mail, Plus } from "lucide-react";

// Token mappings for WexButton variants
const buttonTokens: TokenRow[] = [
  // Primary
  { element: "Primary", property: "Background", token: "--primary" },
  { element: "Primary", property: "Text", token: "--primary-foreground" },
  { element: "Primary", property: "Hover", token: "--primary-hover" },
  // Secondary
  { element: "Secondary", property: "Background", token: "--secondary" },
  { element: "Secondary", property: "Text", token: "--secondary-foreground" },
  { element: "Secondary", property: "Hover", token: "--secondary-hover" },
  // Ghost
  { element: "Ghost", property: "Background", token: "(transparent)" },
  { element: "Ghost", property: "Hover Background", token: "--accent" },
  { element: "Ghost", property: "Hover Text", token: "--accent-foreground" },
  // Destructive
  { element: "Destructive", property: "Background", token: "--destructive" },
  { element: "Destructive", property: "Text", token: "--destructive-foreground" },
  { element: "Destructive", property: "Hover", token: "--destructive-hover" },
  // Outline
  { element: "Outline", property: "Background", token: "--background" },
  { element: "Outline", property: "Border", token: "--input" },
  { element: "Outline", property: "Hover Background", token: "--accent" },
  // Focus Ring (all variants)
  { element: "Focus Ring", property: "Color", token: "--ring" },
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

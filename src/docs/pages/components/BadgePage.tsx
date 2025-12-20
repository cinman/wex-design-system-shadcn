import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexBadge } from "@/components/wex";

// Token mappings for WexBadge variants
const badgeTokens: TokenRow[] = [
  // Default (Primary)
  { element: "Default", property: "Background", token: "--primary" },
  { element: "Default", property: "Text", token: "--primary-foreground" },
  { element: "Default", property: "Hover", token: "--primary (80% opacity)" },
  // Secondary
  { element: "Secondary", property: "Background", token: "--secondary" },
  { element: "Secondary", property: "Text", token: "--secondary-foreground" },
  // Outline
  { element: "Outline", property: "Background", token: "(transparent)" },
  { element: "Outline", property: "Text", token: "--foreground" },
  { element: "Outline", property: "Border", token: "--border" },
  // Destructive
  { element: "Destructive", property: "Background", token: "--destructive" },
  { element: "Destructive", property: "Text", token: "--destructive-foreground" },
  // Success
  { element: "Success", property: "Background", token: "--success" },
  { element: "Success", property: "Text", token: "--success-foreground" },
  // Warning
  { element: "Warning", property: "Background", token: "--warning" },
  { element: "Warning", property: "Text", token: "--warning-foreground" },
  // Info
  { element: "Info", property: "Background", token: "--info" },
  { element: "Info", property: "Text", token: "--info-foreground" },
];

export default function BadgePage() {
  return (
    <ComponentPage
      title="Badge"
      description="Small status descriptor for highlighting labels, counts, or categories."
      status="stable"
      registryKey="badge"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex flex-wrap gap-2">
            <WexBadge>Default</WexBadge>
            <WexBadge intent="secondary">Secondary</WexBadge>
            <WexBadge intent="outline">Outline</WexBadge>
            <WexBadge intent="destructive">Destructive</WexBadge>
            <WexBadge intent="success">Success</WexBadge>
            <WexBadge intent="warning">Warning</WexBadge>
            <WexBadge intent="info">Info</WexBadge>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Variants (Intent)" description="WexBadge supports semantic intent variants.">
        <div className="space-y-4">
          <ExampleCard title="Default" description="Primary badge for important labels.">
            <WexBadge intent="default">Default</WexBadge>
          </ExampleCard>

          <ExampleCard title="Secondary" description="Subtle badge for secondary information.">
            <WexBadge intent="secondary">Secondary</WexBadge>
          </ExampleCard>

          <ExampleCard title="Outline" description="Bordered badge for minimal emphasis.">
            <WexBadge intent="outline">Outline</WexBadge>
          </ExampleCard>

          <ExampleCard title="Destructive" description="Use for errors or critical states.">
            <WexBadge intent="destructive">Destructive</WexBadge>
          </ExampleCard>

          <ExampleCard title="Success" description="Use for positive states or confirmations.">
            <WexBadge intent="success">Success</WexBadge>
          </ExampleCard>

          <ExampleCard title="Warning" description="Use for cautionary states that need attention.">
            <WexBadge intent="warning">Warning</WexBadge>
          </ExampleCard>

          <ExampleCard title="Info" description="Use for neutral informational labels.">
            <WexBadge intent="info">Info</WexBadge>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Sizes" description="WexBadge does not support size variants.">
        <div className="rounded-lg border border-border bg-card p-4">
          <p className="text-sm text-muted-foreground">
            Size variants are not supported. Badge uses consistent text-xs sizing.
            Use className for custom sizes if needed.
          </p>
        </div>
      </Section>

      <Section title="States" description="Badge display states.">
        <div className="space-y-4">
          <ExampleCard title="Interactive Badge" description="Badge with hover state.">
            <WexBadge className="cursor-pointer">Hoverable</WexBadge>
          </ExampleCard>

          <ExampleCard title="With Count" description="Badge showing a count.">
            <WexBadge intent="default">99+</WexBadge>
          </ExampleCard>

          <ExampleCard title="Grouped Badges" description="Multiple badges together.">
            <div className="flex gap-2">
              <WexBadge>React</WexBadge>
              <WexBadge intent="secondary">TypeScript</WexBadge>
              <WexBadge intent="outline">Tailwind</WexBadge>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Semantic Usage</h3>
          <p className="text-sm text-muted-foreground">
            Badges are typically decorative and don't require ARIA attributes.
            If a badge conveys important status, ensure the status is also 
            communicated in text for screen readers.
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexBadge } from "@/components/wex";

// Default badge
<WexBadge>Default</WexBadge>

// Secondary badge
<WexBadge intent="secondary">Secondary</WexBadge>

// Outline badge
<WexBadge intent="outline">Outline</WexBadge>

// Destructive badge
<WexBadge intent="destructive">Error</WexBadge>

// Success badge
<WexBadge intent="success">Success</WexBadge>

// Warning badge
<WexBadge intent="warning">Warning</WexBadge>

// Info badge
<WexBadge intent="info">Info</WexBadge>

// With custom styling
<WexBadge className="cursor-pointer">Click me</WexBadge>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <code className="bg-muted px-1 rounded">intent</code>: "default" | "secondary" | "outline" | "destructive" | "success" | "warning" | "info"
            </li>
            <li>
              <code className="bg-muted px-1 rounded">className</code>: Additional CSS classes
            </li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={badgeTokens} className="mt-12" />
    </ComponentPage>
  );
}

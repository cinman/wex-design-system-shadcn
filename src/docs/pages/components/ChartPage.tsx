import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { Guidance } from "@/docs/components/ProseBlock";
import { CodeBlock } from "@/docs/components/CodeBlock";

export default function ChartPage() {
  return (
    <ComponentPage
      title="Chart"
      description="Data visualization components built with Recharts."
      status="alpha"
      registryKey="chart"
    >
      <Section title="Overview">
        <div className="rounded-lg border border-border bg-card p-6 text-center">
          <p className="text-muted-foreground">
            Chart components are available but require additional configuration.
          </p>
        </div>
        <Guidance>
          Note: Chart colors (--chart-1 through --chart-5) are currently using
          placeholder values. Contact the design team to define official brand
          chart colors.
        </Guidance>
      </Section>

      <Section title="Token Requirements">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Chart Tokens</h3>
          <p className="text-sm text-muted-foreground mb-3">
            The following tokens are required for chart styling:
          </p>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>--chart-1: Primary chart color</li>
            <li>--chart-2: Secondary chart color</li>
            <li>--chart-3: Tertiary chart color</li>
            <li>--chart-4: Quaternary chart color</li>
            <li>--chart-5: Quinary chart color</li>
          </ul>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.1 Level AA Partial Compliance</h3>
            <p className="text-sm text-muted-foreground">
              Charts require additional accessibility work. Data visualizations 
              should include alternative text descriptions for screen reader users.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Color Contrast</h3>
            <p className="text-sm text-muted-foreground">
              Chart colors should maintain 3:1 contrast ratio against adjacent 
              colors (WCAG 1.4.11 Non-text Contrast).
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Best Practices</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Provide data tables as alternatives</li>
              <li>Use patterns in addition to colors</li>
              <li>Include clear legends</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexChart } from "@/components/wex";

// Charts require Recharts library
// See shadcn/ui documentation for full examples`}
        />
      </Section>
    </ComponentPage>
  );
}


import { Section } from "@/docs/components/Section";

/**
 * Spacing foundation page
 * Placeholder - spacing scale not yet tokenized
 */
export default function SpacingPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Spacing
        </h1>
        <p className="text-lg text-muted-foreground">
          Consistent spacing scale for layouts and components.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Spacing Scale"
          description="WEX uses Tailwind's default spacing scale. Custom spacing tokens may be added in future iterations."
        >
          <div className="space-y-3">
            <SpacingSample value="1" pixels="4px" />
            <SpacingSample value="2" pixels="8px" />
            <SpacingSample value="3" pixels="12px" />
            <SpacingSample value="4" pixels="16px" />
            <SpacingSample value="6" pixels="24px" />
            <SpacingSample value="8" pixels="32px" />
            <SpacingSample value="12" pixels="48px" />
            <SpacingSample value="16" pixels="64px" />
          </div>
        </Section>

        <Section
          title="Touch Targets"
          description="Interactive elements have minimum sizing requirements."
        >
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Minimum Target Size</h3>
            <p className="text-sm text-muted-foreground mb-3">
              All interactive elements must meet the 44×44 pixel minimum touch
              target as defined by WCAG 2.5.5. This is enforced via the{" "}
              <code className="bg-muted px-1 rounded">--wex-min-target</code>{" "}
              token.
            </p>
            <p className="text-sm text-muted-foreground">
              Use{" "}
              <code className="bg-muted px-1 rounded">min-h-target min-w-target</code>{" "}
              on interactive elements.
            </p>
          </div>
        </Section>

        <Section title="Coming Soon">
          <p className="text-muted-foreground">
            Custom WEX spacing tokens are planned for a future release. Currently,
            use Tailwind's default spacing utilities.
          </p>
        </Section>
      </div>
    </article>
  );
}

interface SpacingSampleProps {
  value: string;
  pixels: string;
}

function SpacingSample({ value, pixels }: SpacingSampleProps) {
  return (
    <div className="flex items-center gap-4">
      <code className="text-xs text-muted-foreground w-12">p-{value}</code>
      <div
        className="bg-primary h-4"
        style={{ width: `${parseInt(pixels)}px` }}
      />
      <span className="text-sm text-muted-foreground">{pixels}</span>
    </div>
  );
}


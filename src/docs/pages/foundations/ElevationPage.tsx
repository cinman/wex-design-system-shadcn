import { Section } from "@/docs/components/Section";

/**
 * Elevation foundation page
 * Placeholder - elevation tokens not yet defined
 */
export default function ElevationPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Elevation
        </h1>
        <p className="text-lg text-muted-foreground">
          Shadow and layering system for creating depth.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Shadow Scale"
          description="Tailwind's default shadow scale is used. Custom elevation tokens are planned."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ElevationSample shadow="shadow-sm" label="Small" />
            <ElevationSample shadow="shadow" label="Default" />
            <ElevationSample shadow="shadow-md" label="Medium" />
            <ElevationSample shadow="shadow-lg" label="Large" />
            <ElevationSample shadow="shadow-xl" label="Extra Large" />
            <ElevationSample shadow="shadow-2xl" label="2XL" />
          </div>
        </Section>

        <Section
          title="Z-Index Layering"
          description="Standard z-index values for common UI patterns."
        >
          <div className="space-y-2">
            <LayerSample zIndex="z-0" label="Base content" />
            <LayerSample zIndex="z-10" label="Dropdowns, tooltips" />
            <LayerSample zIndex="z-20" label="Sticky headers" />
            <LayerSample zIndex="z-30" label="Fixed navigation" />
            <LayerSample zIndex="z-40" label="Sidebars, drawers" />
            <LayerSample zIndex="z-50" label="Modals, dialogs" />
          </div>
        </Section>

        <Section title="Coming Soon">
          <p className="text-muted-foreground">
            Custom WEX elevation tokens are planned for a future release. This
            will include semantic shadow definitions that work consistently in
            light and dark modes.
          </p>
        </Section>
      </div>
    </article>
  );
}

interface ElevationSampleProps {
  shadow: string;
  label: string;
}

function ElevationSample({ shadow, label }: ElevationSampleProps) {
  return (
    <div className="text-center">
      <div
        className={`${shadow} rounded-lg bg-card border border-border h-24 flex items-center justify-center mb-2`}
      >
        <span className="text-muted-foreground text-sm">{label}</span>
      </div>
      <code className="text-xs text-muted-foreground">{shadow}</code>
    </div>
  );
}

interface LayerSampleProps {
  zIndex: string;
  label: string;
}

function LayerSample({ zIndex, label }: LayerSampleProps) {
  return (
    <div className="flex items-center gap-4 py-2 border-b border-border">
      <code className="text-sm text-muted-foreground w-16">{zIndex}</code>
      <span className="text-foreground">{label}</span>
    </div>
  );
}


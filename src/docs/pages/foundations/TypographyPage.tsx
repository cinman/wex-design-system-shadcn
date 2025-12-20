import { Section } from "@/docs/components/Section";

/**
 * Typography foundation page
 * Shows font families and type scale examples
 */
export default function TypographyPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Typography
        </h1>
        <p className="text-lg text-muted-foreground">
          Font families and typographic scale for the WEX design system.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Font Families"
          description="WEX uses two font families for different purposes."
        >
          <div className="space-y-6">
            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Display Font
              </p>
              <p className="font-display text-3xl text-foreground">
                Poppins — Display & Headings
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Used for headings, titles, and emphasized text. Apply with{" "}
                <code className="bg-muted px-1 rounded">font-display</code>
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-6">
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
                Sans Font
              </p>
              <p className="font-sans text-3xl text-foreground">
                Inter — Body & UI Text
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Used for body text, labels, and UI elements. Apply with{" "}
                <code className="bg-muted px-1 rounded">font-sans</code>
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Type Scale"
          description="Tailwind's default type scale with WEX font families."
        >
          <div className="space-y-4">
            <TypeSample size="text-xs" label="Extra Small (12px)" />
            <TypeSample size="text-sm" label="Small (14px)" />
            <TypeSample size="text-base" label="Base (16px)" />
            <TypeSample size="text-lg" label="Large (18px)" />
            <TypeSample size="text-xl" label="Extra Large (20px)" />
            <TypeSample size="text-2xl" label="2XL (24px)" />
            <TypeSample size="text-3xl" label="3XL (30px)" isDisplay />
            <TypeSample size="text-4xl" label="4XL (36px)" isDisplay />
          </div>
        </Section>

        <Section
          title="Font Weights"
          description="Available font weights for text styling."
        >
          <div className="space-y-3">
            <p className="font-normal text-foreground">
              Normal (400) — Default body text weight
            </p>
            <p className="font-medium text-foreground">
              Medium (500) — Labels and emphasis
            </p>
            <p className="font-semibold text-foreground">
              Semibold (600) — Subheadings and strong emphasis
            </p>
            <p className="font-bold text-foreground">
              Bold (700) — Headings and titles
            </p>
          </div>
        </Section>
      </div>
    </article>
  );
}

interface TypeSampleProps {
  size: string;
  label: string;
  isDisplay?: boolean;
}

function TypeSample({ size, label, isDisplay }: TypeSampleProps) {
  return (
    <div className="flex items-baseline gap-4 pb-3 border-b border-border">
      <code className="text-xs text-muted-foreground w-24 shrink-0">{size}</code>
      <p
        className={`${size} ${isDisplay ? "font-display" : "font-sans"} text-foreground`}
      >
        The quick brown fox jumps over the lazy dog
      </p>
      <span className="text-xs text-muted-foreground shrink-0">{label}</span>
    </div>
  );
}


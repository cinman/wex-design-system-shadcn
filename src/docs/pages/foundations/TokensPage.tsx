import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";

/**
 * Tokens foundation page
 * Explains the two-layer token architecture
 */
export default function TokensPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Design Tokens
        </h1>
        <p className="text-lg text-muted-foreground">
          The foundational values that define the WEX visual language.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Token Architecture"
          description="WEX uses a two-layer token system for maximum flexibility and maintainability."
        >
          <div className="space-y-4 text-foreground">
            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium mb-2">Layer 1: WEX Token Emission</h3>
              <p className="text-sm text-muted-foreground mb-3">
                The base layer contains all WEX design tokens as CSS variables
                with the <code className="bg-muted px-1 rounded">--wex-*</code>{" "}
                prefix. These tokens are exhaustive and include every design
                decision.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>File:</strong>{" "}
                <code className="bg-muted px-1 rounded">
                  src/styles/wex.tokens.css
                </code>
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h3 className="font-medium mb-2">
                Layer 2: shadcn Semantic Bridge
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                The bridge layer maps WEX tokens to shadcn-compatible semantic
                variables. This allows components to use familiar utilities like{" "}
                <code className="bg-muted px-1 rounded">bg-primary</code> while
                the actual values come from WEX tokens.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>File:</strong>{" "}
                <code className="bg-muted px-1 rounded">
                  src/styles/wex.shadcn-bridge.css
                </code>
              </p>
            </div>
          </div>
        </Section>

        <Section title="Token Flow" description="How tokens flow from definition to usage.">
          <div className="rounded-lg border border-border bg-muted/50 p-4 font-mono text-sm">
            <div className="space-y-2">
              <p>
                <span className="text-muted-foreground">1.</span> WEX Token:{" "}
                <code>--wex-primary: 208 100% 32%</code>
              </p>
              <p>
                <span className="text-muted-foreground">2.</span> Bridge:{" "}
                <code>--primary: var(--wex-primary)</code>
              </p>
              <p>
                <span className="text-muted-foreground">3.</span> Tailwind:{" "}
                <code>primary: "hsl(var(--primary))"</code>
              </p>
              <p>
                <span className="text-muted-foreground">4.</span> Component:{" "}
                <code>className="bg-primary"</code>
              </p>
            </div>
          </div>
        </Section>

        <Section
          title="Future: Style Dictionary"
          description="The token layer will eventually be generated."
        >
          <p className="text-muted-foreground mb-4">
            Currently, <code className="bg-muted px-1 rounded">wex.tokens.css</code> is
            hand-authored. In a future phase, this file will become a generated
            output from Style Dictionary, with the source of truth being JSON
            token files.
          </p>
          <p className="text-muted-foreground">
            The bridge file will remain hand-authored, as semantic mapping
            decisions require human intent.
          </p>
        </Section>

        <Section title="Token Example">
          <CodeBlock
            code={`:root {
  /* WEX Token (Layer 1) */
  --wex-primary: 208 100% 32%;
  --wex-primary-hover: 208 100% 26%;
  
  /* Bridge (Layer 2) */
  --primary: var(--wex-primary);
  --primary-hover: var(--wex-primary-hover);
}

.dark {
  --wex-primary: 203 68% 47%;
  --wex-primary-hover: 201 73% 41%;
}`}
          />
        </Section>
      </div>
    </article>
  );
}


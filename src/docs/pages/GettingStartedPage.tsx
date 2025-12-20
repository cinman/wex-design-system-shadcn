import { Section } from "@/docs/components/Section";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";

/**
 * Getting Started page
 * Installation and usage instructions
 */
export default function GettingStartedPage() {
  return (
    <article>
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Getting Started
        </h1>
        <p className="text-lg text-muted-foreground">
          Learn how to use WEX components in your project.
        </p>
      </header>

      <div className="space-y-12">
        <Section
          title="Prerequisites"
          description="The WEX design system requires the following dependencies."
        >
          <ul className="list-disc list-inside space-y-2 text-foreground">
            <li>React 18 or later</li>
            <li>Tailwind CSS 3.4 or later</li>
            <li>TypeScript (recommended)</li>
          </ul>
        </Section>

        <Section
          title="Installation"
          description="Components are currently part of this repository. Copy what you need."
        >
          <div className="space-y-4">
            <p className="text-muted-foreground">
              WEX components live in{" "}
              <code className="bg-muted px-1 rounded">src/components/ui/</code>.
              Token files are in{" "}
              <code className="bg-muted px-1 rounded">src/styles/</code>.
            </p>

            <CodeBlock
              code={`// Required CSS imports (add to your entry file)
import './styles/wex.tokens.css';
import './styles/wex.shadcn-bridge.css';

// Component import
import { WexButton } from '@/components/ui/wex-button';`}
            />
          </div>
        </Section>

        <Section
          title="Basic Usage"
          description="Import and use components in your React code."
        >
          <CodeBlock
            code={`import { WexButton } from '@/components/ui/wex-button';

function MyComponent() {
  return (
    <div>
      <WexButton intent="primary" onClick={() => alert('Clicked!')}>
        Click Me
      </WexButton>
    </div>
  );
}`}
          />
        </Section>

        <Section
          title="Dark Mode"
          description="Toggle dark mode by adding the .dark class to the html element."
        >
          <CodeBlock
            code={`// Toggle dark mode
document.documentElement.classList.toggle('dark');

// Or set explicitly
document.documentElement.classList.add('dark');
document.documentElement.classList.remove('dark');`}
          />
          <p className="text-muted-foreground mt-4">
            The theme toggle in this docs site persists your preference to
            localStorage.
          </p>
        </Section>

        <Section title="Component Rules">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WEX_COMPONENT_RULES.md</h3>
            <p className="text-sm text-muted-foreground mb-3">
              All component development must follow the rules defined in{" "}
              <code className="bg-muted px-1 rounded">
                WEX_COMPONENT_RULES.md
              </code>{" "}
              at the repository root. This includes:
            </p>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>No raw hex/rgb/hsl color values</li>
              <li>No arbitrary color value wrappers</li>
              <li>Minimum 44×44px touch targets on interactive elements</li>
              <li>Visible focus rings on all focusable elements</li>
              <li>CVA for all variant-based components</li>
            </ul>
          </div>
          <Guidance>
            Read WEX_COMPONENT_RULES.md before contributing. It is the binding
            contract for component development.
          </Guidance>
        </Section>

        <Section
          title="Tailwind Configuration"
          description="The Tailwind config extends colors with semantic tokens."
        >
          <CodeBlock
            code={`// tailwind.config.ts (excerpt)
theme: {
  extend: {
    colors: {
      background: "hsl(var(--background) / <alpha-value>)",
      foreground: "hsl(var(--foreground) / <alpha-value>)",
      primary: {
        DEFAULT: "hsl(var(--primary) / <alpha-value>)",
        foreground: "hsl(var(--primary-foreground) / <alpha-value>)",
        hover: "hsl(var(--primary-hover) / <alpha-value>)",
      },
      // ... more semantic colors
    },
  },
}`}
          />
        </Section>
      </div>
    </article>
  );
}


import { Link } from "react-router-dom";
import { WexButton } from "@/components/wex";

/**
 * Overview / landing page for docs site
 */
export default function OverviewPage() {
  return (
    <article>
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-display font-bold text-foreground mb-4">
          WEX Design System
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A comprehensive component library and design foundation for building
          consistent, accessible, and beautiful WEX applications.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <FeatureCard
          title="Token-Based Theming"
          description="Built on a two-layer token system with CSS variables. Supports light and dark modes out of the box."
          linkTo="/foundations/tokens"
          linkText="Explore Tokens"
        />
        <FeatureCard
          title="Accessible Components"
          description="All components meet WCAG guidelines with proper focus management, keyboard navigation, and touch targets."
          linkTo="/components/button"
          linkText="View Components"
        />
        <FeatureCard
          title="shadcn/ui Compatible"
          description="Uses shadcn patterns and Radix primitives. Familiar API for developers who know the ecosystem."
          linkTo="/getting-started"
          linkText="Get Started"
        />
        <FeatureCard
          title="Tailwind CSS"
          description="Semantic utility classes powered by CSS variables. No raw colors, just design tokens."
          linkTo="/foundations/colors"
          linkText="View Colors"
        />
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-display font-semibold text-foreground mb-4">
          Ready to build?
        </h2>
        <div className="flex justify-center gap-4">
          <WexButton intent="primary" asChild>
            <Link to="/getting-started">Get Started</Link>
          </WexButton>
          <WexButton intent="outline" asChild>
            <Link to="/components/button">Browse Components</Link>
          </WexButton>
        </div>
      </div>
    </article>
  );
}

interface FeatureCardProps {
  title: string;
  description: string;
  linkTo: string;
  linkText: string;
}

function FeatureCard({ title, description, linkTo, linkText }: FeatureCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground mb-4">{description}</p>
      <Link
        to={linkTo}
        className="text-sm font-medium text-primary hover:underline"
      >
        {linkText} →
      </Link>
    </div>
  );
}


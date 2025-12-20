import * as React from "react";

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Section wrapper with heading and optional description
 * Uses semantic h2 for section headings
 */
export function Section({ title, description, children }: SectionProps) {
  return (
    <section>
      <h2 className="text-xl font-display font-semibold text-foreground mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground mb-4">{description}</p>
      )}
      <div>{children}</div>
    </section>
  );
}


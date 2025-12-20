import * as React from "react";

interface ExampleCardProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * Container for interactive component examples
 * Shows component in a bordered preview area
 */
export function ExampleCard({ title, description, children }: ExampleCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {(title || description) && (
        <div className="px-4 py-3 border-b border-border bg-muted/50">
          {title && (
            <h3 className="text-sm font-medium text-foreground">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="p-6 flex flex-wrap items-center gap-4">{children}</div>
    </div>
  );
}


interface CodeBlockProps {
  code: string;
  language?: string;
}

/**
 * Static code snippet display
 * Uses muted background and monospace font
 * Future: add syntax highlighting via Shiki or Prism
 */
export function CodeBlock({ code }: CodeBlockProps) {
  return (
    <pre className="rounded-lg bg-muted p-4 overflow-x-auto">
      <code className="text-sm font-mono text-foreground">{code}</code>
    </pre>
  );
}


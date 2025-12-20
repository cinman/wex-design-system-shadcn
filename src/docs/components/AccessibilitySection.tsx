import { Section } from "./Section";

interface AccessibilityNote {
  title: string;
  /** Description text (required if items not provided) */
  description?: string;
  /** List items (if provided, description is ignored) */
  items?: string[];
}

interface AccessibilitySectionProps {
  compliance?: "2.2" | "2.1";
  level?: "AA" | "AAA";
  notes: AccessibilityNote[];
}

/**
 * Standardized accessibility section for component documentation
 * Displays WCAG compliance level and accessibility notes
 */
export function AccessibilitySection({
  compliance = "2.2",
  level = "AA",
  notes,
}: AccessibilitySectionProps) {
  return (
    <Section title="Accessibility">
      <div className="space-y-4 text-foreground">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">WCAG {compliance} Level {level} Compliant</h3>
          <p className="text-sm text-muted-foreground">
            This component meets WCAG {compliance} Level {level} accessibility requirements.
          </p>
        </div>
        {notes.map((note, index) => (
          <div key={index} className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">{note.title}</h3>
            {note.items ? (
              <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
                {note.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">{note.description}</p>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}


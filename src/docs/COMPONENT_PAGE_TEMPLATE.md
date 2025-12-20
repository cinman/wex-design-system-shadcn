# Component Page Template

This document defines the standard structure for component documentation pages.
All component pages MUST follow this section order for consistency.

---

## Required Section Order

1. **Overview** - Brief description and basic example
2. **Variants (Intent)** - Different visual/behavioral variants with guidance
3. **Sizes** - Available size options (if applicable)
4. **States** - Interactive states (hover, focus, disabled, loading, etc.)
5. **Accessibility** - WCAG compliance notes and keyboard navigation
6. **Usage** - Code examples and import statements

---

## Page Component Structure

```tsx
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { AccessibilitySection } from "@/docs/components/AccessibilitySection";
// Import WEX components from @/components/wex
import { WexComponentName } from "@/components/wex";

export default function ComponentNamePage() {
  return (
    <ComponentPage
      title="Component Name"
      description="Brief description of what the component does."
      status="stable" // alpha | beta | stable
      registryKey="component-name" // lowercase, kebab-case key matching registry
    >
      {/* Section 1: Overview */}
      <Section title="Overview">
        <ExampleCard>
          {/* Basic component example */}
        </ExampleCard>
        <Guidance>
          Brief guidance on when and how to use this component.
        </Guidance>
      </Section>

      {/* Section 2: Variants */}
      <Section title="Variants" description="Different styles for various contexts.">
        <div className="space-y-4">
          <ExampleCard title="Primary" description="Use for main actions.">
            {/* Example */}
          </ExampleCard>
          <Guidance>
            Explain when to use this variant.
          </Guidance>
          {/* Repeat for each variant */}
        </div>
      </Section>

      {/* Section 3: Sizes (if applicable) */}
      <Section title="Sizes" description="Available size options.">
        <ExampleCard>
          <div className="flex items-center gap-4">
            {/* Size examples */}
          </div>
        </ExampleCard>
      </Section>

      {/* Section 4: States */}
      <Section title="States" description="Interactive states.">
        <div className="space-y-4">
          <ExampleCard title="Disabled">
            {/* Disabled example */}
          </ExampleCard>
          {/* More states: hover, focus, loading, etc. */}
        </div>
      </Section>

      {/* Section 5: Accessibility */}
      <AccessibilitySection
        compliance="2.2"
        level="AA"
        notes={[
          {
            title: "Keyboard Navigation",
            items: [
              "Tab: Focus the element",
              "Enter/Space: Activate",
            ],
          },
          {
            title: "ARIA Attributes",
            description: "Description of ARIA usage",
          },
        ]}
      />

      {/* Section 6: Usage */}
      <Section title="Usage">
        <CodeBlock
          code={`import { WexComponentName } from "@/components/wex";

// Basic usage
<WexComponentName>Content</WexComponentName>

// With props
<WexComponentName variant="primary" size="md">
  Content
</WexComponentName>`}
        />
      </Section>
    </ComponentPage>
  );
}
```

---

## Status Definitions

| Status | Definition |
|--------|------------|
| **stable** | Production-ready, fully documented, API frozen |
| **beta** | Mostly complete, API may change slightly |
| **alpha** | Experimental, API will change, minimal docs |

---

## A11y Signal System

Accessibility badges are now **data-driven** and generated from automated axe-core testing.

| Badge | Meaning |
|-------|---------|
| **A11y: Pass (AA)** | Zero violations in automated tests |
| **A11y: Partial (A)** | 1-3 non-critical violations |
| **A11y: Fail** | Critical violations or 4+ total violations |
| **A11y: Pending** | Tests not yet run |

**Note:** These are test SIGNALS, not compliance certifications. Run `npm run test:a11y` to update results.

---

## Guidance Text Best Practices

1. **Be instructional** - Explain WHEN to use, not just WHAT it is
2. **Be specific** - "Use for the main action" vs "Use for actions"
3. **Include don'ts** - Mention common misuse patterns
4. **Keep it brief** - 1-3 sentences per guidance block

---

## Example: Good Guidance

```tsx
<Guidance>
  Use Primary buttons for the single most important action on a page,
  such as "Save", "Submit", or "Continue". There should typically be
  only one primary button per section.
</Guidance>
```

---

## Checklist for New Pages

- [ ] All 6 sections present (or noted as N/A if truly not applicable)
- [ ] ComponentPage wrapper includes title, description, status, registryKey
- [ ] registryKey matches the kebab-case key in component registry
- [ ] All examples use WEX components from @/components/wex
- [ ] No raw color values (use semantic tokens only)
- [ ] Guidance text explains usage context
- [ ] Code examples are complete and copy-pasteable
- [ ] Accessibility section includes keyboard navigation
- [ ] Run `npm run test:a11y` after adding new examples


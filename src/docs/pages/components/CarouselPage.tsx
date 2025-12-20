import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexCarousel, WexCard } from "@/components/wex";

// Token mappings for WexCarousel
const carouselTokens: TokenRow[] = [
  { element: "Navigation Button", property: "Border", token: "--input" },
  { element: "Navigation Button", property: "Background", token: "--background" },
  { element: "Navigation Button (hover)", property: "Background", token: "--accent" },
];

export default function CarouselPage() {
  return (
    <ComponentPage
      title="Carousel"
      description="A carousel with motion and swipe gestures."
      status="stable"
      registryKey="carousel"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexCarousel className="w-full max-w-xs">
            <WexCarousel.Content>
              {Array.from({ length: 5 }).map((_, index) => (
                <WexCarousel.Item key={index}>
                  <WexCard>
                    <WexCard.Content className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </WexCard.Content>
                  </WexCard>
                </WexCarousel.Item>
              ))}
            </WexCarousel.Content>
            <WexCarousel.Previous />
            <WexCarousel.Next />
          </WexCarousel>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Keyboard Navigation</h3>
          <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
            <li>Arrow Left/Right: Navigate between slides</li>
            <li>Tab: Move focus to carousel controls</li>
          </ul>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexCarousel, WexCard } from "@/components/wex";

<WexCarousel>
  <WexCarousel.Content>
    <WexCarousel.Item>Slide 1</WexCarousel.Item>
    <WexCarousel.Item>Slide 2</WexCarousel.Item>
    <WexCarousel.Item>Slide 3</WexCarousel.Item>
  </WexCarousel.Content>
  <WexCarousel.Previous />
  <WexCarousel.Next />
</WexCarousel>`}
        />
      </Section>

      <TokenReference tokens={carouselTokens} className="mt-12" />
    </ComponentPage>
  );
}


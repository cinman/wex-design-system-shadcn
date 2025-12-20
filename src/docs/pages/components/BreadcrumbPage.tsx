import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexBreadcrumb } from "@/components/wex";

export default function BreadcrumbDocPage() {
  return (
    <ComponentPage
      title="Breadcrumb"
      description="Displays the path to the current resource using a hierarchy of links."
      status="stable"
      registryKey="breadcrumb"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexBreadcrumb>
            <WexBreadcrumb.List>
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/components">Components</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Page>Breadcrumb</WexBreadcrumb.Page>
              </WexBreadcrumb.Item>
            </WexBreadcrumb.List>
          </WexBreadcrumb>
        </ExampleCard>
      </Section>

      <Section title="With Ellipsis">
        <ExampleCard>
          <WexBreadcrumb>
            <WexBreadcrumb.List>
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Ellipsis />
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Link href="/components">Components</WexBreadcrumb.Link>
              </WexBreadcrumb.Item>
              <WexBreadcrumb.Separator />
              <WexBreadcrumb.Item>
                <WexBreadcrumb.Page>Breadcrumb</WexBreadcrumb.Page>
              </WexBreadcrumb.Item>
            </WexBreadcrumb.List>
          </WexBreadcrumb>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="rounded-lg border border-border bg-card p-4">
          <h3 className="font-medium mb-2">Navigation Landmark</h3>
          <p className="text-sm text-muted-foreground">
            Breadcrumb uses a nav element with aria-label for screen readers.
            The current page is marked with aria-current="page".
          </p>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexBreadcrumb } from "@/components/wex";

<WexBreadcrumb>
  <WexBreadcrumb.List>
    <WexBreadcrumb.Item>
      <WexBreadcrumb.Link href="/">Home</WexBreadcrumb.Link>
    </WexBreadcrumb.Item>
    <WexBreadcrumb.Separator />
    <WexBreadcrumb.Item>
      <WexBreadcrumb.Page>Current Page</WexBreadcrumb.Page>
    </WexBreadcrumb.Item>
  </WexBreadcrumb.List>
</WexBreadcrumb>`}
        />
      </Section>
    </ComponentPage>
  );
}

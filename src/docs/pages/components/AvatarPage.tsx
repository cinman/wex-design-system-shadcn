import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexAvatar } from "@/components/wex";

export default function AvatarPage() {
  return (
    <ComponentPage
      title="Avatar"
      description="Image element with fallback for representing a user."
      status="stable"
      registryKey="avatar"
    >
      <Section title="Overview">
        <ExampleCard>
          <div className="flex items-center gap-4">
            <WexAvatar>
              <WexAvatar.Image src="https://github.com/shadcn.png" alt="User avatar" />
              <WexAvatar.Fallback>CN</WexAvatar.Fallback>
            </WexAvatar>
            <WexAvatar>
              <WexAvatar.Fallback>JD</WexAvatar.Fallback>
            </WexAvatar>
          </div>
        </ExampleCard>
      </Section>

      <Section title="Variants" description="Different avatar configurations.">
        <div className="space-y-4">
          <ExampleCard title="With Image" description="Avatar with an image source.">
            <WexAvatar>
              <WexAvatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
              <WexAvatar.Fallback>CN</WexAvatar.Fallback>
            </WexAvatar>
          </ExampleCard>

          <ExampleCard title="Fallback Only" description="Initials when no image is available.">
            <div className="flex items-center gap-4">
              <WexAvatar>
                <WexAvatar.Fallback>JD</WexAvatar.Fallback>
              </WexAvatar>
              <WexAvatar>
                <WexAvatar.Fallback>WX</WexAvatar.Fallback>
              </WexAvatar>
              <WexAvatar>
                <WexAvatar.Fallback>AB</WexAvatar.Fallback>
              </WexAvatar>
            </div>
          </ExampleCard>

          <ExampleCard title="Sizes" description="Different sizes via className.">
            <div className="flex items-center gap-4">
              <WexAvatar className="h-8 w-8">
                <WexAvatar.Fallback className="text-xs">SM</WexAvatar.Fallback>
              </WexAvatar>
              <WexAvatar>
                <WexAvatar.Fallback>MD</WexAvatar.Fallback>
              </WexAvatar>
              <WexAvatar className="h-14 w-14">
                <WexAvatar.Fallback className="text-lg">LG</WexAvatar.Fallback>
              </WexAvatar>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Requirements</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">alt</code>: Required on WexAvatar.Image for screen readers</li>
              <li>Fallback text provides meaningful identification when image fails to load</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Color Contrast</h3>
            <p className="text-sm text-muted-foreground">
              Fallback text meets 4.5:1 contrast ratio requirement against the muted background.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexAvatar } from "@/components/wex";

// With image
<WexAvatar>
  <WexAvatar.Image src="/avatar.png" alt="User" />
  <WexAvatar.Fallback>JD</WexAvatar.Fallback>
</WexAvatar>

// Fallback only
<WexAvatar>
  <WexAvatar.Fallback>JD</WexAvatar.Fallback>
</WexAvatar>

// Custom size
<WexAvatar className="h-14 w-14">
  <WexAvatar.Fallback className="text-lg">LG</WexAvatar.Fallback>
</WexAvatar>`}
        />
      </Section>
    </ComponentPage>
  );
}

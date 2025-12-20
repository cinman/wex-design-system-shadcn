import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { WexMenubar } from "@/components/wex";

export default function MenubarPage() {
  return (
    <ComponentPage
      title="Menubar"
      description="A visually persistent menu common in desktop applications."
      status="stable"
      registryKey="menubar"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexMenubar>
            <WexMenubar.Menu>
              <WexMenubar.Trigger>File</WexMenubar.Trigger>
              <WexMenubar.Content>
                <WexMenubar.Item>New Tab</WexMenubar.Item>
                <WexMenubar.Item>New Window</WexMenubar.Item>
                <WexMenubar.Separator />
                <WexMenubar.Item>Exit</WexMenubar.Item>
              </WexMenubar.Content>
            </WexMenubar.Menu>
            <WexMenubar.Menu>
              <WexMenubar.Trigger>Edit</WexMenubar.Trigger>
              <WexMenubar.Content>
                <WexMenubar.Item>Undo</WexMenubar.Item>
                <WexMenubar.Item>Redo</WexMenubar.Item>
              </WexMenubar.Content>
            </WexMenubar.Menu>
          </WexMenubar>
        </ExampleCard>
      </Section>

      <Section title="With Keyboard Shortcuts">
        <ExampleCard>
          <WexMenubar>
            <WexMenubar.Menu>
              <WexMenubar.Trigger>File</WexMenubar.Trigger>
              <WexMenubar.Content>
                <WexMenubar.Item>
                  New Tab <WexMenubar.Shortcut>⌘T</WexMenubar.Shortcut>
                </WexMenubar.Item>
                <WexMenubar.Item>
                  New Window <WexMenubar.Shortcut>⌘N</WexMenubar.Shortcut>
                </WexMenubar.Item>
                <WexMenubar.Separator />
                <WexMenubar.Item>
                  Save <WexMenubar.Shortcut>⌘S</WexMenubar.Shortcut>
                </WexMenubar.Item>
              </WexMenubar.Content>
            </WexMenubar.Menu>
            <WexMenubar.Menu>
              <WexMenubar.Trigger>Edit</WexMenubar.Trigger>
              <WexMenubar.Content>
                <WexMenubar.Item>
                  Undo <WexMenubar.Shortcut>⌘Z</WexMenubar.Shortcut>
                </WexMenubar.Item>
                <WexMenubar.Item>
                  Redo <WexMenubar.Shortcut>⌘⇧Z</WexMenubar.Shortcut>
                </WexMenubar.Item>
              </WexMenubar.Content>
            </WexMenubar.Menu>
          </WexMenubar>
        </ExampleCard>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4 text-foreground">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">WCAG 2.2 Level AA Compliant</h3>
            <p className="text-sm text-muted-foreground">
              This component meets WCAG 2.2 Level AA accessibility requirements 
              with full keyboard navigation support.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Tab: Focus menubar</li>
              <li>Arrow Left/Right: Navigate between menus</li>
              <li>Arrow Up/Down: Navigate menu items</li>
              <li>Enter or Space: Activate item</li>
              <li>Escape: Close menu</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Roles</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li><code className="bg-muted px-1 rounded">role="menubar"</code>: On container</li>
              <li><code className="bg-muted px-1 rounded">role="menu"</code>: On dropdown content</li>
              <li><code className="bg-muted px-1 rounded">role="menuitem"</code>: On items</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexMenubar } from "@/components/wex";

<WexMenubar>
  <WexMenubar.Menu>
    <WexMenubar.Trigger>File</WexMenubar.Trigger>
    <WexMenubar.Content>
      <WexMenubar.Item>New</WexMenubar.Item>
      <WexMenubar.Item>Open</WexMenubar.Item>
      <WexMenubar.Separator />
      <WexMenubar.Item>Save</WexMenubar.Item>
    </WexMenubar.Content>
  </WexMenubar.Menu>
</WexMenubar>`}
        />
      </Section>
    </ComponentPage>
  );
}

import * as React from "react";
import { ComponentPage } from "@/docs/components/ComponentPage";
import { Section } from "@/docs/components/Section";
import { ExampleCard } from "@/docs/components/ExampleCard";
import { CodeBlock } from "@/docs/components/CodeBlock";
import { Guidance } from "@/docs/components/ProseBlock";
import { TokenReference, type TokenRow } from "@/docs/components/TokenReference";
import { WexTabs, WexCard, WexButton, WexInput, WexLabel } from "@/components/wex";

// Token mappings for WexTabs
const tabsTokens: TokenRow[] = [
  // Default variant tokens
  { element: "Tab List (default)", property: "Background", token: "--muted" },
  { element: "Trigger (default)", property: "Text", token: "--muted-foreground" },
  { element: "Trigger (default, active)", property: "Background", token: "--background" },
  { element: "Trigger (default, active)", property: "Text", token: "--foreground" },
  // Underline variant tokens
  { element: "Tab List (underline)", property: "Border", token: "--border" },
  { element: "Trigger (underline)", property: "Text", token: "--muted-foreground" },
  { element: "Trigger (underline, active)", property: "Border", token: "--primary" },
  { element: "Trigger (underline, active)", property: "Text", token: "--foreground" },
  { element: "Trigger (underline, hover)", property: "Background", token: "--accent (50% opacity)" },
  // Shared
  { element: "Focus Ring", property: "Color", token: "--ring" },
];

export default function TabsPage() {
  const [activeTab, setActiveTab] = React.useState("account");
  const [underlineTab, setUnderlineTab] = React.useState("header1");

  return (
    <ComponentPage
      title="Tabs"
      description="Tabbed content panels for organizing related content."
      status="stable"
      registryKey="tabs"
    >
      <Section title="Overview">
        <ExampleCard>
          <WexTabs defaultValue="account" className="w-full max-w-md">
            <WexTabs.List>
              <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
              <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
            </WexTabs.List>
            <WexTabs.Content value="account" className="p-4">
              <p className="text-sm text-muted-foreground">Account settings content.</p>
            </WexTabs.Content>
            <WexTabs.Content value="password" className="p-4">
              <p className="text-sm text-muted-foreground">Password settings content.</p>
            </WexTabs.Content>
          </WexTabs>
        </ExampleCard>
        <Guidance>
          Use tabs to organize related content into panels. Each panel should 
          contain self-contained content that makes sense without the others.
        </Guidance>
      </Section>

      <Section title="Style Variants" description="WexTabs supports two visual styles.">
        <div className="space-y-8">
          <ExampleCard title="Default (Pill Style)" description="Classic contained tabs with background fill on active state.">
            <WexTabs defaultValue="tab1" className="w-full max-w-md">
              <WexTabs.List>
                <WexTabs.Trigger value="tab1">Header I</WexTabs.Trigger>
                <WexTabs.Trigger value="tab2">Header II</WexTabs.Trigger>
                <WexTabs.Trigger value="tab3">Header III</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="tab1" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </WexTabs.Content>
              <WexTabs.Content value="tab2" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium.
                </p>
              </WexTabs.Content>
              <WexTabs.Content value="tab3" className="p-4">
                <p className="text-sm text-muted-foreground">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                  praesentium voluptatum.
                </p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Underline (Prime Style)" description="Clean tabs with bottom border indicator on active state.">
            <WexTabs defaultValue="tab1" className="w-full max-w-md">
              <WexTabs.List variant="underline">
                <WexTabs.Trigger value="tab1">Header I</WexTabs.Trigger>
                <WexTabs.Trigger value="tab2">Header II</WexTabs.Trigger>
                <WexTabs.Trigger value="tab3">Header III</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="tab1" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </WexTabs.Content>
              <WexTabs.Content value="tab2" className="p-4">
                <p className="text-sm text-muted-foreground">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                  doloremque laudantium, totam rem aperiam.
                </p>
              </WexTabs.Content>
              <WexTabs.Content value="tab3" className="p-4">
                <p className="text-sm text-muted-foreground">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
                  praesentium voluptatum deleniti atque corrupti.
                </p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Side-by-Side Comparison" description="Both variants for visual comparison.">
            <div className="w-full space-y-8">
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Default Variant</p>
                <WexTabs defaultValue="compare1" className="w-full max-w-md">
                  <WexTabs.List>
                    <WexTabs.Trigger value="compare1">Overview</WexTabs.Trigger>
                    <WexTabs.Trigger value="compare2">Details</WexTabs.Trigger>
                    <WexTabs.Trigger value="compare3">Settings</WexTabs.Trigger>
                  </WexTabs.List>
                  <WexTabs.Content value="compare1" className="p-4">
                    <p className="text-sm text-muted-foreground">Overview content with default pill style.</p>
                  </WexTabs.Content>
                  <WexTabs.Content value="compare2" className="p-4">
                    <p className="text-sm text-muted-foreground">Details content.</p>
                  </WexTabs.Content>
                  <WexTabs.Content value="compare3" className="p-4">
                    <p className="text-sm text-muted-foreground">Settings content.</p>
                  </WexTabs.Content>
                </WexTabs>
              </div>
              <div>
                <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Underline Variant</p>
                <WexTabs defaultValue="compare1" className="w-full max-w-md">
                  <WexTabs.List variant="underline">
                    <WexTabs.Trigger value="compare1">Overview</WexTabs.Trigger>
                    <WexTabs.Trigger value="compare2">Details</WexTabs.Trigger>
                    <WexTabs.Trigger value="compare3">Settings</WexTabs.Trigger>
                  </WexTabs.List>
                  <WexTabs.Content value="compare1" className="p-4">
                    <p className="text-sm text-muted-foreground">Overview content with underline style.</p>
                  </WexTabs.Content>
                  <WexTabs.Content value="compare2" className="p-4">
                    <p className="text-sm text-muted-foreground">Details content.</p>
                  </WexTabs.Content>
                  <WexTabs.Content value="compare3" className="p-4">
                    <p className="text-sm text-muted-foreground">Settings content.</p>
                  </WexTabs.Content>
                </WexTabs>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Underline Variant States" description="All interactive states for the underline variant.">
        <div className="space-y-8">
          <ExampleCard title="Disabled Tab (Underline)" description="Prevent interaction with specific tabs.">
            <WexTabs defaultValue="active" className="w-full max-w-md">
              <WexTabs.List variant="underline">
                <WexTabs.Trigger value="active">Active</WexTabs.Trigger>
                <WexTabs.Trigger value="disabled" disabled>Disabled</WexTabs.Trigger>
                <WexTabs.Trigger value="pending">Pending</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="active" className="p-4">
                <p className="text-sm text-muted-foreground">Content for active tab.</p>
              </WexTabs.Content>
              <WexTabs.Content value="pending" className="p-4">
                <p className="text-sm text-muted-foreground">Content for pending tab.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Controlled Underline Tabs" description="Programmatic tab control.">
            <div className="w-full max-w-md space-y-4">
              <WexTabs value={underlineTab} onValueChange={setUnderlineTab}>
                <WexTabs.List variant="underline">
                  <WexTabs.Trigger value="header1">Header I</WexTabs.Trigger>
                  <WexTabs.Trigger value="header2">Header II</WexTabs.Trigger>
                  <WexTabs.Trigger value="header3">Header III</WexTabs.Trigger>
                </WexTabs.List>
                <WexTabs.Content value="header1" className="p-4">
                  <p className="text-sm text-muted-foreground">Content for Header I.</p>
                </WexTabs.Content>
                <WexTabs.Content value="header2" className="p-4">
                  <p className="text-sm text-muted-foreground">Content for Header II.</p>
                </WexTabs.Content>
                <WexTabs.Content value="header3" className="p-4">
                  <p className="text-sm text-muted-foreground">Content for Header III.</p>
                </WexTabs.Content>
              </WexTabs>
              <div className="flex gap-2 flex-wrap">
                <WexButton intent="outline" size="sm" onClick={() => setUnderlineTab("header1")}>Go to I</WexButton>
                <WexButton intent="outline" size="sm" onClick={() => setUnderlineTab("header2")}>Go to II</WexButton>
                <WexButton intent="outline" size="sm" onClick={() => setUnderlineTab("header3")}>Go to III</WexButton>
              </div>
            </div>
          </ExampleCard>

          <ExampleCard title="Full-Width Underline Tabs" description="Tabs spanning container width.">
            <WexTabs defaultValue="overview" className="w-full">
              <WexTabs.List variant="underline" className="w-full">
                <WexTabs.Trigger value="overview" className="flex-1">Overview</WexTabs.Trigger>
                <WexTabs.Trigger value="analytics" className="flex-1">Analytics</WexTabs.Trigger>
                <WexTabs.Trigger value="reports" className="flex-1">Reports</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="overview" className="p-4">
                <p className="text-sm text-muted-foreground">Overview dashboard content.</p>
              </WexTabs.Content>
              <WexTabs.Content value="analytics" className="p-4">
                <p className="text-sm text-muted-foreground">Detailed analytics data.</p>
              </WexTabs.Content>
              <WexTabs.Content value="reports" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Default Variant Examples" description="Additional examples with the default pill style.">
        <div className="space-y-8">
          <ExampleCard title="Full-Width Tabs" description="Tabs spanning container width.">
            <WexTabs defaultValue="overview" className="w-full">
              <WexTabs.List className="grid w-full grid-cols-3">
                <WexTabs.Trigger value="overview">Overview</WexTabs.Trigger>
                <WexTabs.Trigger value="analytics">Analytics</WexTabs.Trigger>
                <WexTabs.Trigger value="reports">Reports</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="overview" className="p-4">
                <p className="text-sm text-muted-foreground">Overview dashboard content.</p>
              </WexTabs.Content>
              <WexTabs.Content value="analytics" className="p-4">
                <p className="text-sm text-muted-foreground">Detailed analytics data.</p>
              </WexTabs.Content>
              <WexTabs.Content value="reports" className="p-4">
                <p className="text-sm text-muted-foreground">Generated reports.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Tabs in Card" description="Integrated with card layout.">
            <WexCard className="w-full max-w-md">
              <WexCard.Header>
                <WexCard.Title>Account Settings</WexCard.Title>
                <WexCard.Description>Manage your account preferences.</WexCard.Description>
              </WexCard.Header>
              <WexCard.Content className="p-0">
                <WexTabs defaultValue="profile">
                  <WexTabs.List className="w-full rounded-none border-b">
                    <WexTabs.Trigger value="profile" className="rounded-none">Profile</WexTabs.Trigger>
                    <WexTabs.Trigger value="notifications" className="rounded-none">Notifications</WexTabs.Trigger>
                  </WexTabs.List>
                  <WexTabs.Content value="profile" className="p-6 space-y-4">
                    <div className="space-y-2">
                      <WexLabel htmlFor="tab-name">Name</WexLabel>
                      <WexInput id="tab-name" defaultValue="Wex User" />
                    </div>
                    <WexButton>Save Profile</WexButton>
                  </WexTabs.Content>
                  <WexTabs.Content value="notifications" className="p-6">
                    <p className="text-sm text-muted-foreground">Notification settings.</p>
                  </WexTabs.Content>
                </WexTabs>
              </WexCard.Content>
            </WexCard>
          </ExampleCard>

          <ExampleCard title="Disabled Tab" description="Prevent interaction with specific tabs.">
            <WexTabs defaultValue="active" className="w-full max-w-md">
              <WexTabs.List>
                <WexTabs.Trigger value="active">Active</WexTabs.Trigger>
                <WexTabs.Trigger value="disabled" disabled>Disabled</WexTabs.Trigger>
                <WexTabs.Trigger value="pending">Pending</WexTabs.Trigger>
              </WexTabs.List>
              <WexTabs.Content value="active" className="p-4">
                <p className="text-sm text-muted-foreground">Content for active tab.</p>
              </WexTabs.Content>
              <WexTabs.Content value="pending" className="p-4">
                <p className="text-sm text-muted-foreground">Content for pending tab.</p>
              </WexTabs.Content>
            </WexTabs>
          </ExampleCard>

          <ExampleCard title="Controlled Tabs" description="Programmatic tab control.">
            <div className="w-full max-w-md space-y-4">
              <WexTabs value={activeTab} onValueChange={setActiveTab}>
                <WexTabs.List>
                  <WexTabs.Trigger value="home">Home</WexTabs.Trigger>
                  <WexTabs.Trigger value="dashboard">Dashboard</WexTabs.Trigger>
                </WexTabs.List>
                <WexTabs.Content value="home" className="p-4">
                  <p className="text-sm text-muted-foreground">Home content.</p>
                </WexTabs.Content>
                <WexTabs.Content value="dashboard" className="p-4">
                  <p className="text-sm text-muted-foreground">Dashboard content.</p>
                </WexTabs.Content>
              </WexTabs>
              <div className="flex gap-2">
                <WexButton intent="outline" onClick={() => setActiveTab("home")}>Go to Home</WexButton>
                <WexButton intent="outline" onClick={() => setActiveTab("dashboard")}>Go to Dashboard</WexButton>
              </div>
            </div>
          </ExampleCard>
        </div>
      </Section>

      <Section title="Accessibility">
        <div className="space-y-4">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">Keyboard Navigation</h3>
            <ul className="text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>Arrow Left/Right: Navigate between tabs</li>
              <li>Enter/Space: Activate tab</li>
              <li>Home/End: Jump to first/last tab</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-medium mb-2">ARIA Roles</h3>
            <p className="text-sm text-muted-foreground">
              WexTabs uses tablist, tab, and tabpanel roles automatically.
              Each tab has aria-selected and aria-controls attributes.
            </p>
          </div>
        </div>
      </Section>

      <Section title="Usage">
        <CodeBlock
          code={`import { WexTabs } from "@/components/wex";

// Default tabs (pill style)
<WexTabs defaultValue="tab1">
  <WexTabs.List>
    <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
    <WexTabs.Trigger value="tab2">Tab 2</WexTabs.Trigger>
  </WexTabs.List>
  <WexTabs.Content value="tab1">Content 1</WexTabs.Content>
  <WexTabs.Content value="tab2">Content 2</WexTabs.Content>
</WexTabs>

// Underline variant (Prime style)
<WexTabs defaultValue="tab1">
  <WexTabs.List variant="underline">
    <WexTabs.Trigger value="tab1">Tab 1</WexTabs.Trigger>
    <WexTabs.Trigger value="tab2">Tab 2</WexTabs.Trigger>
  </WexTabs.List>
  <WexTabs.Content value="tab1">Content 1</WexTabs.Content>
  <WexTabs.Content value="tab2">Content 2</WexTabs.Content>
</WexTabs>

// Controlled tabs
const [tab, setTab] = useState("home");

<WexTabs value={tab} onValueChange={setTab}>
  <WexTabs.List variant="underline">
    <WexTabs.Trigger value="home">Home</WexTabs.Trigger>
    <WexTabs.Trigger value="settings">Settings</WexTabs.Trigger>
  </WexTabs.List>
  <WexTabs.Content value="home">Home</WexTabs.Content>
  <WexTabs.Content value="settings">Settings</WexTabs.Content>
</WexTabs>`}
        />
        <div className="mt-4 text-sm text-muted-foreground">
          <p><strong>Props:</strong></p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <code className="bg-muted px-1 rounded">WexTabs.List variant</code>: "default" | "underline"
            </li>
            <li>
              <code className="bg-muted px-1 rounded">defaultValue</code>: Initial active tab value
            </li>
            <li>
              <code className="bg-muted px-1 rounded">value / onValueChange</code>: Controlled mode
            </li>
            <li>
              <code className="bg-muted px-1 rounded">disabled</code>: Disable individual triggers
            </li>
          </ul>
        </div>
      </Section>

      <TokenReference tokens={tabsTokens} className="mt-12" />
    </ComponentPage>
  );
}

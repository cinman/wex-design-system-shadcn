import * as React from "react";
import { Tabs as TabsRoot, TabsList, TabsTrigger, TabsContent, ScrollableTabsList, ClosableTabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

/**
 * WexTabs - WEX Design System Tabs Component
 *
 * Tabbed content panels for organizing related content.
 * Uses namespace pattern: WexTabs.List, WexTabs.Trigger, WexTabs.Content
 *
 * @example
 * <WexTabs defaultValue="account">
 *   <WexTabs.List>
 *     <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
 *     <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
 *   </WexTabs.List>
 *   <WexTabs.Content value="account">Account content</WexTabs.Content>
 *   <WexTabs.Content value="password">Password content</WexTabs.Content>
 * </WexTabs>
 */

const WexTabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsRoot>,
  React.ComponentPropsWithoutRef<typeof TabsRoot>
>((props, ref) => <TabsRoot ref={ref} {...props} />);
WexTabsRoot.displayName = "WexTabs";

const WexTabsList = React.forwardRef<
  React.ElementRef<typeof TabsList>,
  React.ComponentPropsWithoutRef<typeof TabsList>
>(({ className, ...props }, ref) => (
  <TabsList
    ref={ref}
    className={cn("wex-tabs", className)}
    {...props}
  />
));
WexTabsList.displayName = "WexTabs.List";

const WexScrollableTabsList = React.forwardRef<
  React.ElementRef<typeof ScrollableTabsList>,
  React.ComponentPropsWithoutRef<typeof ScrollableTabsList>
>(({ className, ...props }, ref) => (
  <ScrollableTabsList
    ref={ref}
    className={cn("wex-tabs", className)}
    {...props}
  />
));
WexScrollableTabsList.displayName = "WexTabs.ScrollableList";

export const WexTabs = Object.assign(WexTabsRoot, {
  List: WexTabsList,
  ScrollableList: WexScrollableTabsList,
  Trigger: TabsTrigger,
  ClosableTrigger: ClosableTabsTrigger,
  Content: TabsContent,
});


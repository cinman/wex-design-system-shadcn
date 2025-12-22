import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * WexTabs - WEX Design System Tabs Component
 *
 * Tabbed content panels for organizing related content.
 * Uses namespace pattern: WexTabs.List, WexTabs.Trigger, WexTabs.Content
 *
 * Supports two variants:
 * - "default" (pill style with background)
 * - "underline" (Prime-inspired with bottom border indicator)
 *
 * @example
 * // Default pill style
 * <WexTabs defaultValue="account">
 *   <WexTabs.List>
 *     <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
 *     <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
 *   </WexTabs.List>
 *   <WexTabs.Content value="account">Account content</WexTabs.Content>
 *   <WexTabs.Content value="password">Password content</WexTabs.Content>
 * </WexTabs>
 *
 * @example
 * // Underline variant (Prime-style)
 * <WexTabs defaultValue="account">
 *   <WexTabs.List variant="underline">
 *     <WexTabs.Trigger value="account">Account</WexTabs.Trigger>
 *     <WexTabs.Trigger value="password">Password</WexTabs.Trigger>
 *   </WexTabs.List>
 *   <WexTabs.Content value="account">Account content</WexTabs.Content>
 *   <WexTabs.Content value="password">Password content</WexTabs.Content>
 * </WexTabs>
 */

// ===== CONTEXT FOR VARIANT PROPAGATION =====
type TabsVariant = "default" | "underline";

const TabsVariantContext = React.createContext<TabsVariant>("default");

// ===== CVA VARIANTS =====

const wexTabsListVariants = cva(
  "inline-flex items-center text-muted-foreground",
  {
    variants: {
      variant: {
        default: "h-9 justify-center rounded-lg bg-muted p-1",
        underline: "h-10 justify-start gap-0 border-b border-border bg-transparent p-0",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const wexTabsTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "rounded-md px-3 py-1 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
        underline:
          "relative px-4 py-2 rounded-none border-b-2 border-transparent -mb-px data-[state=active]:border-primary data-[state=active]:text-foreground hover:text-foreground hover:bg-accent/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ===== ROOT COMPONENT =====
const WexTabsRoot = TabsPrimitive.Root;

// ===== LIST COMPONENT =====
export interface WexTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>,
    VariantProps<typeof wexTabsListVariants> {}

const WexTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  WexTabsListProps
>(({ className, variant = "default", ...props }, ref) => (
  <TabsVariantContext.Provider value={variant ?? "default"}>
    <TabsPrimitive.List
      ref={ref}
      className={cn(wexTabsListVariants({ variant }), className)}
      {...props}
    />
  </TabsVariantContext.Provider>
));
WexTabsList.displayName = "WexTabs.List";

// ===== TRIGGER COMPONENT =====
export interface WexTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {}

const WexTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  WexTabsTriggerProps
>(({ className, ...props }, ref) => {
  const variant = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(wexTabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
});
WexTabsTrigger.displayName = "WexTabs.Trigger";

// ===== CONTENT COMPONENT =====
const WexTabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
WexTabsContent.displayName = "WexTabs.Content";

// ===== NAMESPACE EXPORT =====
export const WexTabs = Object.assign(WexTabsRoot, {
  List: WexTabsList,
  Trigger: WexTabsTrigger,
  Content: WexTabsContent,
});

export { wexTabsListVariants, wexTabsTriggerVariants };

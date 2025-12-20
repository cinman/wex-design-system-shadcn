import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

/**
 * WexCollapsible - WEX Design System Collapsible Component
 *
 * Expandable/collapsible content section.
 * Uses namespace pattern: WexCollapsible.Trigger, WexCollapsible.Content
 *
 * @example
 * <WexCollapsible>
 *   <WexCollapsible.Trigger>Toggle</WexCollapsible.Trigger>
 *   <WexCollapsible.Content>
 *     Hidden content revealed on toggle
 *   </WexCollapsible.Content>
 * </WexCollapsible>
 */

export const WexCollapsible = Object.assign(Collapsible, {
  Trigger: CollapsibleTrigger,
  Content: CollapsibleContent,
});


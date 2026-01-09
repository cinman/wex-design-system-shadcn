import * as React from "react";
import {
  Accordion as AccordionRoot,
  AccordionItem as AccordionItemRoot,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/**
 * WexAccordion - WEX Design System Accordion Component
 *
 * Vertically stacked set of interactive headings that reveal content.
 * Uses namespace pattern: WexAccordion.Item, WexAccordion.Trigger, etc.
 *
 * @example
 * <WexAccordion type="single" collapsible>
 *   <WexAccordion.Item value="item-1">
 *     <WexAccordion.Trigger>Section Title</WexAccordion.Trigger>
 *     <WexAccordion.Content>Content here</WexAccordion.Content>
 *   </WexAccordion.Item>
 * </WexAccordion>
 */

const WexAccordionRoot = React.forwardRef<
  React.ElementRef<typeof AccordionRoot>,
  React.ComponentPropsWithoutRef<typeof AccordionRoot>
>((props, ref) => <AccordionRoot ref={ref} {...props} />);
WexAccordionRoot.displayName = "WexAccordion";

const WexAccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionItemRoot>,
  React.ComponentPropsWithoutRef<typeof AccordionItemRoot>
>(({ className, ...props }, ref) => (
  <AccordionItemRoot
    ref={ref}
    className={cn("wex-accordion-item", className)}
    {...props}
  />
));
WexAccordionItem.displayName = "WexAccordion.Item";

export const WexAccordion = Object.assign(WexAccordionRoot, {
  Item: WexAccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});


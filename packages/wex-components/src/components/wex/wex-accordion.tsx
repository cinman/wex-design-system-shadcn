import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

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

export const WexAccordion = Object.assign(Accordion, {
  Item: AccordionItem,
  Trigger: AccordionTrigger,
  Content: AccordionContent,
});


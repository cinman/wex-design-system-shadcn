import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

/**
 * WexRadioGroup - WEX Design System Radio Group Component
 *
 * Set of checkable radio buttons for single-choice selection.
 * Uses namespace pattern: WexRadioGroup.Item
 *
 * @example
 * <WexRadioGroup defaultValue="option-one">
 *   <div className="flex items-center space-x-2">
 *     <WexRadioGroup.Item value="option-one" id="option-one" />
 *     <WexLabel htmlFor="option-one">Option One</WexLabel>
 *   </div>
 *   <div className="flex items-center space-x-2">
 *     <WexRadioGroup.Item value="option-two" id="option-two" />
 *     <WexLabel htmlFor="option-two">Option Two</WexLabel>
 *   </div>
 * </WexRadioGroup>
 */

export const WexRadioGroup = Object.assign(RadioGroup, {
  Item: RadioGroupItem,
});


import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";

/**
 * WexButtonGroup - WEX Design System Button Group Component
 *
 * Container for grouping related buttons.
 * Uses namespace pattern: WexButtonGroup.Separator, WexButtonGroup.Text
 *
 * @example
 * <WexButtonGroup>
 *   <WexButton intent="outline">Left</WexButton>
 *   <WexButton intent="outline">Center</WexButton>
 *   <WexButton intent="outline">Right</WexButton>
 * </WexButtonGroup>
 */

export const WexButtonGroup = Object.assign(ButtonGroup, {
  Separator: ButtonGroupSeparator,
  Text: ButtonGroupText,
});


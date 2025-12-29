import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "../ui/command";

/**
 * WexCommand - WEX Design System Command Component
 *
 * Command palette for keyboard-first navigation.
 * Uses namespace pattern: WexCommand.Input, WexCommand.List, etc.
 *
 * @example
 * <WexCommand>
 *   <WexCommand.Input placeholder="Type a command or search..." />
 *   <WexCommand.List>
 *     <WexCommand.Empty>No results found.</WexCommand.Empty>
 *     <WexCommand.Group heading="Suggestions">
 *       <WexCommand.Item>Calendar</WexCommand.Item>
 *       <WexCommand.Item>Search</WexCommand.Item>
 *     </WexCommand.Group>
 *   </WexCommand.List>
 * </WexCommand>
 */

export const WexCommand = Object.assign(Command, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
});


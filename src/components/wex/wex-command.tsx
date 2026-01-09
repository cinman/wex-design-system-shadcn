import * as React from "react";
import {
  Command as CommandRoot,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

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

const WexCommandRoot = React.forwardRef<
  React.ElementRef<typeof CommandRoot>,
  React.ComponentPropsWithoutRef<typeof CommandRoot>
>(({ className, ...props }, ref) => (
  <CommandRoot
    ref={ref}
    className={cn("wex-command", className)}
    {...props}
  />
));
WexCommandRoot.displayName = "WexCommand";

export const WexCommand = Object.assign(WexCommandRoot, {
  Dialog: CommandDialog,
  Input: CommandInput,
  List: CommandList,
  Empty: CommandEmpty,
  Group: CommandGroup,
  Item: CommandItem,
  Shortcut: CommandShortcut,
  Separator: CommandSeparator,
});


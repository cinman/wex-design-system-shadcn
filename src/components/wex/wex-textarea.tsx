import * as React from "react";
import { Textarea as TextareaRoot } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

/**
 * WexTextarea - WEX Design System Textarea Component
 *
 * Multi-line text input for forms.
 * Uses WEX sizing tokens for accessible touch targets.
 *
 * @example
 * <WexLabel htmlFor="message">Message</WexLabel>
 * <WexTextarea id="message" placeholder="Type your message..." />
 */

export const WexTextarea = React.forwardRef<
  React.ElementRef<typeof TextareaRoot>,
  React.ComponentPropsWithoutRef<typeof TextareaRoot>
>(({ className, ...props }, ref) => (
  <TextareaRoot
    ref={ref}
    className={cn("wex-textarea", className)}
    {...props}
  />
));
WexTextarea.displayName = "WexTextarea";


import * as React from "react";
import {
  InputOTP as InputOTPRoot,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";
import { cn } from "@/lib/utils";

/**
 * WexInputOTP - WEX Design System One-Time Password Input Component
 *
 * Input for one-time passwords and verification codes.
 * Uses namespace pattern: WexInputOTP.Group, WexInputOTP.Slot, WexInputOTP.Separator
 *
 * @example
 * <WexInputOTP maxLength={6}>
 *   <WexInputOTP.Group>
 *     <WexInputOTP.Slot index={0} />
 *     <WexInputOTP.Slot index={1} />
 *     <WexInputOTP.Slot index={2} />
 *   </WexInputOTP.Group>
 *   <WexInputOTP.Separator />
 *   <WexInputOTP.Group>
 *     <WexInputOTP.Slot index={3} />
 *     <WexInputOTP.Slot index={4} />
 *     <WexInputOTP.Slot index={5} />
 *   </WexInputOTP.Group>
 * </WexInputOTP>
 */

const WexInputOTPRoot = React.forwardRef<
  React.ElementRef<typeof InputOTPRoot>,
  React.ComponentPropsWithoutRef<typeof InputOTPRoot>
>(({ className, ...props }, ref) => (
  <InputOTPRoot
    ref={ref}
    className={cn("wex-input-otp", className)}
    {...props}
  />
));
WexInputOTPRoot.displayName = "WexInputOTP";

export const WexInputOTP = Object.assign(WexInputOTPRoot, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});


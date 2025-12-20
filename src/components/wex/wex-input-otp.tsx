import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp";

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

export const WexInputOTP = Object.assign(InputOTP, {
  Group: InputOTPGroup,
  Slot: InputOTPSlot,
  Separator: InputOTPSeparator,
});


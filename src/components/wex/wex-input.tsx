import * as React from "react";
import { Input as InputRoot, inputVariants, type InputProps } from "@/components/ui/input";
import { cn } from "@/lib/utils";

/**
 * WexInput - WEX Design System Input Component
 *
 * Text input field for forms with PrimeNG-style variants.
 * Uses WEX sizing tokens for accessible touch targets.
 *
 * @example
 * // Basic
 * <WexInput placeholder="Enter text" />
 * 
 * // Sizes
 * <WexInput inputSize="sm" placeholder="Small" />
 * <WexInput inputSize="lg" placeholder="Large" />
 * 
 * // Filled variant
 * <WexInput variant="filled" placeholder="Filled input" />
 * 
 * // With icons
 * <WexInput leftIcon={<Search className="h-4 w-4" />} placeholder="Search..." />
 * <WexInput rightIcon={<Mail className="h-4 w-4" />} placeholder="Email" />
 * 
 * // Invalid state
 * <WexInput invalid placeholder="Invalid input" />
 */

const WexInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => (
    <InputRoot
      ref={ref}
      className={cn("wex-input", className)}
      {...props}
    />
  )
);
WexInput.displayName = "WexInput";

export { WexInput, inputVariants };
export type { InputProps as WexInputProps };

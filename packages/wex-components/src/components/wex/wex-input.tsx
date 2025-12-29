import { Input, inputVariants, type InputProps } from "../ui/input";

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

export { Input as WexInput, inputVariants };
export type { InputProps as WexInputProps };

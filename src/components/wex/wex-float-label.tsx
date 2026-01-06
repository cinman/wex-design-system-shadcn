"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

/**
 * WexFloatLabel - WEX Design System Floating Label Wrapper
 * 
 * A wrapper component that provides floating label functionality for any input.
 * Works with WexInputNumber, WexInput, WexTextarea, etc.
 * 
 * Uses compound component pattern like PrimeNG:
 * 
 * @example
 * // With InputNumber
 * <WexFloatLabel>
 *   <WexInputNumber value={value} onValueChange={setValue} />
 *   <WexLabel>Amount</WexLabel>
 * </WexFloatLabel>
 * 
 * // With Input
 * <WexFloatLabel>
 *   <Input value={value} onChange={e => setValue(e.target.value)} />
 *   <WexLabel>Username</WexLabel>
 * </WexFloatLabel>
 */

// ============================================================================
// Context for sharing focus/value state
// ============================================================================

interface FloatLabelContextValue {
  isFocused: boolean
  hasValue: boolean
  setFocused: (focused: boolean) => void
  setHasValue: (hasValue: boolean) => void
  inputId: string
  size: "sm" | "md" | "lg"
}

const FloatLabelContext = React.createContext<FloatLabelContextValue | null>(null)

function useFloatLabelContext() {
  const context = React.useContext(FloatLabelContext)
  if (!context) {
    throw new Error("FloatLabel components must be used within WexFloatLabel")
  }
  return context
}

// ============================================================================
// Variants
// ============================================================================

const floatLabelWrapperVariants = cva(
  // w-full + basis-full ensures proper width in both flex and non-flex containers
  "relative w-full basis-full",
  {
    variants: {
      size: {
        sm: "",
        md: "",
        lg: "",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

// ============================================================================
// Main Wrapper Component
// ============================================================================

export interface WexFloatLabelProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof floatLabelWrapperVariants> {
  /** Size variant - affects label positioning and sizing */
  size?: "sm" | "md" | "lg"
  /** Children - should include an input and a label */
  children: React.ReactNode
}

const WexFloatLabelRoot = React.forwardRef<HTMLDivElement, WexFloatLabelProps>(
  ({ className, size = "md", children, ...props }, ref) => {
    const [isFocused, setFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    const inputId = React.useId()

    const contextValue: FloatLabelContextValue = {
      isFocused,
      hasValue,
      setFocused,
      setHasValue,
      inputId,
      size,
    }

    return (
      <FloatLabelContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(floatLabelWrapperVariants({ size }), className)}
          {...props}
        >
          {children}
        </div>
      </FloatLabelContext.Provider>
    )
  }
)
WexFloatLabelRoot.displayName = "WexFloatLabel"

// ============================================================================
// FloatLabel.Input - Wrapper for any input component
// ============================================================================

interface FloatLabelInputProps {
  children: React.ReactElement<any>
}

function FloatLabelInput({ children }: FloatLabelInputProps) {
  const { setFocused, setHasValue, inputId, size } = useFloatLabelContext()

  const child = React.Children.only(children) as React.ReactElement<any>
  const childProps = child.props as Record<string, any>
  
  // Check if this is a WexInputNumber
  const displayName = (child.type as any)?.displayName
  const isInputNumber = displayName === "WexInputNumber" || 
    childProps.showButtons !== undefined ||
    (childProps.mode === "currency" || childProps.mode === "decimal")

  // Height and padding classes for regular inputs (Input, Textarea)
  const regularInputSizeClasses = {
    sm: "!h-12 !pt-5 !pb-1",
    md: "!h-14 !pt-5 !pb-2", 
    lg: "!h-16 !pt-6 !pb-2",
  }

  // Detect initial value on mount
  const initialValue = childProps.value ?? childProps.defaultValue
  const hasInitialValue = initialValue !== undefined && initialValue !== null && initialValue !== ""
  
  React.useEffect(() => {
    if (hasInitialValue) {
      setHasValue(true)
    }
  }, [hasInitialValue, setHasValue])

  // Build new props
  const newProps: Record<string, any> = {
    id: inputId,
    onFocus: (e: React.FocusEvent) => {
      setFocused(true)
      childProps.onFocus?.(e)
    },
    onBlur: (e: React.FocusEvent) => {
      setFocused(false)
      childProps.onBlur?.(e)
    },
  }

  if (isInputNumber) {
    // For InputNumber: track value via onValueChange, don't modify styling
    // The inputSize prop on InputNumber handles its own height
    newProps.onValueChange = (value: number | null) => {
      setHasValue(value !== null && value !== undefined)
      childProps.onValueChange?.(value)
    }
    // Keep original className
    newProps.className = childProps.className
  } else {
    // For regular inputs (Input, Textarea): apply size classes and track onChange
    newProps.className = cn(childProps.className, regularInputSizeClasses[size])
    newProps.onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const val = e.target.value
      setHasValue(val !== null && val !== undefined && val !== "")
      childProps.onChange?.(e)
    }
  }

  return React.cloneElement(child, newProps)
}
FloatLabelInput.displayName = "WexFloatLabel.Input"

// ============================================================================
// FloatLabel.Label - The floating label
// ============================================================================

interface FloatLabelLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
}

function FloatLabelLabel({ children, className, ...props }: FloatLabelLabelProps) {
  const { isFocused, hasValue, inputId, size } = useFloatLabelContext()
  const isFloating = isFocused || hasValue

  // Size-specific positioning
  const sizeConfig = {
    sm: {
      default: "top-3.5 text-xs",
      floating: "top-1 text-[10px]",
    },
    md: {
      default: "top-4 text-sm",
      floating: "top-1.5 text-xs",
    },
    lg: {
      default: "top-5 text-base",
      floating: "top-2 text-sm",
    },
  }

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "absolute left-3 pointer-events-none z-10",
        "origin-top-left transition-all duration-200 ease-out",
        "text-muted-foreground",
        isFloating 
          ? cn(sizeConfig[size].floating, "text-foreground font-medium")
          : sizeConfig[size].default,
        className
      )}
      {...props}
    >
      {children}
    </label>
  )
}
FloatLabelLabel.displayName = "WexFloatLabel.Label"

// ============================================================================
// Compound Component Export
// ============================================================================

export const WexFloatLabel = Object.assign(WexFloatLabelRoot, {
  Input: FloatLabelInput,
  Label: FloatLabelLabel,
})

export type { FloatLabelInputProps, FloatLabelLabelProps }

// ============================================================================
// Legacy: Keep the original self-contained FloatLabel for backwards compat
// ============================================================================

export { FloatLabel as WexFloatLabelInput } from "@/components/ui/float-label"
export type { FloatLabelProps as WexFloatLabelInputProps } from "@/components/ui/float-label"

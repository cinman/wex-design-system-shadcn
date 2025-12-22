import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * WexButton - WEX Design System Button Component
 *
 * The primary interactive element for triggering actions.
 * Uses WEX semantic tokens and meets WCAG 2.5.5 touch target requirements.
 *
 * @example
 * <WexButton intent="primary">Save Changes</WexButton>
 * <WexButton intent="destructive" size="sm">Delete</WexButton>
 */

const wexButtonVariants = cva(
  // Base classes - hardened with accessibility requirements
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors",
    // HARDENED: Focus ring - always visible on focus-visible
    "focus-visible:outline-none",
    "focus-visible:ring-[length:var(--wex-focus-ring-width)]",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-[length:var(--wex-focus-ring-offset)]",
    "focus-visible:ring-offset-background",
    // Disabled state - pointer-events in base, colors per-variant
    "disabled:pointer-events-none",
    // SVG handling
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      intent: {
        // PRIMARY - Layer 3 tokens with explicit disabled colors
        primary: [
          "bg-wex-button-primary-bg",
          "text-wex-button-primary-fg",
          "border border-wex-button-primary-border",
          "hover:bg-wex-button-primary-hover-bg",
          "active:bg-wex-button-primary-active-bg",
          "disabled:bg-wex-button-primary-disabled-bg",
          "disabled:text-wex-button-primary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // SECONDARY - Layer 3 tokens with explicit disabled colors
        secondary: [
          "bg-wex-button-secondary-bg",
          "text-wex-button-secondary-fg",
          "border border-wex-button-secondary-border",
          "hover:bg-wex-button-secondary-hover-bg",
          "active:bg-wex-button-secondary-active-bg",
          "disabled:bg-wex-button-secondary-disabled-bg",
          "disabled:text-wex-button-secondary-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // DESTRUCTIVE - Layer 3 tokens with explicit disabled colors
        destructive: [
          "bg-wex-button-destructive-bg",
          "text-wex-button-destructive-fg",
          "border border-wex-button-destructive-border",
          "hover:bg-wex-button-destructive-hover-bg",
          "active:bg-wex-button-destructive-active-bg",
          "disabled:bg-wex-button-destructive-disabled-bg",
          "disabled:text-wex-button-destructive-disabled-fg",
          "disabled:opacity-[var(--wex-component-button-disabled-opacity)]",
        ].join(" "),
        // GHOST - Layer 2 (shadcn bridge) - no dedicated Layer 3 tokens yet
        ghost: [
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:opacity-50",
        ].join(" "),
        // OUTLINE - Layer 2 (shadcn bridge) - no dedicated Layer 3 tokens yet
        outline: [
          "border border-input bg-background",
          "hover:bg-accent hover:text-accent-foreground",
          "disabled:opacity-50",
        ].join(" "),
      },
      size: {
        // sm: Compact button, no WCAG target requirement (for dense UIs)
        sm: "h-8 px-3 text-xs",
        // md: Default - meets WCAG 2.5.5 minimum target size (44px)
        md: "h-11 min-h-target px-4 py-2",
        // lg: Large button, exceeds WCAG requirements
        lg: "h-12 min-h-12 px-8 text-base",
        // icon: Square icon button, meets WCAG requirements
        icon: "h-11 w-11 min-h-target min-w-target",
      },
    },
    defaultVariants: {
      intent: "primary",
      size: "md",
    },
  }
);

export interface WexButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof wexButtonVariants> {
  asChild?: boolean;
}

const WexButton = React.forwardRef<HTMLButtonElement, WexButtonProps>(
  ({ className, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(wexButtonVariants({ intent, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
WexButton.displayName = "WexButton";

export { WexButton, wexButtonVariants };


import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const wexButtonVariants = cva(
  // Base classes - hardened with accessibility requirements
  [
    "inline-flex items-center justify-center gap-2",
    "whitespace-nowrap rounded-md text-sm font-medium",
    "transition-colors",
    // HARDENED: Minimum target size (WCAG 2.5.5)
    "min-h-target min-w-target",
    // HARDENED: Focus ring - always visible on focus-visible
    "focus-visible:outline-none",
    "focus-visible:ring-[length:var(--wex-focus-ring-width)]",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-[length:var(--wex-focus-ring-offset)]",
    "focus-visible:ring-offset-background",
    // Disabled state
    "disabled:pointer-events-none disabled:opacity-50",
    // SVG handling
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      intent: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary-hover",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive-hover",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-9 min-h-9 px-3 text-xs",
        md: "h-11 min-h-11 px-4 py-2",
        lg: "h-12 min-h-12 px-8 text-base",
        icon: "h-11 w-11 min-h-11 min-w-11",
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

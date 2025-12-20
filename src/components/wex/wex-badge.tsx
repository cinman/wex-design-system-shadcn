import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * WexBadge - WEX Design System Badge Component
 *
 * Small status descriptor for UI elements with semantic intent variants.
 *
 * VARIANT GAPS:
 * - success: BLOCKED - requires --wex-success token (design decision required)
 * - warning: BLOCKED - requires --wex-warning token (design decision required)
 * - info: BLOCKED - requires --wex-info token (design decision required)
 *
 * @example
 * <WexBadge intent="default">New</WexBadge>
 * <WexBadge intent="destructive">Error</WexBadge>
 */

const wexBadgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      intent: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline: "text-foreground",
        // success: BLOCKED - requires --wex-success token
        // warning: BLOCKED - requires --wex-warning token
        // info: BLOCKED - requires --wex-info token
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

export interface WexBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof wexBadgeVariants> {}

function WexBadge({ className, intent, ...props }: WexBadgeProps) {
  return (
    <div className={cn(wexBadgeVariants({ intent }), className)} {...props} />
  );
}

export { WexBadge, wexBadgeVariants };


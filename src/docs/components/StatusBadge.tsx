import { cn } from "@/lib/utils";
import type { ComponentStatus } from "@/docs/registry/types";

interface StatusBadgeProps {
  status: ComponentStatus;
}

/**
 * Status badge for component maturity level
 * Uses semantic colors only - no raw values
 */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide rounded",
        status === "stable" && "bg-primary/10 text-primary",
        status === "beta" && "bg-accent text-accent-foreground",
        status === "alpha" && "bg-muted text-muted-foreground"
      )}
    >
      {status}
    </span>
  );
}


import * as React from "react";
import { Skeleton as SkeletonRoot, SkeletonCard, SkeletonList } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * WexSkeleton - WEX Design System Skeleton Component
 *
 * Loading placeholder for content that hasn't loaded yet.
 * Uses namespace pattern: WexSkeleton.Card, WexSkeleton.List
 *
 * @example
 * <WexSkeleton className="h-4 w-[250px]" />
 * <WexSkeleton className="h-12 w-12 rounded-full" />
 * <WexSkeleton.Card />
 * <WexSkeleton.List count={3} />
 */

const WexSkeletonRoot = React.forwardRef<
  React.ElementRef<typeof SkeletonRoot>,
  React.ComponentPropsWithoutRef<typeof SkeletonRoot>
>(({ className, ...props }, ref) => (
  <SkeletonRoot
    ref={ref}
    className={cn("wex-skeleton", className)}
    {...props}
  />
));
WexSkeletonRoot.displayName = "WexSkeleton";

export const WexSkeleton = Object.assign(WexSkeletonRoot, {
  Card: SkeletonCard,
  List: SkeletonList,
});


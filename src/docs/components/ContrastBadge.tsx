import * as React from "react";
import {
  getContrastData,
  formatContrastRatio,
  type ContrastRating,
} from "@/docs/utils/contrast";
import { WexTooltip } from "@/components/wex";

/**
 * ContrastBadge - Displays contrast ratio signal for color pairings
 *
 * Shows:
 * - Contrast ratio (e.g., "4.62:1")
 * - Rating tag: "Contrast: AA"
 *
 * This is a SIGNAL, not a compliance certification.
 *
 * @example
 * ```tsx
 * <ContrastBadge fgVar="--wex-text" bgVar="--wex-content-bg" />
 * ```
 */

interface ContrastBadgeProps {
  /** CSS variable name for foreground color (e.g., "--wex-text") */
  fgVar: string;
  /** CSS variable name for background color (e.g., "--wex-content-bg") */
  bgVar: string;
  /** Show compact version (just rating, no ratio) */
  compact?: boolean;
}

export function ContrastBadge({ fgVar, bgVar, compact = false }: ContrastBadgeProps) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    // Compute contrast on client-side only
    const data = getContrastData(fgVar, bgVar);
    if (data) {
      setContrastData({ ratio: data.ratio, rating: data.rating });
    }
  }, [fgVar, bgVar]);

  if (!contrastData) {
    return (
      <span className="text-[10px] text-muted-foreground">
        Loading...
      </span>
    );
  }

  const { ratio, rating } = contrastData;
  const config = getBadgeConfig(rating);

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <span className={config.className}>
            {compact ? (
              `Contrast: ${rating}`
            ) : (
              <>
                {formatContrastRatio(ratio)} ({rating})
              </>
            )}
          </span>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="top" className="max-w-xs">
          <TooltipContentComponent
            ratio={ratio}
            rating={rating}
            fgVar={fgVar}
            bgVar={bgVar}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

interface TooltipContentProps {
  ratio: number;
  rating: ContrastRating;
  fgVar: string;
  bgVar: string;
}

function TooltipContentComponent({ ratio, rating, fgVar, bgVar }: TooltipContentProps) {
  return (
    <div className="space-y-2 text-xs">
      <p className="font-semibold text-foreground">Contrast Signal</p>
      <p className="text-muted-foreground">
        Computed contrast ratio for text readability.
        This is a signal, not a certification.
      </p>
      <div className="border-t border-border pt-2 space-y-1">
        <p><span className="text-muted-foreground">Ratio:</span> {formatContrastRatio(ratio)}</p>
        <p><span className="text-muted-foreground">Rating:</span> {rating}</p>
        <p><span className="text-muted-foreground">Foreground:</span> {fgVar}</p>
        <p><span className="text-muted-foreground">Background:</span> {bgVar}</p>
        {rating === "AA-large" && (
          <p className="text-warning-foreground bg-warning/10 px-1 py-0.5 rounded text-[10px]">
            Passes AA for large text (≥18pt or 14pt bold) only
          </p>
        )}
        {rating === "Fail" && (
          <p className="text-destructive bg-destructive/10 px-1 py-0.5 rounded text-[10px]">
            Does not meet WCAG AA requirements for text
          </p>
        )}
      </div>
    </div>
  );
}

interface BadgeConfig {
  className: string;
}

function getBadgeConfig(rating: ContrastRating): BadgeConfig {
  const baseClasses = "inline-flex items-center px-1.5 py-0.5 text-[10px] font-medium tracking-wide rounded cursor-help";

  switch (rating) {
    case "AAA":
      return {
        className: `${baseClasses} bg-success/10 text-success border border-success/30`,
      };
    case "AA":
      return {
        className: `${baseClasses} bg-success/10 text-success border border-success/30`,
      };
    case "AA-large":
      return {
        className: `${baseClasses} bg-warning/10 text-warning-foreground border border-warning/30`,
      };
    case "Fail":
      return {
        className: `${baseClasses} bg-destructive/10 text-destructive border border-destructive/30`,
      };
  }
}

/**
 * Inline contrast indicator for use within swatch components
 * Shows just the rating as a small label
 */
export function ContrastIndicator({ fgVar, bgVar }: Omit<ContrastBadgeProps, "compact">) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    const data = getContrastData(fgVar, bgVar);
    if (data) {
      setContrastData({ ratio: data.ratio, rating: data.rating });
    }
  }, [fgVar, bgVar]);

  if (!contrastData) {
    return null;
  }

  const { ratio, rating } = contrastData;
  const colorClass = getRatingColorClass(rating);

  return (
    <WexTooltip.Provider>
      <WexTooltip>
        <WexTooltip.Trigger asChild>
          <span className={`text-[9px] font-medium cursor-help ${colorClass}`}>
            {rating}
          </span>
        </WexTooltip.Trigger>
        <WexTooltip.Content side="top" className="max-w-xs">
          <TooltipContentComponent
            ratio={ratio}
            rating={rating}
            fgVar={fgVar}
            bgVar={bgVar}
          />
        </WexTooltip.Content>
      </WexTooltip>
    </WexTooltip.Provider>
  );
}

function getRatingColorClass(rating: ContrastRating): string {
  switch (rating) {
    case "AAA":
    case "AA":
      return "text-success";
    case "AA-large":
      return "text-warning-foreground";
    case "Fail":
      return "text-destructive";
  }
}

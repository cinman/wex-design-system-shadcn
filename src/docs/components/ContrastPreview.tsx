/**
 * ContrastPreview Component
 * 
 * Visual preview of color contrast with sample text overlaid on background.
 * Shows foreground/background color combination with WCAG rating.
 */

import * as React from "react";
import { WexBadge } from "@/components/wex";
import { getContrastData, formatContrastRatio, type ContrastRating } from "@/docs/utils/contrast";
import { cn } from "@/lib/utils";

interface ContrastPreviewProps {
  /** Label describing the pairing */
  label: string;
  /** CSS variable for foreground color */
  fgToken: string;
  /** CSS variable for background color */
  bgToken: string;
  /** Optional className */
  className?: string;
  /** Optional compact mode */
  compact?: boolean;
}

/**
 * Visual contrast preview with sample text
 */
export function ContrastPreview({ 
  label, 
  fgToken, 
  bgToken, 
  className,
  compact = false,
}: ContrastPreviewProps) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    const checkContrast = () => {
      const data = getContrastData(fgToken, bgToken);
      if (data) {
        setContrastData(data);
      }
    };

    checkContrast();

    // Re-check on theme/style changes
    const observer = new MutationObserver(checkContrast);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ["class", "style"] 
    });

    return () => observer.disconnect();
  }, [fgToken, bgToken]);

  const passes = contrastData ? contrastData.rating !== "Fail" : false;

  if (compact) {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        {/* Mini swatch */}
        <div
          className="w-8 h-6 rounded border border-border flex items-center justify-center text-[8px] font-bold"
          style={{
            backgroundColor: `hsl(var(${bgToken}))`,
            color: `hsl(var(${fgToken}))`,
          }}
        >
          Aa
        </div>
        <span className="text-xs text-muted-foreground truncate flex-1">{label}</span>
        <WexBadge
          intent={
            contrastData?.rating === "AAA" || contrastData?.rating === "AA"
              ? "success"
              : contrastData?.rating === "AA-large"
              ? "warning"
              : "destructive"
          }
          className="text-[10px] px-1.5 py-0"
        >
          {contrastData?.rating ?? "..."}
        </WexBadge>
      </div>
    );
  }

  return (
    <div className={cn(
      "rounded-lg border p-3",
      passes ? "border-border bg-card" : "border-destructive/50 bg-destructive/5",
      className
    )}>
      <div className="flex items-center gap-3">
        {/* Visual swatch with sample text */}
        <div
          className="w-16 h-12 rounded-md border border-border flex items-center justify-center font-semibold text-sm shadow-sm"
          style={{
            backgroundColor: `hsl(var(${bgToken}))`,
            color: `hsl(var(${fgToken}))`,
          }}
        >
          Aa
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{label}</p>
          <div className="flex items-center gap-2 mt-1">
            <code className="text-[10px] text-muted-foreground bg-muted px-1 py-0.5 rounded truncate">
              {fgToken}
            </code>
            <span className="text-muted-foreground text-[10px]">on</span>
            <code className="text-[10px] text-muted-foreground bg-muted px-1 py-0.5 rounded truncate">
              {bgToken}
            </code>
          </div>
        </div>

        {/* Ratio and rating */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-xs text-muted-foreground font-mono">
            {contrastData ? formatContrastRatio(contrastData.ratio) : "..."}
          </span>
          <WexBadge
            intent={
              contrastData?.rating === "AAA" || contrastData?.rating === "AA"
                ? "success"
                : contrastData?.rating === "AA-large"
                ? "warning"
                : "destructive"
            }
          >
            {contrastData?.rating ?? "..."}
          </WexBadge>
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive contrast preview with inline color editing
 */
interface ContrastPreviewWithEditProps extends ContrastPreviewProps {
  /** Current foreground HSL value */
  fgValue: string;
  /** Current background HSL value */
  bgValue: string;
  /** Callback when foreground changes */
  onFgChange: (value: string) => void;
  /** Callback when background changes */
  onBgChange: (value: string) => void;
}

export function ContrastPreviewWithEdit({
  label,
  fgToken,
  bgToken,
  fgValue,
  bgValue,
  onFgChange,
  onBgChange,
  className,
}: ContrastPreviewWithEditProps) {
  const [contrastData, setContrastData] = React.useState<{
    ratio: number;
    rating: ContrastRating;
  } | null>(null);

  React.useEffect(() => {
    const checkContrast = () => {
      const data = getContrastData(fgToken, bgToken);
      if (data) {
        setContrastData(data);
      }
    };

    checkContrast();
    const interval = setInterval(checkContrast, 500);
    return () => clearInterval(interval);
  }, [fgToken, bgToken]);

  const passes = contrastData ? contrastData.rating !== "Fail" : false;

  // Convert HSL to hex for color picker
  const fgHex = hslToHex(fgValue);
  const bgHex = hslToHex(bgValue);

  return (
    <div className={cn(
      "rounded-lg border p-4",
      passes ? "border-border bg-card" : "border-destructive/50 bg-destructive/5",
      className
    )}>
      <div className="flex items-start gap-4">
        {/* Visual swatch */}
        <div
          className="w-20 h-16 rounded-md border border-border flex items-center justify-center font-bold text-lg shadow-sm flex-shrink-0"
          style={{
            backgroundColor: `hsl(${bgValue})`,
            color: `hsl(${fgValue})`,
          }}
        >
          Aa
        </div>

        {/* Info and controls */}
        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-sm font-medium text-foreground">{label}</p>
          
          {/* Inline color pickers */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">FG:</span>
              <div className="relative">
                <div
                  className="w-6 h-6 rounded border border-border cursor-pointer"
                  style={{ backgroundColor: `hsl(${fgValue})` }}
                />
                <input
                  type="color"
                  value={fgHex}
                  onChange={(e) => {
                    const hsl = hexToHSL(e.target.value);
                    if (hsl) onFgChange(hsl);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-muted-foreground">BG:</span>
              <div className="relative">
                <div
                  className="w-6 h-6 rounded border border-border cursor-pointer"
                  style={{ backgroundColor: `hsl(${bgValue})` }}
                />
                <input
                  type="color"
                  value={bgHex}
                  onChange={(e) => {
                    const hsl = hexToHSL(e.target.value);
                    if (hsl) onBgChange(hsl);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Ratio and rating */}
        <div className="flex flex-col items-end gap-1">
          <span className="text-sm text-foreground font-mono font-semibold">
            {contrastData ? formatContrastRatio(contrastData.ratio) : "..."}
          </span>
          <WexBadge
            intent={
              contrastData?.rating === "AAA" || contrastData?.rating === "AA"
                ? "success"
                : contrastData?.rating === "AA-large"
                ? "warning"
                : "destructive"
            }
          >
            {contrastData?.rating ?? "..."}
          </WexBadge>
        </div>
      </div>
    </div>
  );
}

// Helper functions for color conversion
function hslToHex(hslString: string): string {
  const match = hslString.match(/(\d+)\s+(\d+)%\s+(\d+)%/);
  if (!match) return "#000000";
  
  const h = parseInt(match[1], 10) / 360;
  const s = parseInt(match[2], 10) / 100;
  const l = parseInt(match[3], 10) / 100;
  
  let r: number, g: number, b: number;
  
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  
  const toHex = (n: number) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function hexToHSL(hex: string): string | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return null;
  
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  
  let h = 0;
  let s = 0;
  
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }
  
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}


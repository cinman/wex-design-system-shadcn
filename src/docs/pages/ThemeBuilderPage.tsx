/**
 * Theme Builder Page
 * 
 * Interactive tool for designers to customize WEX design tokens.
 * - Edit all semantic color tokens (Primary, Danger, Success, etc.)
 * - Edit palette ramps (50-900 for all color families)
 * - Live preview of changes
 * - Export to JSON for package integration
 */

import * as React from "react";
import { Section } from "@/docs/components/Section";
import { ColorInput, CompactColorInput } from "@/docs/components/ColorInput";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import { resolveColorVariable, getContrastData, formatContrastRatio, type ContrastRating } from "@/docs/utils/contrast";
import {
  WexButton,
  WexCard,
  WexTabs,
  WexAlert,
  WexBadge,
  WexInput,
  WexSwitch,
  WexLabel,
  WexCollapsible,
} from "@/components/wex";
import { Download, RotateCcw, Sun, Moon, ChevronDown, Info, CheckCircle, AlertTriangle, Link2, Wrench } from "lucide-react";
import { parseHSL } from "@/docs/utils/color-convert";
import { ContrastPreview } from "@/docs/components/ContrastPreview";
import { cn } from "@/lib/utils";

// Token definitions for the editor
const SEMANTIC_TOKENS = {
  primary: {
    label: "Primary",
    tokens: [
      { token: "--wex-primary", label: "Primary", description: "Main brand color, primary actions" },
      { token: "--wex-primary-contrast", label: "Primary Contrast", description: "Text on primary backgrounds" },
      { token: "--wex-primary-hover", label: "Primary Hover", description: "Hover state for primary" },
    ],
  },
  danger: {
    label: "Danger",
    tokens: [
      { token: "--wex-danger-bg", label: "Danger Background", description: "Destructive actions, errors" },
      { token: "--wex-danger-fg", label: "Danger Foreground", description: "Text on danger backgrounds" },
      { token: "--wex-danger-hover", label: "Danger Hover", description: "Hover state for danger" },
    ],
  },
  success: {
    label: "Success",
    tokens: [
      { token: "--wex-success-bg", label: "Success Background", description: "Positive feedback" },
      { token: "--wex-success-fg", label: "Success Foreground", description: "Text on success backgrounds" },
      { token: "--wex-success-hover", label: "Success Hover", description: "Hover state for success" },
    ],
  },
  warning: {
    label: "Warning",
    tokens: [
      { token: "--wex-warning-bg", label: "Warning Background", description: "Caution states" },
      { token: "--wex-warning-fg", label: "Warning Foreground", description: "Text on warning backgrounds" },
      { token: "--wex-warning-hover", label: "Warning Hover", description: "Hover state for warning" },
    ],
  },
  info: {
    label: "Info",
    tokens: [
      { token: "--wex-info-bg", label: "Info Background", description: "Informational messages" },
      { token: "--wex-info-fg", label: "Info Foreground", description: "Text on info backgrounds" },
      { token: "--wex-info-hover", label: "Info Hover", description: "Hover state for info" },
    ],
  },
  surfaces: {
    label: "Surfaces",
    tokens: [
      { token: "--wex-content-bg", label: "Content Background", description: "Page and card backgrounds" },
      { token: "--wex-content-border", label: "Content Border", description: "Borders and dividers" },
      { token: "--wex-surface-subtle", label: "Surface Subtle", description: "Subtle backgrounds, muted areas" },
    ],
  },
  text: {
    label: "Text",
    tokens: [
      { token: "--wex-text", label: "Text", description: "Primary text color" },
      { token: "--wex-text-muted", label: "Text Muted", description: "Secondary/muted text" },
    ],
  },
};

const PALETTE_RAMPS = ["blue", "green", "amber", "red", "slate"] as const;
const PALETTE_STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export default function ThemeBuilderPage() {
  const { setToken, getToken, resetAll, hasOverrides, exportAsJSON, isLoaded, cascadePalette } = useThemeOverrides();
  const [editMode, setEditMode] = React.useState<"light" | "dark">("light");
  const [expandedPalettes, setExpandedPalettes] = React.useState<Set<string>>(new Set());

  // Get current value for a token (override or computed from CSS)
  const getTokenValue = React.useCallback((token: string): string => {
    const override = getToken(token, editMode);
    if (override) return override;
    
    // Fall back to computed value from CSS
    const computed = resolveColorVariable(token);
    return computed || "0 0% 50%";
  }, [getToken, editMode]);

  // Handle token change
  const handleTokenChange = React.useCallback((token: string, value: string) => {
    setToken(token, value, editMode);
  }, [setToken, editMode]);

  // Export JSON
  const handleExport = React.useCallback(() => {
    const json = exportAsJSON();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "theme-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportAsJSON]);

  // Toggle palette expansion
  const togglePalette = (name: string) => {
    setExpandedPalettes((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  };

  if (!isLoaded) {
    return (
      <article className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">Loading theme builder...</p>
      </article>
    );
  }

  return (
    <article className="max-w-none">
      <header className="mb-8 pb-6 border-b border-border">
        <h1 className="text-3xl font-display font-bold text-foreground mb-2">
          Theme Builder
        </h1>
        <p className="text-lg text-muted-foreground">
          Customize WEX design tokens and export for package integration.
        </p>
      </header>

      {/* Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg border border-border bg-muted/30 mb-8">
        <div className="flex items-center gap-4">
          {/* Mode toggle */}
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-muted-foreground" />
            <WexSwitch
              checked={editMode === "dark"}
              onCheckedChange={(checked) => setEditMode(checked ? "dark" : "light")}
            />
            <Moon className="h-4 w-4 text-muted-foreground" />
            <WexLabel className="text-sm text-muted-foreground ml-2">
              Editing {editMode} mode
            </WexLabel>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {hasOverrides && (
            <WexBadge intent="secondary" className="mr-2">
              Unsaved changes
            </WexBadge>
          )}
          <WexButton intent="outline" size="sm" onClick={resetAll} disabled={!hasOverrides} className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset All
          </WexButton>
          <WexButton size="sm" onClick={handleExport} className="gap-1.5">
            <Download className="h-3.5 w-3.5" />
            Export JSON
          </WexButton>
        </div>
      </div>

      {/* 3-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_360px] gap-8">
        {/* LEFT COLUMN: Instructions */}
        <aside className="space-y-6 lg:order-1">
          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
              <Info className="h-4 w-4 text-info" />
              How to Use
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">1.</strong> Select a token category or palette ramp from the editor panel.
              </p>
              <p>
                <strong className="text-foreground">2.</strong> Use the color picker, hex input, or HSL values to customize.
              </p>
              <p>
                <strong className="text-foreground">3.</strong> Preview changes live in the center panel.
              </p>
              <p>
                <strong className="text-foreground">4.</strong> Export as JSON when ready.
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-4">
            <h3 className="font-semibold text-foreground mb-3">Integration Steps</h3>
            <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              <li>Export your theme overrides</li>
              <li>Place in <code className="bg-muted px-1 py-0.5 rounded text-xs">/tokens/</code></li>
              <li>Run the package build</li>
              <li>Deploy updated tokens</li>
            </ol>
          </div>

          <WexAlert intent="warning">
            <AlertTriangle className="h-4 w-4" />
            <WexAlert.Title className="text-sm">Local Storage Only</WexAlert.Title>
            <WexAlert.Description className="text-xs">
              Changes are stored in your browser. Export to persist permanently.
            </WexAlert.Description>
          </WexAlert>
        </aside>

        {/* CENTER COLUMN: Live Preview */}
        <main className="space-y-6 lg:order-2">
          <Section
            title="Live Preview"
            description="See how your changes affect actual components."
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Buttons */}
              <WexCard>
                <WexCard.Header className="pb-2">
                  <WexCard.Title className="text-sm">Buttons</WexCard.Title>
                </WexCard.Header>
                <WexCard.Content className="flex flex-wrap gap-2">
                  <WexButton size="sm">Primary</WexButton>
                  <WexButton intent="secondary" size="sm">Secondary</WexButton>
                  <WexButton intent="destructive" size="sm">Destructive</WexButton>
                  <WexButton intent="outline" size="sm">Outline</WexButton>
                  <WexButton intent="ghost" size="sm">Ghost</WexButton>
                </WexCard.Content>
              </WexCard>

              {/* Badges */}
              <WexCard>
                <WexCard.Header className="pb-2">
                  <WexCard.Title className="text-sm">Badges</WexCard.Title>
                </WexCard.Header>
                <WexCard.Content className="flex flex-wrap gap-2">
                  <WexBadge>Default</WexBadge>
                  <WexBadge intent="secondary">Secondary</WexBadge>
                  <WexBadge intent="destructive">Destructive</WexBadge>
                  <WexBadge intent="success">Success</WexBadge>
                  <WexBadge intent="warning">Warning</WexBadge>
                  <WexBadge intent="info">Info</WexBadge>
                </WexCard.Content>
              </WexCard>

              {/* Alerts */}
              <WexCard className="md:col-span-2">
                <WexCard.Header className="pb-2">
                  <WexCard.Title className="text-sm">Alerts</WexCard.Title>
                </WexCard.Header>
                <WexCard.Content className="space-y-2">
                  <WexAlert>
                    <Info className="h-4 w-4" />
                    <WexAlert.Title>Default Alert</WexAlert.Title>
                  </WexAlert>
                  <WexAlert intent="success">
                    <CheckCircle className="h-4 w-4" />
                    <WexAlert.Title>Success</WexAlert.Title>
                  </WexAlert>
                  <WexAlert intent="warning">
                    <AlertTriangle className="h-4 w-4" />
                    <WexAlert.Title>Warning</WexAlert.Title>
                  </WexAlert>
                  <WexAlert intent="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <WexAlert.Title>Error</WexAlert.Title>
                  </WexAlert>
                </WexCard.Content>
              </WexCard>

              {/* Form Elements */}
              <WexCard className="md:col-span-2">
                <WexCard.Header className="pb-2">
                  <WexCard.Title className="text-sm">Form Elements</WexCard.Title>
                </WexCard.Header>
                <WexCard.Content className="flex flex-wrap items-end gap-4">
                  <div className="space-y-1">
                    <WexLabel className="text-xs">Input</WexLabel>
                    <WexInput placeholder="Type something..." className="h-9" />
                  </div>
                  <div className="flex items-center gap-2">
                    <WexSwitch id="preview-switch" />
                    <WexLabel htmlFor="preview-switch" className="text-xs">Toggle</WexLabel>
                  </div>
                </WexCard.Content>
              </WexCard>
            </div>
          </Section>

          {/* Contrast Warnings in center */}
          <ContrastWarningsSection />
        </main>

        {/* RIGHT COLUMN: Editor (sticky) */}
        <aside className="lg:order-3">
          <div className="lg:sticky lg:top-20 space-y-6">
            {/* Semantic Colors */}
            <Section
              title="Semantic Colors"
              description="Core design tokens used by components."
            >
              <WexTabs defaultValue="primary">
                <WexTabs.List className="mb-4 flex-wrap">
                  {Object.entries(SEMANTIC_TOKENS).map(([key, group]) => (
                    <WexTabs.Trigger key={key} value={key} className="text-xs px-2 py-1">
                      {group.label}
                    </WexTabs.Trigger>
                  ))}
                </WexTabs.List>
                
                {Object.entries(SEMANTIC_TOKENS).map(([key, group]) => (
                  <WexTabs.Content key={key} value={key}>
                    <div className="space-y-4">
                      {group.tokens.map((tokenDef) => (
                        <ColorInput
                          key={tokenDef.token}
                          token={tokenDef.token}
                          label={tokenDef.label}
                          description={tokenDef.description}
                          value={getTokenValue(tokenDef.token)}
                          onChange={(value) => handleTokenChange(tokenDef.token, value)}
                        />
                      ))}
                    </div>
                  </WexTabs.Content>
                ))}
              </WexTabs>
            </Section>

            {/* Palette Ramps */}
            <Section
              title="Palette Ramps"
              description="Extended color scales (50-900)."
            >
              <div className="space-y-2">
                {PALETTE_RAMPS.map((rampName) => {
                  const anchorToken = `--wex-palette-${rampName}-500`;
                  const anchorValue = getTokenValue(anchorToken);
                  const anchorHsl = parseHSL(anchorValue);
                  
                  return (
                    <WexCollapsible
                      key={rampName}
                      open={expandedPalettes.has(rampName)}
                      onOpenChange={() => togglePalette(rampName)}
                    >
                      <WexCollapsible.Trigger asChild>
                        <button className="w-full flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-2">
                            <div className="flex gap-0.5">
                              {PALETTE_STEPS.slice(0, 5).map((step) => (
                                <div
                                  key={step}
                                  className="w-3 h-3 rounded-sm border border-border/50"
                                  style={{ backgroundColor: `hsl(var(--wex-palette-${rampName}-${step}))` }}
                                />
                              ))}
                            </div>
                            <span className="text-sm font-medium capitalize">{rampName}</span>
                          </div>
                          <ChevronDown className={cn(
                            "h-3.5 w-3.5 text-muted-foreground transition-transform",
                            expandedPalettes.has(rampName) && "rotate-180"
                          )} />
                        </button>
                      </WexCollapsible.Trigger>
                      <WexCollapsible.Content>
                        <div className="p-3 pt-2 space-y-3">
                          {/* Cascade controls */}
                          <div className="flex items-center gap-2 p-2 rounded bg-muted/30 border border-border/50">
                            <Link2 className="h-3.5 w-3.5 text-primary flex-shrink-0" />
                            <div className="flex items-center gap-2 flex-1">
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] text-muted-foreground">H°</span>
                                <WexInput
                                  type="number"
                                  min={0}
                                  max={360}
                                  value={anchorHsl?.h ?? 0}
                                  onChange={(e) => {
                                    const h = parseInt(e.target.value, 10) || 0;
                                    cascadePalette(rampName, h, anchorHsl?.s ?? 100, editMode);
                                  }}
                                  className="w-14 h-7 text-xs text-center font-mono"
                                />
                              </div>
                              <div className="flex flex-col gap-0.5">
                                <span className="text-[9px] text-muted-foreground">S%</span>
                                <WexInput
                                  type="number"
                                  min={0}
                                  max={100}
                                  value={anchorHsl?.s ?? 100}
                                  onChange={(e) => {
                                    const s = parseInt(e.target.value, 10) || 0;
                                    cascadePalette(rampName, anchorHsl?.h ?? 200, s, editMode);
                                  }}
                                  className="w-14 h-7 text-xs text-center font-mono"
                                />
                              </div>
                            </div>
                          </div>
                          
                          {/* Individual step editors */}
                          <div className="flex gap-1 justify-between">
                            {PALETTE_STEPS.map((step) => {
                              const token = `--wex-palette-${rampName}-${step}`;
                              return (
                                <CompactColorInput
                                  key={step}
                                  step={step}
                                  value={getTokenValue(token)}
                                  onChange={(value) => handleTokenChange(token, value)}
                                />
                              );
                            })}
                          </div>
                        </div>
                      </WexCollapsible.Content>
                    </WexCollapsible>
                  );
                })}
              </div>
            </Section>
          </div>
        </aside>
      </div>
    </article>
  );
}

// Contrast pairings to check
const CONTRAST_PAIRINGS = [
  { label: "Primary Contrast on Primary", fg: "--wex-primary-contrast", bg: "--wex-primary" },
  { label: "Danger Foreground on Danger", fg: "--wex-danger-fg", bg: "--wex-danger-bg" },
  { label: "Success Foreground on Success", fg: "--wex-success-fg", bg: "--wex-success-bg" },
  { label: "Warning Foreground on Warning", fg: "--wex-warning-fg", bg: "--wex-warning-bg" },
  { label: "Info Foreground on Info", fg: "--wex-info-fg", bg: "--wex-info-bg" },
  { label: "Text on Content Background", fg: "--wex-text", bg: "--wex-content-bg" },
  { label: "Muted Text on Content Background", fg: "--wex-text-muted", bg: "--wex-content-bg" },
];

// Map contrast pairings to component examples for visualization
const COMPONENT_EXAMPLES: Record<string, React.ReactNode> = {
  "Primary Contrast on Primary": (
    <WexButton size="sm">Primary Button</WexButton>
  ),
  "Danger Foreground on Danger": (
    <WexButton intent="destructive" size="sm">Destructive</WexButton>
  ),
  "Success Foreground on Success": (
    <WexBadge intent="success">Success Badge</WexBadge>
  ),
  "Warning Foreground on Warning": (
    <WexBadge intent="warning">Warning Badge</WexBadge>
  ),
  "Info Foreground on Info": (
    <WexBadge intent="info">Info Badge</WexBadge>
  ),
};

function ContrastWarningsSection() {
  const [contrastResults, setContrastResults] = React.useState<
    Array<{ label: string; fg: string; bg: string; ratio: number; rating: ContrastRating; passes: boolean }>
  >([]);

  React.useEffect(() => {
    const checkContrast = () => {
      const results = CONTRAST_PAIRINGS.map((pairing) => {
        const data = getContrastData(pairing.fg, pairing.bg);
        return {
          label: pairing.label,
          fg: pairing.fg,
          bg: pairing.bg,
          ratio: data?.ratio ?? 0,
          rating: data?.rating ?? "Fail" as ContrastRating,
          passes: data ? data.rating !== "Fail" : false,
        };
      });
      setContrastResults(results);
    };

    checkContrast();

    // Re-check when theme changes
    const observer = new MutationObserver(() => checkContrast());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    
    // Also check periodically to catch CSS variable changes
    const interval = setInterval(checkContrast, 1000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  const failingPairings = contrastResults.filter((r) => !r.passes);

  return (
    <div className="space-y-6">
      <Section
        title="Contrast Validation"
        description="WCAG contrast checks for common text/background pairings."
      >
        {failingPairings.length > 0 && (
          <WexAlert intent="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <WexAlert.Title>Accessibility Warning</WexAlert.Title>
            <WexAlert.Description>
              {failingPairings.length} color pairing(s) fail WCAG contrast requirements.
            </WexAlert.Description>
          </WexAlert>
        )}

        {/* Visual contrast previews */}
        <div className="space-y-2">
          {contrastResults.map((result) => (
            <ContrastPreview
              key={result.label}
              label={result.label}
              fgToken={result.fg}
              bgToken={result.bg}
              compact
            />
          ))}
        </div>

        {failingPairings.length === 0 && contrastResults.length > 0 && (
          <WexAlert intent="success" className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <WexAlert.Title>All checks passing</WexAlert.Title>
            <WexAlert.Description>
              All color pairings meet WCAG contrast requirements.
            </WexAlert.Description>
          </WexAlert>
        )}
      </Section>

      {/* Fix Accessibility Issues section - only shows if there are failures */}
      {failingPairings.length > 0 && (
        <Section
          title="Fix Accessibility Issues"
          description="Components affected by failing contrast. Adjust colors in the editor to fix."
        >
          <div className="space-y-4">
            {failingPairings.map((pairing) => {
              const componentExample = COMPONENT_EXAMPLES[pairing.label];
              
              return (
                <div
                  key={pairing.label}
                  className="p-4 rounded-lg border border-destructive/50 bg-destructive/5 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Wrench className="h-4 w-4 text-destructive" />
                      <span className="text-sm font-medium text-foreground">{pairing.label}</span>
                    </div>
                    <WexBadge intent="destructive">
                      {formatContrastRatio(pairing.ratio)} - {pairing.rating}
                    </WexBadge>
                  </div>
                  
                  {/* Show affected component */}
                  {componentExample && (
                    <div className="flex items-center gap-3 p-3 rounded bg-card border border-border">
                      <span className="text-xs text-muted-foreground">Affected:</span>
                      {componentExample}
                    </div>
                  )}
                  
                  {/* Token info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Adjust:</span>
                    <code className="bg-muted px-1.5 py-0.5 rounded">{pairing.fg}</code>
                    <span>or</span>
                    <code className="bg-muted px-1.5 py-0.5 rounded">{pairing.bg}</code>
                    <span>in the editor</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>
      )}
    </div>
  );
}


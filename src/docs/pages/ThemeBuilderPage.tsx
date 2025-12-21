/**
 * Theme Builder V4 - Clean Rebuild
 * 
 * Two-layer architecture:
 * 1. Palette Ramps (mode-agnostic) - Set 500 base, cascade generates 50-900
 * 2. Semantic Tokens (mode-specific) - Assign palette shades per light/dark mode
 * 
 * Left nav shows palette swatches with usage indicators.
 * Center workspace shows ramp editor OR semantic token editor.
 */

import * as React from "react";
import { useThemeBuilder } from "@/docs/context/ThemeBuilderContext";
import { useThemeOverrides } from "@/docs/hooks/useThemeOverrides";
import { PALETTE_RAMPS } from "@/docs/data/tokenRegistry";
import { 
  WexButton, 
  WexBadge, 
  WexAlertDialog,
  WexCard,
  WexInput,
  WexProgress,
  WexSwitch,
  WexCheckbox,
  WexRadioGroup,
  WexSkeleton,
} from "@/components/wex";
import { 
  Palette, 
  Sun, 
  Moon, 
  Download, 
  RotateCcw,
  ChevronRight,
  Paintbrush,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { hslToHex, parseHSL } from "@/docs/utils/color-convert";
import { generateRampFromBase, applyRampToDocument, type GeneratedRamp } from "@/docs/utils/ramp-generator";

// ============================================================================
// Types
// ============================================================================

type EditMode = "light" | "dark";
type WorkspaceView = "ramp" | "semantic";

// Semantic token assignments per mode
interface SemanticAssignment {
  token: string;
  label: string;
  lightValue: string; // e.g., "blue-700"
  darkValue: string;  // e.g., "blue-500"
}

// ============================================================================
// Palette Ramp Editor
// ============================================================================

interface RampEditorProps {
  paletteName: string;
  onClose: () => void;
}

function RampEditor({ paletteName, onClose }: RampEditorProps) {
  const { setToken } = useThemeOverrides();
  const rampDef = PALETTE_RAMPS.find(r => r.name === paletteName);
  
  // Get current 500 value
  const [baseHex, setBaseHex] = React.useState(() => {
    if (!rampDef) return "#0052CC";
    const token = `--wex-palette-${paletteName}-500`;
    const value = getComputedStyle(document.documentElement).getPropertyValue(token).trim();
    const parsed = parseHSL(value);
    return parsed ? hslToHex(parsed) : "#0052CC";
  });
  
  // Generate preview ramp using the utility
  const generatedRamp = React.useMemo<GeneratedRamp | null>(() => {
    return generateRampFromBase(baseHex, paletteName);
  }, [baseHex, paletteName]);
  
  // Apply ramp to all shades
  const handleApplyRamp = React.useCallback(() => {
    if (!generatedRamp) return;
    
    // Apply to document
    applyRampToDocument(generatedRamp);
    
    // Store in overrides for both modes (palette is mode-agnostic)
    generatedRamp.shades.forEach(shade => {
      const hslString = `${shade.hsl.h} ${shade.hsl.s}% ${shade.hsl.l}%`;
      setToken(shade.token, hslString, "light");
      setToken(shade.token, hslString, "dark");
    });
    
    onClose();
  }, [generatedRamp, setToken, onClose]);
  
  if (!rampDef || !generatedRamp) return null;
  
  return (
    <WexCard className="max-w-xl">
      <WexCard.Header>
        <WexCard.Title className="flex items-center gap-2">
          <Paintbrush className="w-5 h-5" />
          Edit {rampDef.label} Palette
        </WexCard.Title>
        <WexCard.Description>
          Set the base color (500) and the full 50-900 ramp will be generated automatically.
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content className="space-y-6">
        {/* Base Color Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Base Color (500)</label>
          <div className="flex gap-2">
            <input
              type="color"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              className="w-12 h-10 rounded border border-border cursor-pointer"
            />
            <WexInput
              type="text"
              value={baseHex}
              onChange={(e) => setBaseHex(e.target.value)}
              placeholder="#0052CC"
              className="flex-1 font-mono"
            />
          </div>
        </div>
        
        {/* Preview Ramp */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Generated Ramp Preview</label>
          <div className="flex gap-1">
            {generatedRamp.shades.map(({ shade, hex }) => (
              <div key={shade} className="flex flex-col items-center gap-1">
                <div 
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: hex }}
                />
                <span className="text-[9px] text-muted-foreground">{shade}</span>
              </div>
            ))}
          </div>
        </div>
      </WexCard.Content>
      <WexCard.Footer className="flex justify-end gap-2">
        <WexButton intent="outline" onClick={onClose}>Cancel</WexButton>
        <WexButton onClick={handleApplyRamp}>Apply Ramp</WexButton>
      </WexCard.Footer>
    </WexCard>
  );
}

// ============================================================================
// Semantic Token Editor
// ============================================================================

// Default semantic assignments
const SEMANTIC_ASSIGNMENTS: SemanticAssignment[] = [
  { token: "--wex-primary", label: "Primary", lightValue: "blue-700", darkValue: "blue-500" },
  { token: "--wex-primary-hover", label: "Primary Hover", lightValue: "blue-800", darkValue: "blue-600" },
  { token: "--wex-destructive", label: "Destructive", lightValue: "red-500", darkValue: "red-500" },
  { token: "--wex-destructive-hover", label: "Destructive Hover", lightValue: "red-600", darkValue: "red-600" },
  { token: "--wex-success", label: "Success", lightValue: "green-600", darkValue: "green-500" },
  { token: "--wex-warning", label: "Warning", lightValue: "amber-500", darkValue: "amber-400" },
  { token: "--wex-info", label: "Info", lightValue: "cyan-500", darkValue: "cyan-400" },
];

// Get all available palette options for dropdown
function getAllPaletteOptions(): { value: string; label: string; token: string }[] {
  const options: { value: string; label: string; token: string }[] = [];
  PALETTE_RAMPS.forEach(ramp => {
    [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].forEach(shade => {
      options.push({
        value: `${ramp.name}-${shade}`,
        label: `${ramp.label} ${shade}`,
        token: `--wex-palette-${ramp.name}-${shade}`,
      });
    });
  });
  return options;
}

interface SemanticEditorProps {
  mode: EditMode;
}

function SemanticEditor({ mode }: SemanticEditorProps) {
  const { setToken } = useThemeOverrides();
  const paletteOptions = React.useMemo(() => getAllPaletteOptions(), []);
  
  // Track current assignments (would load from overrides in real implementation)
  const [assignments, setAssignments] = React.useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    SEMANTIC_ASSIGNMENTS.forEach(a => {
      initial[a.token] = mode === "light" ? a.lightValue : a.darkValue;
    });
    return initial;
  });
  
  // Update when mode changes
  React.useEffect(() => {
    const updated: Record<string, string> = {};
    SEMANTIC_ASSIGNMENTS.forEach(a => {
      updated[a.token] = mode === "light" ? a.lightValue : a.darkValue;
    });
    setAssignments(updated);
  }, [mode]);
  
  const handleAssignmentChange = (semanticToken: string, paletteValue: string) => {
    const paletteToken = `--wex-palette-${paletteValue}`;
    // Update CSS to reference the palette token
    document.documentElement.style.setProperty(semanticToken, `var(${paletteToken})`);
    setAssignments(prev => ({ ...prev, [semanticToken]: paletteValue }));
    setToken(semanticToken, `var(${paletteToken})`, mode);
  };
  
  return (
    <WexCard>
      <WexCard.Header>
        <WexCard.Title>Semantic Token Assignments</WexCard.Title>
        <WexCard.Description>
          Assign palette shades to semantic tokens for {mode} mode.
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content className="space-y-4">
        {SEMANTIC_ASSIGNMENTS.map(assignment => (
          <div key={assignment.token} className="flex items-center gap-4">
            <div className="w-32">
              <div className="text-sm font-medium">{assignment.label}</div>
              <div className="text-[10px] text-muted-foreground font-mono">{assignment.token}</div>
            </div>
            <div className="flex-1">
              <select
                value={assignments[assignment.token] || ""}
                onChange={(e) => handleAssignmentChange(assignment.token, e.target.value)}
                className="w-full h-9 px-3 rounded-md border border-input bg-background text-sm"
              >
                {paletteOptions.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
            <div 
              className="w-8 h-8 rounded border border-border/50"
              style={{ backgroundColor: `hsl(var(--wex-palette-${assignments[assignment.token]}))` }}
            />
          </div>
        ))}
      </WexCard.Content>
    </WexCard>
  );
}

// ============================================================================
// Cascade Display
// ============================================================================

interface CascadeDisplayProps {
  semanticToken: string;
  mode: EditMode;
}

function CascadeDisplay({ semanticToken, mode }: CascadeDisplayProps) {
  // Find which palette token this semantic token references
  const assignment = SEMANTIC_ASSIGNMENTS.find(a => a.token === semanticToken);
  if (!assignment) return null;
  
  const paletteValue = mode === "light" ? assignment.lightValue : assignment.darkValue;
  const paletteToken = `--wex-palette-${paletteValue}`;
  
  // Components that use this semantic token
  const affectedComponents = getAffectedComponents(semanticToken);
  
  return (
    <div className="p-3 rounded-lg bg-muted/30 border border-border/50 space-y-3">
      <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        Cascade Chain ({mode} mode)
      </div>
      <div className="flex items-center gap-2 flex-wrap">
        <div 
          className="w-6 h-6 rounded border border-border/50"
          style={{ backgroundColor: `hsl(var(${paletteToken}))` }}
        />
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <code className="text-xs font-mono bg-primary/10 text-primary px-2 py-1 rounded">
          {semanticToken}
        </code>
        <ChevronRight className="w-4 h-4 text-muted-foreground" />
        <div className="flex flex-wrap gap-1">
          {affectedComponents.map(comp => (
            <WexBadge key={comp} intent="secondary" className="text-[10px]">
              {comp}
            </WexBadge>
          ))}
        </div>
      </div>
    </div>
  );
}

// Simple affected components lookup
function getAffectedComponents(token: string): string[] {
  const mapping: Record<string, string[]> = {
    "--wex-primary": ["WexButton", "WexBadge", "WexProgress", "WexSwitch", "WexCheckbox", "WexRadio"],
    "--wex-primary-hover": ["WexButton (hover)"],
    "--wex-destructive": ["WexButton", "WexBadge", "WexAlert"],
    "--wex-destructive-hover": ["WexButton (hover)"],
    "--wex-success": ["WexBadge", "WexAlert"],
    "--wex-warning": ["WexBadge", "WexAlert"],
    "--wex-info": ["WexBadge", "WexAlert"],
  };
  return mapping[token] || [];
}

// ============================================================================
// Live Component Preview
// ============================================================================

function LivePreview() {
  return (
    <WexCard>
      <WexCard.Header>
        <WexCard.Title>Live Preview</WexCard.Title>
        <WexCard.Description>
          Components update in real-time as you make changes.
        </WexCard.Description>
      </WexCard.Header>
      <WexCard.Content className="space-y-6">
        {/* Buttons */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Buttons</span>
          <div className="flex flex-wrap gap-2">
            <WexButton size="sm">Primary</WexButton>
            <WexButton size="sm" intent="destructive">Destructive</WexButton>
            <WexButton size="sm" intent="outline">Outline</WexButton>
            <WexButton size="sm" intent="secondary">Secondary</WexButton>
          </div>
        </div>
        
        {/* Badges */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Badges</span>
          <div className="flex flex-wrap gap-2">
            <WexBadge>Default</WexBadge>
            <WexBadge intent="destructive">Destructive</WexBadge>
            <WexBadge intent="success">Success</WexBadge>
            <WexBadge intent="warning">Warning</WexBadge>
            <WexBadge intent="info">Info</WexBadge>
          </div>
        </div>
        
        {/* Progress */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <WexProgress value={65} className="w-48" />
        </div>
        
        {/* Form Controls */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Form Controls</span>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <WexSwitch defaultChecked id="sw1" />
              <label htmlFor="sw1" className="text-sm">Switch</label>
            </div>
            <div className="flex items-center gap-2">
              <WexCheckbox defaultChecked id="cb1" />
              <label htmlFor="cb1" className="text-sm">Checkbox</label>
            </div>
          </div>
        </div>
        
        {/* Radio */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Radio Group</span>
          <WexRadioGroup defaultValue="opt1" className="flex gap-4">
            <div className="flex items-center gap-2">
              <WexRadioGroup.Item value="opt1" id="r1" />
              <label htmlFor="r1" className="text-sm">Option 1</label>
            </div>
            <div className="flex items-center gap-2">
              <WexRadioGroup.Item value="opt2" id="r2" />
              <label htmlFor="r2" className="text-sm">Option 2</label>
            </div>
          </WexRadioGroup>
        </div>
        
        {/* Skeleton */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">Skeleton</span>
          <div className="flex items-center gap-3">
            <WexSkeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2">
              <WexSkeleton className="h-4 w-32" />
              <WexSkeleton className="h-3 w-24" />
            </div>
          </div>
        </div>
      </WexCard.Content>
    </WexCard>
  );
}

// ============================================================================
// Main Theme Builder Page
// ============================================================================

export default function ThemeBuilderPage() {
  const { editMode, setEditMode, setSelectedToken } = useThemeBuilder();
  const { overrides, resetAll, exportAsJSON, hasOverrides } = useThemeOverrides();
  
  // Current workspace view
  const [view, setView] = React.useState<WorkspaceView>("semantic");
  const [editingPalette, setEditingPalette] = React.useState<string | null>(null);
  
  // Reset confirmation dialog
  const [showResetDialog, setShowResetDialog] = React.useState(false);
  
  // Handle export
  const handleExport = React.useCallback(() => {
    const json = exportAsJSON();
    const blob = new Blob([JSON.stringify(json, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "wex-theme-overrides.json";
    a.click();
    URL.revokeObjectURL(url);
  }, [exportAsJSON]);
  
  // Handle reset
  const confirmReset = React.useCallback(() => {
    resetAll();
    for (const token of Object.keys(overrides)) {
      document.documentElement.style.removeProperty(token);
    }
    setShowResetDialog(false);
    setSelectedToken(null);
  }, [resetAll, overrides, setSelectedToken]);
  
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
      {/* Header Bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              <h1 className="text-lg font-semibold">Theme Builder</h1>
            </div>
            
            {/* Light/Dark Mode Toggle */}
            <div className="flex items-center gap-1 bg-muted rounded-lg p-1">
              <button
                onClick={() => setEditMode("light")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",
                  editMode === "light" 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Sun className="w-4 h-4" />
                Light
              </button>
              <button
                onClick={() => setEditMode("dark")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm transition-all",
                  editMode === "dark" 
                    ? "bg-background shadow-sm text-foreground" 
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Moon className="w-4 h-4" />
                Dark
              </button>
            </div>
            
            {hasOverrides && (
              <WexBadge intent="warning" className="text-xs">
                Unsaved Changes
              </WexBadge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <WexButton 
              size="sm" 
              intent="outline" 
              onClick={() => setShowResetDialog(true)}
              disabled={!hasOverrides}
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
              Reset
            </WexButton>
            <WexButton 
              size="sm" 
              onClick={handleExport}
              disabled={!hasOverrides}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export
            </WexButton>
          </div>
        </div>
      </div>
      
      {/* Workspace */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* View Toggle */}
          <div className="flex gap-2">
            <WexButton
              size="sm"
              intent={view === "ramp" ? undefined : "outline"}
              onClick={() => setView("ramp")}
            >
              <Paintbrush className="w-4 h-4 mr-1.5" />
              Palette Ramps
            </WexButton>
            <WexButton
              size="sm"
              intent={view === "semantic" ? undefined : "outline"}
              onClick={() => setView("semantic")}
            >
              <ChevronRight className="w-4 h-4 mr-1.5" />
              Semantic Tokens
            </WexButton>
          </div>
          
          {/* Palette Ramp View */}
          {view === "ramp" && (
            <div className="space-y-4">
              {editingPalette ? (
                <RampEditor 
                  paletteName={editingPalette} 
                  onClose={() => setEditingPalette(null)} 
                />
              ) : (
                <WexCard>
                  <WexCard.Header>
                    <WexCard.Title>Palette Ramps</WexCard.Title>
                    <WexCard.Description>
                      Click a palette to edit its base color. The full 50-900 ramp will be generated automatically.
                    </WexCard.Description>
                  </WexCard.Header>
                  <WexCard.Content className="space-y-4">
                    {PALETTE_RAMPS.map(ramp => (
                      <button
                        key={ramp.name}
                        onClick={() => setEditingPalette(ramp.name)}
                        className="w-full flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors text-left"
                      >
                        <div 
                          className="w-10 h-10 rounded-md border border-border/50"
                          style={{ backgroundColor: `hsl(var(--wex-palette-${ramp.name}-500))` }}
                        />
                        <div className="flex-1">
                          <div className="font-medium">{ramp.label}</div>
                          <div className="text-xs text-muted-foreground">
                            50 - 900 shade ramp
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map(shade => (
                            <div
                              key={shade}
                              className="w-4 h-4 rounded-sm"
                              style={{ backgroundColor: `hsl(var(--wex-palette-${ramp.name}-${shade}))` }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </WexCard.Content>
                </WexCard>
              )}
            </div>
          )}
          
          {/* Semantic Token View */}
          {view === "semantic" && (
            <div className="space-y-6">
              <SemanticEditor mode={editMode} />
              
              {/* Cascade displays for each semantic token */}
              <WexCard>
                <WexCard.Header>
                  <WexCard.Title>Token Cascades</WexCard.Title>
                  <WexCard.Description>
                    See how palette colors flow through semantic tokens to components.
                  </WexCard.Description>
                </WexCard.Header>
                <WexCard.Content className="space-y-3">
                  {SEMANTIC_ASSIGNMENTS.slice(0, 5).map(assignment => (
                    <CascadeDisplay 
                      key={assignment.token} 
                      semanticToken={assignment.token} 
                      mode={editMode} 
                    />
                  ))}
                </WexCard.Content>
              </WexCard>
              
              <LivePreview />
            </div>
          )}
        </div>
      </div>
      
      {/* Reset Confirmation Dialog */}
      <WexAlertDialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <WexAlertDialog.Content>
          <WexAlertDialog.Header>
            <WexAlertDialog.Title>Reset All Changes?</WexAlertDialog.Title>
            <WexAlertDialog.Description>
              This will reset all theme customizations back to their default values. 
              This action cannot be undone.
            </WexAlertDialog.Description>
          </WexAlertDialog.Header>
          <WexAlertDialog.Footer>
            <WexAlertDialog.Cancel>Cancel</WexAlertDialog.Cancel>
            <WexAlertDialog.Action onClick={confirmReset}>
              Reset All
            </WexAlertDialog.Action>
          </WexAlertDialog.Footer>
        </WexAlertDialog.Content>
      </WexAlertDialog>
    </div>
  );
}

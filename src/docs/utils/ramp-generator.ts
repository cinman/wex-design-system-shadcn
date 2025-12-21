/**
 * Palette Ramp Generator
 * 
 * Generates a full 50-900 color ramp from a base 500 color.
 * Used by the Theme Builder to create harmonious color palettes.
 * 
 * The algorithm preserves the hue and saturation of the base color
 * while adjusting lightness to create the full range.
 */

import { hexToHSL, hslToHex, type HSL } from "./color-convert";

/**
 * Standard lightness values for each shade
 * These create a visually balanced ramp
 */
export const SHADE_LIGHTNESS: Record<number, number> = {
  50: 97,
  100: 93,
  200: 85,
  300: 72,
  400: 56,
  500: 45, // Base - will be overridden by input
  600: 38,
  700: 32,
  800: 26,
  900: 20,
};

/**
 * All shade values in order
 */
export const SHADE_VALUES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
export type ShadeValue = typeof SHADE_VALUES[number];

/**
 * A single shade in a generated ramp
 */
export interface GeneratedShade {
  shade: ShadeValue;
  hsl: HSL;
  hex: string;
  token: string;
}

/**
 * A complete generated palette ramp
 */
export interface GeneratedRamp {
  name: string;
  baseHex: string;
  shades: GeneratedShade[];
}

/**
 * Generate a full 50-900 ramp from a base color
 * 
 * @param baseHex - The base color in hex format (e.g., "#0052CC")
 * @param paletteName - The palette name (e.g., "blue")
 * @returns A GeneratedRamp with all 10 shades
 */
export function generateRampFromBase(baseHex: string, paletteName: string): GeneratedRamp | null {
  const baseHsl = hexToHSL(baseHex);
  if (!baseHsl) return null;
  
  const shades: GeneratedShade[] = SHADE_VALUES.map(shade => {
    // For 500, use the original lightness from the base color
    const lightness = shade === 500 ? baseHsl.l : SHADE_LIGHTNESS[shade];
    
    const hsl: HSL = {
      h: baseHsl.h,
      s: baseHsl.s,
      l: lightness,
    };
    
    return {
      shade,
      hsl,
      hex: hslToHex(hsl),
      token: `--wex-palette-${paletteName}-${shade}`,
    };
  });
  
  return {
    name: paletteName,
    baseHex,
    shades,
  };
}

/**
 * Generate a ramp with custom saturation adjustment
 * 
 * For lighter shades (50-300), saturation is often reduced slightly
 * to prevent them from looking too vibrant. This version applies
 * a subtle saturation curve.
 * 
 * @param baseHex - The base color in hex format
 * @param paletteName - The palette name
 * @returns A GeneratedRamp with saturation adjustments
 */
export function generateRampWithSaturationCurve(
  baseHex: string, 
  paletteName: string
): GeneratedRamp | null {
  const baseHsl = hexToHSL(baseHex);
  if (!baseHsl) return null;
  
  // Saturation multipliers for each shade (subtle reduction for light shades)
  const saturationMultipliers: Record<ShadeValue, number> = {
    50: 0.3,   // Very light - reduce saturation significantly
    100: 0.5,
    200: 0.7,
    300: 0.85,
    400: 0.95,
    500: 1.0,  // Base - full saturation
    600: 1.0,
    700: 0.95,
    800: 0.9,
    900: 0.85, // Very dark - reduce slightly
  };
  
  const shades: GeneratedShade[] = SHADE_VALUES.map(shade => {
    const lightness = shade === 500 ? baseHsl.l : SHADE_LIGHTNESS[shade];
    const saturation = Math.round(baseHsl.s * saturationMultipliers[shade]);
    
    const hsl: HSL = {
      h: baseHsl.h,
      s: saturation,
      l: lightness,
    };
    
    return {
      shade,
      hsl,
      hex: hslToHex(hsl),
      token: `--wex-palette-${paletteName}-${shade}`,
    };
  });
  
  return {
    name: paletteName,
    baseHex,
    shades,
  };
}

/**
 * Apply a generated ramp to the document
 * Sets CSS custom properties for each shade
 * 
 * @param ramp - The generated ramp to apply
 */
export function applyRampToDocument(ramp: GeneratedRamp): void {
  const root = document.documentElement;
  
  ramp.shades.forEach(shade => {
    const hslString = `${shade.hsl.h} ${shade.hsl.s}% ${shade.hsl.l}%`;
    root.style.setProperty(shade.token, hslString);
  });
}

/**
 * Get the CSS variable values for a ramp as an object
 * Useful for exporting or storing overrides
 * 
 * @param ramp - The generated ramp
 * @returns Object mapping token names to HSL strings
 */
export function getRampAsOverrides(ramp: GeneratedRamp): Record<string, string> {
  const overrides: Record<string, string> = {};
  
  ramp.shades.forEach(shade => {
    overrides[shade.token] = `${shade.hsl.h} ${shade.hsl.s}% ${shade.hsl.l}%`;
  });
  
  return overrides;
}

/**
 * Preview what a ramp would look like without applying it
 * Returns an array of hex colors for display
 * 
 * @param baseHex - The base color to preview from
 * @returns Array of 10 hex colors (50-900)
 */
export function previewRamp(baseHex: string): string[] {
  const ramp = generateRampFromBase(baseHex, "preview");
  if (!ramp) return [];
  return ramp.shades.map(s => s.hex);
}


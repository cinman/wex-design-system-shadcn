/**
 * Registry types for docs navigation and route generation
 */

export type ComponentStatus = "alpha" | "beta" | "stable";

export interface ComponentRegistryEntry {
  /** Display name in navigation */
  name: string;
  /** URL route path */
  route: string;
  /** Import path for lazy loading (used in routes.tsx) */
  importPath: string;
  /** Short description for tooltips/search */
  description: string;
  /** Maturity status */
  status: ComponentStatus;
  /** Optional tags for filtering/search */
  tags?: string[];
}

export interface FoundationRegistryEntry {
  /** Display name in navigation */
  name: string;
  /** URL route path */
  route: string;
  /** Import path for lazy loading */
  importPath: string;
  /** Short description */
  description: string;
}


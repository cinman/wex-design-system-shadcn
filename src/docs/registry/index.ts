/**
 * Registry re-exports and helpers
 */

export { componentRegistry } from "./components";
export { foundationRegistry } from "./foundations";
export type {
  ComponentRegistryEntry,
  FoundationRegistryEntry,
  ComponentStatus,
} from "./types";

import { componentRegistry } from "./components";
import { foundationRegistry } from "./foundations";
import type { ComponentRegistryEntry, FoundationRegistryEntry } from "./types";

/**
 * Get a component entry by route path
 */
export function getComponentByRoute(
  route: string
): ComponentRegistryEntry | undefined {
  return componentRegistry.find((c) => c.route === route);
}

/**
 * Get a foundation entry by route path
 */
export function getFoundationByRoute(
  route: string
): FoundationRegistryEntry | undefined {
  return foundationRegistry.find((f) => f.route === route);
}

/**
 * Get all routes for sitemap/preloading
 */
export function getAllRoutes(): string[] {
  const componentRoutes = componentRegistry.map((c) => c.route);
  const foundationRoutes = foundationRegistry.map((f) => f.route);
  const staticRoutes = ["/", "/getting-started", "/changelog"];
  return [...staticRoutes, ...foundationRoutes, ...componentRoutes];
}


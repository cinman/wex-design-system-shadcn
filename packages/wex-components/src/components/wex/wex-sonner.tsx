import { Toaster } from "../ui/sonner";
import type { ToastPosition } from "../ui/sonner";

/**
 * WexToaster - WEX Design System Toast Container Component
 *
 * Toast notification container using Sonner with WEX theming.
 * Place WexToaster once at the root of your app.
 *
 * For triggering toasts, use wexToast from "./wex-toast".
 *
 * WCAG 2.2 AA Compliance:
 * - Toast messages are announced by screen readers
 * - Sufficient color contrast in light and dark modes
 * - Focus management handled by Sonner library
 *
 * Positions available:
 * - top-left, top-center, top-right
 * - bottom-left, bottom-center, bottom-right (default)
 *
 * @example
 * // In App.tsx or layout:
 * <WexToaster position="top-right" />
 */

export const WexToaster = Toaster;
export type { ToastPosition };


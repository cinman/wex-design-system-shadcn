import { Toaster, toast } from "@/components/ui/sonner";
import type { ToastPosition } from "@/components/ui/sonner";

/**
 * WexToaster - WEX Design System Toast Notification Component
 *
 * Toast notification system using Sonner with WEX theming.
 * Place WexToaster once at the root of your app.
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
 *
 * // To trigger toasts:
 * import { wexToast } from "@/components/wex";
 * wexToast("Event created");
 * wexToast.success("Saved!");
 * wexToast.error("Failed!");
 * wexToast.warning("Caution needed");
 * wexToast.info("For your information");
 */

export const WexToaster = Toaster;
export const wexToast = toast;
export type { ToastPosition };


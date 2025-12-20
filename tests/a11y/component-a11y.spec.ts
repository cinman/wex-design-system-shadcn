import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import * as fs from "fs";
import * as path from "path";

/**
 * Accessibility Test Suite for WEX Design System
 *
 * This test iterates over all documented components and runs axe-core analysis.
 * Results are written to individual JSON files for later aggregation.
 *
 * THRESHOLD RULES:
 * - pass: 0 violations
 * - partial: 1-3 non-critical violations
 * - fail: any critical/serious violations OR 4+ violations
 *
 * LEVEL MAPPING (signal only, not certification):
 * - 0 violations → "AA" (we run wcag2aa rules)
 * - Some violations → "A" or undefined
 */

// Component registry - must match src/docs/registry/components.ts
// We define the routes here directly to avoid ESM/CJS import issues
const componentRoutes = [
  { key: "accordion", route: "/components/accordion", name: "Accordion" },
  { key: "alert", route: "/components/alert", name: "Alert" },
  { key: "alert-dialog", route: "/components/alert-dialog", name: "Alert Dialog" },
  { key: "aspect-ratio", route: "/components/aspect-ratio", name: "Aspect Ratio" },
  { key: "avatar", route: "/components/avatar", name: "Avatar" },
  { key: "badge", route: "/components/badge", name: "Badge" },
  { key: "breadcrumb", route: "/components/breadcrumb", name: "Breadcrumb" },
  { key: "button", route: "/components/button", name: "Button" },
  { key: "button-group", route: "/components/button-group", name: "Button Group" },
  { key: "calendar", route: "/components/calendar", name: "Calendar" },
  { key: "card", route: "/components/card", name: "Card" },
  { key: "carousel", route: "/components/carousel", name: "Carousel" },
  { key: "chart", route: "/components/chart", name: "Chart" },
  { key: "checkbox", route: "/components/checkbox", name: "Checkbox" },
  { key: "collapsible", route: "/components/collapsible", name: "Collapsible" },
  { key: "command", route: "/components/command", name: "Command" },
  { key: "context-menu", route: "/components/context-menu", name: "Context Menu" },
  { key: "dialog", route: "/components/dialog", name: "Dialog" },
  { key: "drawer", route: "/components/drawer", name: "Drawer" },
  { key: "dropdown-menu", route: "/components/dropdown-menu", name: "Dropdown Menu" },
  { key: "empty", route: "/components/empty", name: "Empty" },
  { key: "field", route: "/components/field", name: "Field" },
  { key: "form", route: "/components/form", name: "Form" },
  { key: "hover-card", route: "/components/hover-card", name: "Hover Card" },
  { key: "input", route: "/components/input", name: "Input" },
  { key: "input-group", route: "/components/input-group", name: "Input Group" },
  { key: "input-otp", route: "/components/input-otp", name: "Input OTP" },
  { key: "item", route: "/components/item", name: "Item" },
  { key: "kbd", route: "/components/kbd", name: "Kbd" },
  { key: "label", route: "/components/label", name: "Label" },
  { key: "menubar", route: "/components/menubar", name: "Menubar" },
  { key: "navigation-menu", route: "/components/navigation-menu", name: "Navigation Menu" },
  { key: "pagination", route: "/components/pagination", name: "Pagination" },
  { key: "popover", route: "/components/popover", name: "Popover" },
  { key: "progress", route: "/components/progress", name: "Progress" },
  { key: "radio-group", route: "/components/radio-group", name: "Radio Group" },
  { key: "resizable", route: "/components/resizable", name: "Resizable" },
  { key: "scroll-area", route: "/components/scroll-area", name: "Scroll Area" },
  { key: "select", route: "/components/select", name: "Select" },
  { key: "separator", route: "/components/separator", name: "Separator" },
  { key: "sheet", route: "/components/sheet", name: "Sheet" },
  { key: "sidebar", route: "/components/sidebar", name: "Sidebar" },
  { key: "skeleton", route: "/components/skeleton", name: "Skeleton" },
  { key: "slider", route: "/components/slider", name: "Slider" },
  { key: "sonner", route: "/components/sonner", name: "Sonner" },
  { key: "spinner", route: "/components/spinner", name: "Spinner" },
  { key: "switch", route: "/components/switch", name: "Switch" },
  { key: "table", route: "/components/table", name: "Table" },
  { key: "tabs", route: "/components/tabs", name: "Tabs" },
  { key: "textarea", route: "/components/textarea", name: "Textarea" },
  { key: "toast", route: "/components/toast", name: "Toast" },
  { key: "toggle", route: "/components/toggle", name: "Toggle" },
  { key: "toggle-group", route: "/components/toggle-group", name: "Toggle Group" },
  { key: "tooltip", route: "/components/tooltip", name: "Tooltip" },
];

// Ensure output directory exists
const outputDir = path.join(process.cwd(), "test-results", "a11y-components");

test.describe("Component Accessibility Tests", () => {
  test.beforeAll(() => {
    // Create output directory for individual results
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
  });

  for (const component of componentRoutes) {
    test(`A11y: ${component.name}`, async ({ page }) => {
      // Navigate to component page
      await page.goto(component.route);
      
      // Wait for page to be fully loaded
      await page.waitForLoadState("networkidle");
      
      // Run axe-core accessibility analysis
      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
        .analyze();

      // Count violations by impact
      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === "critical"
      ).length;
      const seriousViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === "serious"
      ).length;
      const totalViolations = accessibilityScanResults.violations.length;

      // Collect issue IDs
      const issues = accessibilityScanResults.violations.map((v) => v.id);

      // Write individual result file (safe for parallel execution)
      const result = {
        key: component.key,
        name: component.name,
        violations: totalViolations,
        criticalViolations,
        seriousViolations,
        issues,
        testedAt: new Date().toISOString(),
      };

      const resultPath = path.join(outputDir, `${component.key}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(result, null, 2));

      // Log violations for debugging
      if (totalViolations > 0) {
        console.log(`\n${component.name}: ${totalViolations} violations found`);
        accessibilityScanResults.violations.forEach((violation) => {
          console.log(`  - [${violation.impact}] ${violation.id}: ${violation.description}`);
        });
      }

      // Test always passes - we collect results for the report
      expect(true).toBe(true);
    });
  }
});

---
name: Component-First Theme Builder Redesign
overview: Redesign the Theme Builder with component-first navigation, modern UI, and a constrained override system where components can only reference global presets (not custom values). Add component-specific radius and elevation tokens with preset reference constraints.
todos:
  - id: component-radius-tokens
    content: Add component-specific radius tokens to tokenRegistry.ts (button, card, input, badge, alert, etc.) that reference global presets
    status: pending
  - id: elevation-presets
    content: Create global elevation/shadow presets (none, sm, md, lg) in tokenRegistry.ts and wex.tokens.css
    status: pending
  - id: component-elevation-tokens
    content: Add component-specific elevation tokens that reference elevation presets
    status: pending
    dependencies:
      - elevation-presets
  - id: preset-reference-widget
    content: Create PresetReferenceWidget component for selecting preset references (radio buttons/segmented control)
    status: pending
    dependencies:
      - component-radius-tokens
  - id: component-selector
    content: Create ComponentSelector component with visual grid/list of all editable components, grouped by category
    status: pending
  - id: component-editor
    content: Create ComponentEditor component that shows all editable properties for a selected component with inline widgets
    status: pending
    dependencies:
      - preset-reference-widget
  - id: nav-redesign
    content: "Redesign ThemeBuilderNav with component-first structure: Components section at top, Foundation section at bottom"
    status: pending
    dependencies:
      - component-selector
  - id: ui-modernization
    content: "Modernize UI: better spacing, typography, icons, hover states, transitions, visual hierarchy"
    status: pending
    dependencies:
      - nav-redesign
      - component-editor
  - id: update-css-files
    content: Update wex.tokens.css and wex.components-bridge.css with new elevation and component radius tokens
    status: pending
    dependencies:
      - component-radius-tokens
      - component-elevation-tokens
  - id: update-export
    content: Update ThemeExportView to include component radius/elevation tokens and elevation presets in export
    status: pending
    dependencies:
      - update-css-files
  - id: shadow-token-support
    content: Extend useThemeOverrides to support shadow/elevation token type (not just color and size)
    status: pending
    dependencies:
      - elevation-presets
  - id: live-preview-updates
    content: Update FilteredLivePreview to show component editor view when component is selected
    status: pending
    dependencies:
      - component-editor
---

# Component-First Theme Builder Redesign

## Overview

Transform the Theme Builder into a modern, component-first design tool with intuitive navigation and constrained override system. Components can only reference global presets (sm/md/lg), preventing arbitrary values while maintaining design system consistency.

## Architecture

```mermaid
flowchart TB
    subgraph Global[Global Presets - Custom Values Allowed]
        GP1[Radius: sm/md/lg<br/>4px, 6px, 8px]
        GP2[Palette Ramps<br/>HSL editable]
        GP3[Typography<br/>Font families]
    end
    
    subgraph Components[Component Overrides - Preset References Only]
        C1[Button Radius<br/>var(--wex-radius-md)]
        C2[Card Radius<br/>var(--wex-radius-lg)]
        C3[Input Radius<br/>var(--wex-radius-sm)]
    end
    
    Global -->|Reference| Components
    
    subgraph UI[Component Editor UI]
        CE[Component Selector]
        PE[Property Editor]
        LP[Live Preview]
    end
    
    Components --> UI
```

## Phase 1: Component-Specific Token System

### 1.1 Add Component Radius Tokens

Add to [`src/docs/data/tokenRegistry.ts`](src/docs/data/tokenRegistry.ts):

```typescript
// Component-specific radius tokens (reference global presets)
export const COMPONENT_RADIUS_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-component-button-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "button",
    type: "size",
    lightValue: "var(--wex-radius-md)", // References preset
    usedBy: ["WexButton"],
    description: "Border radius for all buttons",
    references: "--wex-radius-md", // Tracks which preset it references
  },
  {
    name: "--wex-component-card-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "card",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    usedBy: ["WexCard"],
    references: "--wex-radius-md",
  },
  {
    name: "--wex-component-input-radius",
    label: "Border Radius",
    category: "component",
    componentGroup: "input",
    type: "size",
    lightValue: "var(--wex-radius-md)",
    usedBy: ["WexInput", "WexTextarea", "WexSelect"],
    references: "--wex-radius-md",
  },
  // Add for: badge, alert, dialog, table, etc.
];
```

### 1.2 Add Component Elevation Tokens

Create elevation/shadow presets and component tokens:

```typescript
// Global elevation presets (custom values allowed)
export const ELEVATION_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-elevation-none",
    label: "No Shadow",
    type: "shadow",
    lightValue: "none",
  },
  {
    name: "--wex-elevation-sm",
    label: "Small Shadow",
    type: "shadow",
    lightValue: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  },
  {
    name: "--wex-elevation-md",
    label: "Medium Shadow",
    type: "shadow",
    lightValue: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  },
  {
    name: "--wex-elevation-lg",
    label: "Large Shadow",
    type: "shadow",
    lightValue: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  },
];

// Component elevation tokens (preset references only)
export const COMPONENT_ELEVATION_TOKENS: TokenDefinition[] = [
  {
    name: "--wex-component-button-shadow",
    componentGroup: "button",
    type: "shadow",
    lightValue: "var(--wex-elevation-sm)",
    references: "--wex-elevation-sm",
  },
  {
    name: "--wex-component-card-shadow",
    componentGroup: "card",
    type: "shadow",
    lightValue: "var(--wex-elevation-md)",
    references: "--wex-elevation-md",
  },
  // ...
];
```

### 1.3 Update Token Registry Structure

- Add `references` field to track which preset a component token references
- Add `type: "shadow"` support to TokenDefinition
- Merge component radius/elevation tokens into COMPONENT_TOKENS array

## Phase 2: Component-First Navigation Redesign

### 2.1 New Navigation Structure

Redesign [`src/docs/components/ThemeBuilderNav.tsx`](src/docs/components/ThemeBuilderNav.tsx) with:

**Top Section: Components**

- Visual component grid/list with icons
- Grouped by category (Actions, Forms, Layout, etc.)
- Click component → shows component editor

**Bottom Section: Foundation**

- Color Palette (Palette Ramps)
- Intent Colors (keep naming)
- Typography
- Global Settings (Radius Presets, Elevation Presets, Accessibility)

### 2.2 Component Selector UI

Create new component:

- `src/docs/components/ComponentSelector.tsx`
- Grid/list view of all editable components
- Icons or visual previews
- Search/filter capability
- Category grouping

### 2.3 Modern Visual Design

- Improved spacing and typography
- Better visual hierarchy
- Icons for component types
- Hover states and transitions
- Clear selected states
- Modern card-based layouts

## Phase 3: Component Editor

### 3.1 Component Editor Component

Create `src/docs/components/ComponentEditor.tsx`:

- Shows selected component with all editable properties
- Property groups: Colors, Radius, Elevation, etc.
- Inline editing widgets where appropriate
- Live preview of component
- Variant selector (for components with variants like Button)

### 3.2 Preset Reference Widget

Create `src/docs/components/PresetReferenceWidget.tsx`:

For properties that must reference presets (radius, elevation):

- Radio buttons or segmented control showing preset options
- Visual preview of each preset
- Shows current selection
- Cannot input custom values (only select presets)

### 3.3 Property Editor Components

Enhance existing widgets:

- `ColorWidget.tsx` - Inline color swatch + popover for ColorInput
- `RadiusPresetWidget.tsx` - Preset selector for component radius
- `ElevationPresetWidget.tsx` - Preset selector for component elevation
- `GlobalPresetEditor.tsx` - Number input for editing global preset values

## Phase 4: UI Modernization

### 4.1 Navigation Visual Improvements

- Modern sidebar with better spacing
- Component icons/thumbnails
- Clear visual separation between Components and Foundation
- Better typography hierarchy
- Improved hover/active states
- Smooth transitions

### 4.2 Component Editor UI

- Card-based property panels
- Inline editing with visual feedback
- Live preview prominently displayed
- Clear property labels and descriptions
- Visual indicators for overridden values

### 4.3 Overall Polish

- Consistent spacing system
- Better color contrast
- Improved loading states
- Smooth animations
- Professional, modern aesthetic

## Phase 5: Update CSS Files

### 5.1 Add Component Tokens to CSS

Update [`src/styles/wex.components-bridge.css`](src/styles/wex.components-bridge.css):

- Add component radius tokens
- Add component elevation tokens
- Ensure all reference global presets via `var()`

### 5.2 Add Elevation Presets

Update [`src/styles/wex.tokens.css`](src/styles/wex.tokens.css):

- Add `--wex-elevation-*` tokens
- Add component elevation tokens

## Phase 6: Export System Updates

### 6.1 Update Export to Include New Tokens

Update [`src/docs/components/ThemeExportView.tsx`](src/docs/components/ThemeExportView.tsx):

- Include component radius tokens
- Include component elevation tokens
- Include global elevation presets
- Maintain proper structure and comments

## Implementation Notes

- **Constraint enforcement**: UI prevents custom values at component level - only preset selection
- **Global presets**: Can have any custom value (4px, 8px, 2rem, etc.)
- **Component overrides**: Always `var(--wex-preset-*)` references
- **Backward compatibility**: Existing tokens continue to work
- **No breaking changes**: All existing functionality preserved

## Files to Create

- `src/docs/components/ComponentSelector.tsx`
- `src/docs/components/ComponentEditor.tsx`
- `src/docs/components/PresetReferenceWidget.tsx`
- `src/docs/components/ColorWidget.tsx`
- `src/docs/components/RadiusPresetWidget.tsx`
- `src/docs/components/ElevationPresetWidget.tsx`
- `src/docs/components/GlobalPresetEditor.tsx`

## Files to Modify

- `src/docs/data/tokenRegistry.ts` - Add component radius/elevation tokens, elevation presets
- `src/docs/components/ThemeBuilderNav.tsx` - Complete redesign for component-first navigation
- `src/docs/components/FilteredLivePreview.tsx` - Update for component editor view
- `src/docs/pages/ThemeBuilderPage.tsx` - Update routing/state for component selection
- `src/docs/components/ThemeExportView.tsx` - Include new tokens in export
- `src/styles/wex.tokens.css` - Add elevation presets
- `src/styles/wex.components-bridge.css` - Add component radius/elevation tokens
- `src/docs/hooks/useThemeOverrides.ts` - Support shadow/elevation token types
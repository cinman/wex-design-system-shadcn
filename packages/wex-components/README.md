# @wex/components

WEX Design System React components - theme-agnostic UI components built on Radix UI and shadcn/ui primitives.

## Installation

```bash
npm install @wex/components @wex/design-tokens
```

## Quick Start

### 1. Import the Theme CSS

In your main entry file (e.g., `main.tsx` or `index.tsx`):

```tsx
// Import the WEX theme (required for components to be styled)
import '@wex/design-tokens/css';

// Your app
import App from './App';
```

### 2. Configure Tailwind

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss';
import wexComponentsPreset from '@wex/components/tailwind-preset';
import wexDesignTokensPreset from '@wex/design-tokens/tailwind-preset';

export default {
  presets: [wexDesignTokensPreset, wexComponentsPreset],
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    // Include the component library for Tailwind to scan
    './node_modules/@wex/components/dist/**/*.js',
  ],
} satisfies Config;
```

### 3. Use Components

```tsx
import { WexButton, WexInput, WexCard, WexDialog } from '@wex/components';

function MyForm() {
  return (
    <WexCard>
      <WexCard.Header>
        <WexCard.Title>Contact Form</WexCard.Title>
      </WexCard.Header>
      <WexCard.Content>
        <WexInput placeholder="Enter your name" />
        <WexButton intent="primary">Submit</WexButton>
      </WexCard.Content>
    </WexCard>
  );
}
```

## Component Categories

### Form Components
- `WexInput` - Text input field
- `WexTextarea` - Multi-line text input
- `WexCheckbox` - Checkbox control
- `WexSwitch` - Toggle switch
- `WexSlider` - Range slider
- `WexRadioGroup` - Radio button group
- `WexSelect` - Dropdown select
- `WexCombobox` - Searchable select with autocomplete
- `WexDatePicker` - Date selection
- `WexCalendar` - Calendar display
- `WexInputOTP` - One-time password input
- `WexInputGroup` - Input with addons
- `WexField` - Form field wrapper with label/error
- `WexForm` - Form container with validation

### Button Components
- `WexButton` - Primary action button with intents (primary, secondary, destructive, success, info, warning, help, contrast, ghost, outline, link)
- `WexButtonGroup` - Group of related buttons
- `WexToggle` - Toggle button
- `WexToggleGroup` - Group of toggle buttons

### Overlay Components
- `WexDialog` - Modal dialog
- `WexAlertDialog` - Confirmation dialog
- `WexSheet` - Side panel overlay
- `WexDrawer` - Bottom/side drawer
- `WexPopover` - Floating content
- `WexTooltip` - Hover tooltip
- `WexHoverCard` - Rich hover content

### Menu Components
- `WexDropdownMenu` - Dropdown menu
- `WexContextMenu` - Right-click menu
- `WexMenubar` - Application menubar
- `WexNavigationMenu` - Navigation links
- `WexCommand` - Command palette

### Layout Components
- `WexCard` - Content container
- `WexTable` - Data table
- `WexDataTable` - Advanced data table with sorting/filtering
- `WexTabs` - Tabbed content
- `WexAccordion` - Collapsible sections
- `WexSeparator` - Visual divider
- `WexScrollArea` - Scrollable container
- `WexResizable` - Resizable panels
- `WexAspectRatio` - Fixed aspect ratio container
- `WexCollapsible` - Collapsible content
- `WexSidebar` - Navigation sidebar

### Navigation Components
- `WexBreadcrumb` - Breadcrumb navigation
- `WexPagination` - Page navigation

### Display Components
- `WexAvatar` - User avatar
- `WexBadge` - Status badge
- `WexAlert` - Alert message
- `WexProgress` - Progress indicator
- `WexSkeleton` - Loading placeholder
- `WexSpinner` - Loading spinner
- `WexCarousel` - Image carousel
- `WexEmpty` - Empty state
- `WexItem` - List item
- `WexKbd` - Keyboard shortcut display

### Feedback Components
- `WexToaster` - Toast container
- `wexToast` - Toast notification function

### Data Visualization
- `WexChart` - Chart component (wraps Recharts)

## Theme Requirement

**Important:** Components are theme-agnostic and require a theme package to be styled.

Without importing a theme:
- Components will render with browser defaults
- Colors, spacing, and typography will be unstyled
- CSS variables like `--wex-primary` will be undefined

### Using the WEX Theme

```tsx
import '@wex/design-tokens/css';
```

### Creating a Custom Theme (White-Label)

1. Copy the `@wex/design-tokens` package
2. Rename to your brand (e.g., `@acme/design-tokens`)
3. Modify `tokens.css` with your brand colors
4. Components automatically use your new theme

## Peer Dependencies

This package requires:
- `react` ^18.0.0 or ^19.0.0
- `react-dom` ^18.0.0 or ^19.0.0
- `tailwindcss` ^3.4.0

## TypeScript Support

Full TypeScript support with exported types:

```tsx
import { WexButton, type WexButtonProps } from '@wex/components';

const MyButton: React.FC<WexButtonProps> = (props) => (
  <WexButton {...props} />
);
```

## License

UNLICENSED - Internal WEX use only.


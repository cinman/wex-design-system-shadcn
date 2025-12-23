# PrimeNG v21 → WEX Component Variant Gap Analysis

This document provides a comprehensive comparison of PrimeNG component variants against the WEX design system implementation after Phase 4.

## Legend
- ✅ Implemented in WEX
- ⚠️ Partial implementation
- ❌ Not implemented
- 🚫 Not applicable / Deferred to future phase

---

## Summary

### Phase 4 Accomplishments

| Category | Components Updated | New Variants Added |
|----------|-------------------|-------------------|
| **Button** | WexButton | success, info, warning, help, contrast, link, rounded, raised, loading |
| **Form Controls** | Input, Textarea, Checkbox, RadioGroup, Switch | sizes (sm/md/lg), filled, icons, invalid, auto-resize |
| **Slider** | Slider | vertical orientation, range mode, showValue |
| **Tabs** | Tabs | ScrollableTabsList, ClosableTabsTrigger |
| **DataTable** | Table | striped, gridlines, sizes (sm/md/lg) |
| **Progress** | Progress | indeterminate, showLabel |
| **Pagination** | Pagination | RowsPerPage, PageReport, JumpToPage, First/Last buttons |
| **Dialog** | Dialog | maximizable, position (center/top/bottom/left/right), sizes |
| **Sheet** | Sheet | sizes (sm/md/lg/xl/full) |
| **Card** | Card | variants (default/elevated/outlined/flat) |
| **Avatar** | Avatar | sizes (xs-2xl), shapes (circle/square), AvatarGroup, AvatarBadge |
| **Badge** | WexBadge | sizes (sm/md/lg), pill shape |
| **Skeleton** | Skeleton | shapes (rectangle/circle/text), animations, presets |
| **Tooltip** | Tooltip | delayDuration prop |

---

## Detailed Component Analysis

### 1. Button

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| primary severity | ✅ | `intent="primary"` |
| secondary severity | ✅ | `intent="secondary"` |
| success severity | ✅ | `intent="success"` - NEW |
| info severity | ✅ | `intent="info"` - NEW |
| warning severity | ✅ | `intent="warning"` - NEW |
| danger/destructive severity | ✅ | `intent="destructive"` |
| help severity | ✅ | `intent="help"` - NEW |
| contrast severity | ✅ | `intent="contrast"` - NEW |
| outlined | ✅ | `intent="outline"` |
| text | ✅ | `intent="ghost"` |
| link | ✅ | `intent="link"` - NEW |
| raised | ✅ | `raised` prop - NEW |
| rounded | ✅ | `rounded` prop - NEW |
| loading | ✅ | `loading` prop - NEW |
| icon only | ✅ | `size="icon"` |
| sizes | ✅ | `size="sm/md/lg"` |
| button group | ❌ | Separate component needed |
| badge overlay | ❌ | Deferred |

### 2. Input / InputText

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| sizes | ✅ | `inputSize="sm/md/lg"` - NEW |
| filled variant | ✅ | `variant="filled"` - NEW |
| left icon | ✅ | `leftIcon` prop - NEW |
| right icon | ✅ | `rightIcon` prop - NEW |
| invalid state | ✅ | `invalid` prop - NEW |
| float label | ❌ | Complex, deferred |
| keyfilter | ❌ | Use pattern/inputMode attributes |
| addons (prefix/suffix) | ⚠️ | Use icons or wrap in flex container |

### 3. Textarea

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| sizes | ✅ | `textareaSize="sm/md/lg"` - NEW |
| auto-resize | ✅ | `autoResize` prop - NEW |
| float label | ❌ | Deferred |

### 4. Checkbox

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| sizes | ✅ | `checkboxSize="sm/md/lg"` - NEW |
| indeterminate | ⚠️ | Radix supports via `checked="indeterminate"` |
| group | ❌ | Build with multiple checkboxes |
| filled | ❌ | Deferred |

### 5. RadioButton

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | RadioGroup + RadioGroupItem |
| sizes | ✅ | `radioSize="sm/md/lg"` - NEW |
| group | ✅ | RadioGroup component |
| filled | ❌ | Deferred |

### 6. Switch / InputSwitch

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| sizes | ✅ | `switchSize="sm/md/lg"` - NEW |
| disabled | ✅ | `disabled` prop |

### 7. Slider

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| range | ✅ | Pass array to `defaultValue` - NEW |
| vertical | ✅ | `orientation="vertical"` - NEW |
| step | ✅ | `step` prop |
| show value | ✅ | `showValue` prop - NEW |

### 8. Select / Dropdown

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| groups | ✅ | SelectGroup component |
| filter/search | ❌ | Use Combobox for searchable |
| editable | ❌ | Use Combobox |
| clear button | ❌ | Deferred |
| virtual scroll | ❌ | Deferred |

### 9. Tabs / TabView

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Tabs + TabsList + TabsTrigger |
| scrollable | ✅ | ScrollableTabsList - NEW |
| closable | ✅ | ClosableTabsTrigger - NEW |
| disabled tabs | ✅ | `disabled` prop on TabsTrigger |
| controlled | ✅ | `value` + `onValueChange` props |
| dynamic | ⚠️ | Manage tabs array in state |

### 10. DataTable / Table

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| striped | ✅ | `striped` prop - NEW |
| gridlines | ✅ | `gridlines` prop - NEW |
| sizes | ✅ | `size="sm/md/lg"` - NEW |
| sorting | ✅ | Via TanStack Table integration |
| filtering | ✅ | Via TanStack Table |
| pagination | ✅ | DataTablePagination component |
| row selection | ✅ | Via TanStack Table |
| column visibility | ✅ | DataTableViewOptions |
| row expansion | ❌ | Deferred |
| row editing | ❌ | Deferred |
| virtual scroll | ❌ | Deferred |
| frozen columns | ❌ | Deferred |
| export | ❌ | Deferred |

### 11. Progress / ProgressBar

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| indeterminate | ✅ | `indeterminate` prop - NEW |
| label | ✅ | `showLabel` prop - NEW |
| custom label | ✅ | `labelFormat` function - NEW |

### 12. Pagination / Paginator

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| first/last buttons | ✅ | PaginationFirst, PaginationLast - NEW |
| rows per page | ✅ | RowsPerPage component - NEW |
| page report | ✅ | PageReport component - NEW |
| jump to page | ✅ | JumpToPage component - NEW |
| template | ⚠️ | Compose with provided components |

### 13. Dialog

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| maximizable | ✅ | `maximizable` prop - NEW |
| position | ✅ | `position` prop (center/top/bottom/left/right) - NEW |
| sizes | ✅ | `size` prop (sm/md/lg/xl/full) - NEW |
| draggable | ❌ | Requires additional library |
| resizable | ❌ | Requires additional library |

### 14. Sheet / Sidebar

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| position | ✅ | `side` prop (left/right/top/bottom) |
| sizes | ✅ | `size` prop (sm/md/lg/xl/full) - NEW |

### 15. Card / Panel

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| elevated | ✅ | `variant="elevated"` - NEW |
| outlined | ✅ | `variant="outlined"` - NEW |
| flat | ✅ | `variant="flat"` - NEW |
| toggleable | ❌ | Use Collapsible component |

### 16. Avatar

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| sizes | ✅ | `size="xs/sm/md/lg/xl/2xl"` - NEW |
| shape | ✅ | `shape="circle/square"` - NEW |
| group | ✅ | AvatarGroup component - NEW |
| badge/status | ✅ | AvatarBadge component - NEW |
| icon | ⚠️ | Use icon in AvatarFallback |

### 17. Badge / Tag

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| severities | ✅ | success, info, warning, destructive |
| sizes | ✅ | `size="sm/md/lg"` - NEW |
| pill/rounded | ✅ | `pill` prop - NEW |
| icon | ⚠️ | Pass as child |

### 18. Skeleton

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| shapes | ✅ | `shape="rectangle/circle/text"` - NEW |
| animation | ✅ | `animation="pulse/wave/none"` - NEW |
| card preset | ✅ | SkeletonCard - NEW |
| list preset | ✅ | SkeletonList - NEW |

### 19. Tooltip

| PrimeNG Feature | WEX Status | Notes |
|-----------------|------------|-------|
| basic | ✅ | Default |
| position | ✅ | `side` prop |
| delay | ✅ | `delayDuration` prop - NEW |
| template | ⚠️ | Custom content via children |

---

## Components Deferred to Future Phases

### Calendar / DatePicker
- Multi-month display
- Time picker mode
- Button bar (Today/Clear)
- Date range selection improvements

### Specialized Components
- Tree / TreeTable
- Timeline
- OrgChart
- Stepper / Steps
- MegaMenu
- Dock
- Terminal
- BlockUI

### Form Enhancements
- Float labels (requires significant CSS changes)
- InputNumber with buttons
- Password strength meter
- ColorPicker
- Rating
- Chips / Tag input
- MultiSelect with chips

---

## Migration Notes

### Using New Button Severities
```tsx
// PrimeNG style severities now available
<WexButton intent="success">Save</WexButton>
<WexButton intent="info">Info</WexButton>
<WexButton intent="warning">Warning</WexButton>
<WexButton intent="help">Help</WexButton>
<WexButton intent="contrast">Contrast</WexButton>
```

### Using Scrollable Tabs
```tsx
<Tabs defaultValue="tab1">
  <ScrollableTabsList>
    {tabs.map(tab => (
      <TabsTrigger key={tab.value} value={tab.value}>
        {tab.label}
      </TabsTrigger>
    ))}
  </ScrollableTabsList>
</Tabs>
```

### Using Avatar Group with Status
```tsx
<AvatarGroup max={3} size="md">
  <Avatar>
    <AvatarImage src="/user1.jpg" />
    <AvatarBadge status="online" />
  </Avatar>
  <Avatar>
    <AvatarImage src="/user2.jpg" />
    <AvatarBadge status="away" />
  </Avatar>
</AvatarGroup>
```

### Using Enhanced Pagination
```tsx
<div className="flex items-center justify-between">
  <PageReport currentPage={1} totalPages={10} totalItems={100} pageSize={10} />
  <RowsPerPage value={10} onChange={setPageSize} />
  <Pagination>
    <PaginationContent>
      <PaginationFirst />
      <PaginationPrevious />
      {/* page numbers */}
      <PaginationNext />
      <PaginationLast />
    </PaginationContent>
  </Pagination>
  <JumpToPage currentPage={1} totalPages={10} onPageChange={setPage} />
</div>
```

---

## Next Steps

1. **Phase 5**: Implement remaining form enhancements (float labels, specialized inputs)
2. **Phase 6**: Add missing overlay features (draggable dialogs, etc.)
3. **Phase 7**: Specialized data components (Tree, Timeline, etc.)
4. **Ongoing**: Update component documentation pages with new variant demos


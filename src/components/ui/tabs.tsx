import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

// ============================================================
// TabsList - Basic tab list
// ============================================================
const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-9 items-center justify-center rounded-lg p-1",
      "bg-muted border-b border-wex-tabs-divider",
      "text-wex-tabs-trigger-fg",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

// ============================================================
// ScrollableTabsList - Tab list with scroll arrows
// ============================================================
interface ScrollableTabsListProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.List> {}

const ScrollableTabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  ScrollableTabsListProps
>(({ className, children, ...props }, ref) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(false)

  const checkScroll = React.useCallback(() => {
    const el = scrollContainerRef.current
    if (el) {
      setCanScrollLeft(el.scrollLeft > 0)
      setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1)
    }
  }, [])

  React.useEffect(() => {
    checkScroll()
    const el = scrollContainerRef.current
    if (el) {
      el.addEventListener("scroll", checkScroll)
      const resizeObserver = new ResizeObserver(checkScroll)
      resizeObserver.observe(el)
      return () => {
        el.removeEventListener("scroll", checkScroll)
        resizeObserver.disconnect()
      }
    }
  }, [checkScroll])

  const scroll = (direction: "left" | "right") => {
    const el = scrollContainerRef.current
    if (el) {
      const scrollAmount = el.clientWidth * 0.5
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="relative flex items-center">
      {canScrollLeft && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 flex h-full items-center justify-center w-8 bg-gradient-to-r from-muted to-transparent hover:from-muted"
          aria-label="Scroll tabs left"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
      )}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide"
      >
        <TabsPrimitive.List
          ref={ref}
          className={cn(
            "inline-flex h-9 items-center p-1",
            "bg-muted border-b border-wex-tabs-divider",
            "text-wex-tabs-trigger-fg",
            className
          )}
          {...props}
        >
          {children}
        </TabsPrimitive.List>
      </div>
      {canScrollRight && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 flex h-full items-center justify-center w-8 bg-gradient-to-l from-muted to-transparent hover:from-muted"
          aria-label="Scroll tabs right"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      )}
    </div>
  )
})
ScrollableTabsList.displayName = "ScrollableTabsList"

// ============================================================
// TabsTrigger - Basic tab trigger
// ============================================================
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium transition-all",
      "text-wex-tabs-trigger-fg",
      "hover:bg-wex-tabs-trigger-hover-bg",
      "data-[state=active]:text-wex-tabs-trigger-active-fg",
      "data-[state=active]:bg-background data-[state=active]:shadow",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

// ============================================================
// ClosableTabsTrigger - Tab trigger with close button
// ============================================================
interface ClosableTabsTriggerProps
  extends React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> {
  onClose?: (value: string) => void
}

const ClosableTabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  ClosableTabsTriggerProps
>(({ className, children, value, onClose, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    value={value}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md pl-3 pr-1.5 py-1 text-sm font-medium transition-all gap-1.5",
      "text-wex-tabs-trigger-fg",
      "hover:bg-wex-tabs-trigger-hover-bg",
      "data-[state=active]:text-wex-tabs-trigger-active-fg",
      "data-[state=active]:bg-background data-[state=active]:shadow",
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-50",
      className
    )}
    {...props}
  >
    {children}
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation()
        onClose?.(value)
      }}
      className="rounded-sm opacity-70 hover:opacity-100 hover:bg-wex-tabs-trigger-hover-bg p-0.5 -mr-0.5"
      aria-label={`Close ${children} tab`}
    >
      <X className="h-3.5 w-3.5" />
    </button>
  </TabsPrimitive.Trigger>
))
ClosableTabsTrigger.displayName = "ClosableTabsTrigger"

// ============================================================
// TabsContent
// ============================================================
const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wex-tabs-focus-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, ScrollableTabsList, TabsTrigger, ClosableTabsTrigger, TabsContent }

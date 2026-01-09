import * as React from "react";
import { Calendar as CalendarRoot } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

/**
 * WexCalendar - WEX Design System Calendar Component
 *
 * Date picker calendar component supporting single, multiple, and range selection.
 * Simple pass-through wrapper for the vendor primitive.
 *
 * @example
 * const [date, setDate] = useState<Date | undefined>(new Date());
 * <WexCalendar
 *   mode="single"
 *   selected={date}
 *   onSelect={setDate}
 *   className="rounded-md border"
 * />
 */

export const WexCalendar = React.forwardRef<
  React.ElementRef<typeof CalendarRoot>,
  React.ComponentPropsWithoutRef<typeof CalendarRoot>
>(({ className, ...props }, ref) => (
  <CalendarRoot
    ref={ref}
    className={cn("wex-calendar", className)}
    {...props}
  />
));
WexCalendar.displayName = "WexCalendar";


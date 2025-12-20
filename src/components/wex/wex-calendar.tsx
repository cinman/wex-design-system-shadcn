import { Calendar } from "@/components/ui/calendar";

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

export const WexCalendar = Calendar;


import * as React from "react";
import {
  Table as TableRoot,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

/**
 * WexTable - WEX Design System Table Component
 *
 * Tabular data display with header, body, footer, and caption.
 * Uses namespace pattern: WexTable.Header, WexTable.Row, etc.
 *
 * @example
 * <WexTable>
 *   <WexTable.Caption>A list of invoices</WexTable.Caption>
 *   <WexTable.Header>
 *     <WexTable.Row>
 *       <WexTable.Head>Invoice</WexTable.Head>
 *       <WexTable.Head>Amount</WexTable.Head>
 *     </WexTable.Row>
 *   </WexTable.Header>
 *   <WexTable.Body>
 *     <WexTable.Row>
 *       <WexTable.Cell>INV001</WexTable.Cell>
 *       <WexTable.Cell>$250.00</WexTable.Cell>
 *     </WexTable.Row>
 *   </WexTable.Body>
 * </WexTable>
 */

const WexTableRoot = React.forwardRef<
  React.ElementRef<typeof TableRoot>,
  React.ComponentPropsWithoutRef<typeof TableRoot>
>(({ className, ...props }, ref) => (
  <TableRoot
    ref={ref}
    className={cn("wex-table", className)}
    {...props}
  />
));
WexTableRoot.displayName = "WexTable";

export const WexTable = Object.assign(WexTableRoot, {
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Head: TableHead,
  Row: TableRow,
  Cell: TableCell,
  Caption: TableCaption,
});


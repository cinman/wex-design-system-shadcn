import * as React from "react";
import {
  DataTable as DataTableRoot,
  DataTableColumnHeader,
  DataTableViewOptions,
  DataTablePagination,
  DataTableRowActions,
} from "@/components/ui/data-table";
import type { DataTableProps } from "@/components/ui/data-table";
import { cn } from "@/lib/utils";

/**
 * WexDataTable - WEX Design System Data Table Component
 *
 * Advanced table component with sorting, filtering, pagination, and column visibility.
 * Built on top of @tanstack/react-table.
 *
 * @example
 * const columns: ColumnDef<Data>[] = [
 *   {
 *     accessorKey: "name",
 *     header: ({ column }) => (
 *       <WexDataTable.ColumnHeader column={column} title="Name" />
 *     ),
 *   },
 * ];
 *
 * <WexDataTable columns={columns} data={data} searchKey="name" />
 */

export function WexDataTable<TData, TValue>({
  className,
  ...props
}: DataTableProps<TData, TValue> & { className?: string }) {
  return (
    <div className={cn("wex-data-table", className)}>
      <DataTableRoot {...props} />
    </div>
  );
}
export const WexDataTableColumnHeader = DataTableColumnHeader;
export const WexDataTablePagination = DataTablePagination;
export const WexDataTableViewOptions = DataTableViewOptions;
export const WexDataTableRowActions = DataTableRowActions;

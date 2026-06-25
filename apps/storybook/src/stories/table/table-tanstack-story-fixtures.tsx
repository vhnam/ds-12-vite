import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  type TableSortDirection,
} from "@ds-12/ui/table";

type InvoiceRow = {
  name: string;
  status: string;
  amount: number;
};

const INVOICE_DATA: InvoiceRow[] = [
  { name: "Acme Corp", status: "Active", amount: 1200 },
  { name: "Beta Ltd", status: "Pending", amount: 450 },
  { name: "Gamma Inc", status: "Active", amount: 9900 },
];

const columnHelper = createColumnHelper<InvoiceRow>();

const INVOICE_COLUMNS = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: "Status",
    enableSorting: false,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("amount", {
    header: "Amount",
    cell: (info) => `S$${info.getValue().toLocaleString()}`,
    sortingFn: "basic",
  }),
];

function toSortDirection(sorted: false | "asc" | "desc"): TableSortDirection | undefined {
  if (sorted === "asc") {
    return "ascending";
  }

  if (sorted === "desc") {
    return "descending";
  }

  return "none";
}

/** TanStack Table example — sorting is driven by column accessors (`name`, `amount`), not the header UI alone. */
export function TanStackSortableTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data: INVOICE_DATA,
    columns: INVOICE_COLUMNS,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table aria-label="Invoices">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => {
              const sorted = header.column.getIsSorted();
              const columnId = header.column.id;
              const align = columnId === "amount" ? "end" : "start";

              return (
                <TableHead
                  key={header.id}
                  align={align}
                  sortable={header.column.getCanSort()}
                  sortDirection={header.column.getCanSort() ? toSortDirection(sorted) : undefined}
                  onSort={header.column.getToggleSortingHandler()}
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              );
            })}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} interactive>
            {row.getVisibleCells().map((cell) => {
              const align = cell.column.id === "amount" ? "end" : "start";
              const value = cell.getValue();
              const text =
                cell.column.id === "amount" && typeof value === "number"
                  ? `S$${value.toLocaleString()}`
                  : String(value);

              return <TableCell key={cell.id} align={align} text={text} />;
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

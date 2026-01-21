"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  type ColumnDef,
  type FilterFn,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Inbox, Search, X } from "lucide-react"
import * as React from "react"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")

  const filteredData = React.useMemo(() => {
    if (!globalFilter) return data

    return data.filter((row) => {
      const search = globalFilter.toLowerCase()
      const rowObj = row as Record<string, unknown>
      const values = Object.values(rowObj).map((value) => {
        if (value === null || value === undefined) return ""
        if (typeof value === "object") return ""
        return String(value).toLowerCase()
      })
      return values.some((value) => value.includes(search))
    })
  }, [data, globalFilter])

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  })

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Search className="h-4 w-4 text-muted-foreground transition-colors duration-200 group-focus-within:text-primary" />
        </div>
        <Input
          placeholder="Buscar en todos los campos..."
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="pl-11 pr-11 h-11 w-full sm:w-[380px] border-2 bg-background/50 backdrop-blur-sm shadow-sm transition-all duration-200 focus-visible:border-primary focus-visible:shadow-md focus-visible:ring-2 focus-visible:ring-primary/20 focus-visible:bg-background hover:border-primary/50"
        />
        {globalFilter && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 h-7 w-7 -translate-y-1/2 rounded-full hover:bg-muted transition-all duration-200 hover:scale-110"
            onClick={() => setGlobalFilter("")}
          >
            <X className="h-3.5 w-3.5" />
            <span className="sr-only">Limpiar búsqueda</span>
          </Button>
        )}
        {globalFilter && (
          <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary/30 rounded-full animate-in fade-in duration-200" />
        )}
      </div>
      <div className="rounded-lg border-2 bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b bg-muted/30 hover:bg-muted/30">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="h-12 font-semibold">
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="transition-colors hover:bg-muted/50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-32">
                  <div className="flex flex-col items-center justify-center gap-3 text-center">
                    <div className="rounded-full bg-muted p-4">
                      <Inbox className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold text-foreground">
                        {globalFilter ? "No se encontraron resultados" : "No hay resultados"}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {globalFilter
                          ? "Intenta con otros términos de búsqueda."
                          : "No se encontraron elementos para mostrar."}
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-muted-foreground">
          Mostrando{" "}
          <span className="font-medium text-foreground">
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
          </span>{" "}
          a{" "}
          <span className="font-medium text-foreground">
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}
          </span>{" "}
          de{" "}
          <span className="font-medium text-foreground">
            {table.getFilteredRowModel().rows.length}
          </span>{" "}
          resultados
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className="transition-all"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm font-medium min-w-[100px] text-center">
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="transition-all"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className="transition-all"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

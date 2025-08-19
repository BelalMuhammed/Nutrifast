
"use client"

import { useId, useMemo, useRef, useState } from "react"
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  Columns3Icon,
  FilterIcon,
  ListFilterIcon,
  PlusIcon,
  TrashIcon,

} from "lucide-react"

import { LuSettings2 } from 'react-icons/lu';

import { cn } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Pagination, PaginationContent, PaginationItem } from "@/components/ui/pagination"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { HiPencil, HiTrash, HiBan, HiUserRemove, HiMailOpen, HiCheckCircle, HiXCircle, HiUserAdd } from "react-icons/hi";
import { deleteProduct } from "@/Redux/slices/productSlice";
import { useDispatch } from "react-redux";

export default function TableDashboard({ data: externalData = [], type, onDelete }) {
  const id = useId()
  const inputRef = useRef(null)

  const [data, setData] = useState(externalData)
  const [sorting, setSorting] = useState([])
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 })
  const [columnFilters, setColumnFilters] = useState([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const dispatch = useDispatch()
  const columns = useMemo(() => {
    if (!data.length) return []

    // generate dynamic columns
    const baseColumns = Object.keys(data[0]).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell: ({ getValue, row }) => (
        <div className="flex items-center gap-2">
          {key === "id" && (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
            />
          )}
          <span>{getValue()?.toString()}</span>
        </div>
      ),
    }))

    // ✅ add action column depending on type
    const actionColumn = {
      header: "Actions",
      cell: ({ row }) => {
        if (type === "products") {
          return (
            <div className="flex gap-3 text-lg">
              <HiPencil
                title="Edit product"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => console.log("Edit product", row.original)}
              />
              <HiTrash
                title="Delete product"
                className="cursor-pointer text-red-500 hover:text-red-700"

                onClick={() => onDelete(row.original.id)}
              />
            </div>
          );
        } else if (type === "users") {
          return (
            <div className="flex gap-3 text-lg">
              <HiBan
                title="Block user"
                className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                onClick={() => console.log("Block user", row.original.id)}
              />
              <HiUserRemove
                title="Remove user"
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => console.log("Remove user", row.original.id)}
              />
            </div>
          );
        } else if (type === "orders") {
          return (
            <div className="flex gap-3 text-lg">
              <HiUserRemove
                title="Remove user"
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => console.log("Remove user", row.original.id)}
              />
              <LuSettings2
                title="Change status"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => console.log("Change order status", row.original.id)}
              />
            </div>
          );
        } else if (type === "messages") {
          return (
            <div className="flex gap-3 text-lg">
              <HiMailOpen
                title="View message"
                className="cursor-pointer text-green-500 hover:text-green-700"
                onClick={() => console.log("View message", row.original.id)}
              />
              <HiTrash
                title="Delete message"
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => console.log("Delete message", row.original.id)}
              />
            </div>
          );
        } else if (type === "vendorApplications") {
          return (
            <div className="flex gap-3 text-lg">
              <HiCheckCircle
                title="Approve vendor"
                className="cursor-pointer text-green-500 hover:text-green-700"
                onClick={() => console.log("Approve vendor", row.original.id)}
              />
              <HiXCircle
                title="Reject vendor"
                className="cursor-pointer text-red-500 hover:text-red-700"
                onClick={() => console.log("Reject vendor", row.original.id)}
              />
            </div>
          );
        } else if (type === "vendors") {
          return (
            <div className="flex gap-3 text-lg">
              <HiUserAdd
                title="Activate vendor"
                className="cursor-pointer text-blue-500 hover:text-blue-700"
                onClick={() => console.log("Activate vendor", row.original.id)}
              />
              <HiBan
                title="Suspend vendor"
                className="cursor-pointer text-yellow-500 hover:text-yellow-700"
                onClick={() => console.log("Suspend vendor", row.original.id)}
              />
            </div>
          );
        }
        return null;
      },
    };
    // const actionColumn = {
    //   header: "Actions",
    //   cell: ({ row }) => {
    //     if (type === "products") {
    //       return (
    //         <div className="flex gap-3 text-lg">
    //           <HiPencil
    //             title="Edit product"
    //             className="cursor-pointer text-blue-500 hover:text-blue-700"
    //             onClick={() => console.log("Edit product", row.original)}
    //           />
    //           <HiTrash
    //             title="Delete product"
    //             className="cursor-pointer text-red-500 hover:text-red-700"
    //             onClick={() => console.log("Delete product", row.original.id)}
    //           />
    //         </div>
    //       );
    //     } else if (type === "users") {
    //       return (
    //         <div className="flex gap-3 text-lg">
    //           <HiBan
    //             title="Block user"
    //             className="cursor-pointer text-yellow-500 hover:text-yellow-700"
    //             onClick={() => console.log("Block user", row.original.id)}
    //           />
    //           <HiUserRemove
    //             title="Remove user"
    //             className="cursor-pointer text-red-500 hover:text-red-700"
    //             onClick={() => console.log("Remove user", row.original.id)}
    //           />
    //         </div>
    //       )
    //     } else if (type === "orders") {
    //       return (
    //         <div className="flex gap-3 text-lg">
    //           <HiUserRemove
    //             title="Remove user"
    //             className="cursor-pointer text-red-500 hover:text-red-700"
    //             onClick={() => console.log("Remove user", row.original.id)}
    //           />

    //           <LuSettings2
    //             title="Status"
    //             className="cursor-pointer text-blue-500 hover:text-blue-700"
    //             onClick={() => console.log("Remove user", row.original.id)}
    //           />
    //         </div>

    //       )

    //     }
    //     return null;
    //   },
    // };

    return [...baseColumns, actionColumn]
  }, [data, type])


  // delete selected rows
  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    )
    setData(updatedData)
    table.resetRowSelection()
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: { sorting, pagination, columnFilters, columnVisibility },
  })

  // pick the best column to filter on depending on type
  const filterKeyMap = {
    products: "name",
    orders: "name",
    users: "name",
    vendors: "name",
    messages: "message", // or "subject" / whatever field you have
  };

  // fallback if type not listed
  const filterKey = filterKeyMap[type] || Object.keys(data[0] || {})[0];
  const validFilterKey = data.length && data[0][filterKey] !== undefined
    ? filterKey
    : Object.keys(data[0] || {})[0];
  return (

    <div className="space-y-4 pt-20">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className="peer min-w-60 ps-9"
            value={table.getColumn(filterKey)?.getFilterValue() ?? ""}
            onChange={(e) => table.getColumn(filterKey)?.setFilterValue(e.target.value)}
            placeholder={`Filter by ${filterKey}...`}
          />
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground/80">
            <ListFilterIcon size={16} />
          </div>
          {Boolean(table.getColumn(filterKey)?.getFilterValue()) && (
            <button
              onClick={() => {
                table.getColumn(filterKey)?.setFilterValue("")
                inputRef.current?.focus()
              }}
              className="absolute inset-y-0 end-0 flex w-9 items-center justify-center"
            >
              <CircleXIcon size={16} />
            </button>
          )}
        </div>

        {/* column toggle */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Columns3Icon size={16} className="opacity-60" /> View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            {table.getAllColumns()
              .filter((col) => col.getCanHide())
              .map((col) => (
                <DropdownMenuCheckboxItem
                  key={col.id}
                  checked={col.getIsVisible()}
                  onCheckedChange={(value) => col.toggleVisibility(!!value)}
                >
                  {col.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* extra filter popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <FilterIcon size={16} /> Filters
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <Label>Status</Label>
            <Select
              onValueChange={(val) => table.getColumn("status")?.setFilterValue(val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </PopoverContent>
        </Popover>
      </div>

      {/* Delete / Add */}
      <div className="flex items-center gap-3">
        {table.getSelectedRowModel().rows.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <TrashIcon size={16} /> Delete {table.getSelectedRowModel().rows.length}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will delete {table.getSelectedRowModel().rows.length} rows permanently.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteRows}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
        <Button variant="outline" className="ml-auto">
          <PlusIcon size={16} /> Add item
        </Button>
      </div>

      {/* Table (desktop only) */}
      <div className="overflow-x-auto rounded-md border border-[#1b1b1b] p-4 hidden md:block">
        <Table className="min-w-full border-collapse">
          <TableHeader>
            {table.getHeaderGroups().map((hg) => (
              <TableRow key={hg.id}>
                {hg.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="whitespace-nowrap px-4 text-sm"
                    style={{ width: `${header.getSize()}px` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-4 py-4 text-sm"
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-4">
                  <CircleAlertIcon className="inline mr-2" size={16} /> No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile cards */}
      <div className="space-y-4 md:hidden">
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row) => (
            <div
              key={row.id}
              className="border rounded-lg p-4 shadow-sm bg-white"
              data-state={row.getIsSelected() && "selected"}
            >
              {row.getVisibleCells().map((cell) => (
                <div key={cell.id} className="flex justify-between py-2 border-b border-[#e3e3e3] last:border-0">
                  <span className="font-medium text-gray-600">
                    {flexRender(cell.column.columnDef.header, cell.getContext())}
                  </span>
                  <span>{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <CircleAlertIcon className="inline mr-2" size={16} /> No results.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Select
          value={String(table.getState().pagination.pageSize)}
          onValueChange={(val) => table.setPageSize(Number(val))}
        >
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {[5, 10, 20].map((size) => (
              <SelectItem key={size} value={String(size)}>
                {size} rows
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Pagination>
          <PaginationContent className="flex gap-2 items-center">
            <PaginationItem>
              <Button
                variant="outline"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>
            <span className="text-sm">
              Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
            </span>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button
                variant="outline"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>

  )
}


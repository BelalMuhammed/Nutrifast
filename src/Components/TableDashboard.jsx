"use client";

import { useId, useMemo, useRef, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

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
} from "lucide-react";

import { LuSettings2 } from "react-icons/lu";
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
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  HiPencil,
  HiTrash,
  HiBan,
  HiUserRemove,
  HiMailOpen,
  HiCheckCircle,
  HiXCircle,
  HiUserAdd,
} from "react-icons/hi";
import { useNavigate } from "react-router-dom";
// import { deleteProduct } from "@/Redux/slices/productSlice";
// import { useDispatch } from "react-redux";

export default function TableDashboard({
  data: externalData = [],
  type,
  onDelete,
}) {
  const id = useId();
  const inputRef = useRef(null);

  const [data, setData] = useState(externalData);
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const columns = useMemo(() => {
    if (!data.length) return [];

    // generate dynamic columns
    const baseColumns = Object.keys(data[0]).map((key) => ({
      header: key.charAt(0).toUpperCase() + key.slice(1),
      accessorKey: key,
      cell: ({ getValue, row }) => (
        <div className='flex items-center gap-3'>
          {key === "id" && (
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(v) => row.toggleSelected(!!v)}
              className='border-2 border-gray-300 data-[state=checked]:bg-app-primary data-[state=checked]:border-app-primary rounded'
            />
          )}
          <span className='font-medium text-gray-800'>
            {getValue()?.toString()}
          </span>
        </div>
      ),
    }));

    //  add action column depending on type
    const actionColumn = {
      header: "Actions",
      cell: ({ row }) => {
        if (type === "products") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='Edit product'
                className='p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Edit product", row.original)}>
                <HiPencil size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Delete product'
                className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500  transition-all duration-300 shadow-sm'
                onClick={() => onDelete(row.original.id)}>
                <HiTrash size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        } else if (type === "users") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='Block user'
                className='p-1.5 sm:p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Block user", row.original.id)}>
                <HiBan size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Remove user'
                className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Remove user", row.original.id)}>
                <HiUserRemove size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        } else if (type === "orders") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='Remove order'
                className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Remove order", row.original.id)}>
                <HiUserRemove size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Change status'
                className='p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500  transition-all duration-300 shadow-sm'
                onClick={() =>
                  console.log("Change order status", row.original.id)
                }>
                <LuSettings2 size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        } else if (type === "messages") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='View message'
                className='p-1.5 sm:p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("View message", row.original.id)}>
                <HiMailOpen size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Delete message'
                className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Delete message", row.original.id)}>
                <HiTrash size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        } else if (type === "vendorApplications") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='Approve vendor'
                className='p-1.5 sm:p-2 rounded-lg bg-green-50 text-green-600 hover:bg-green-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Approve vendor", row.original.id)}>
                <HiCheckCircle size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Reject vendor'
                className='p-1.5 sm:p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Reject vendor", row.original.id)}>
                <HiXCircle size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        } else if (type === "vendors") {
          return (
            <div className='flex gap-1 sm:gap-2'>
              <button
                title='Activate vendor'
                className='p-1.5 sm:p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Activate vendor", row.original.id)}>
                <HiUserAdd size={14} className='sm:w-4 sm:h-4' />
              </button>
              <button
                title='Suspend vendor'
                className='p-1.5 sm:p-2 rounded-lg bg-yellow-50 text-yellow-600 hover:bg-yellow-500  transition-all duration-300 shadow-sm'
                onClick={() => console.log("Suspend vendor", row.original.id)}>
                <HiBan size={14} className='sm:w-4 sm:h-4' />
              </button>
            </div>
          );
        }
        return null;
      },
    };

    return [...baseColumns, actionColumn];
  }, [data, type, onDelete]);

  // delete selected rows
  const handleDeleteRows = () => {
    const selectedRows = table.getSelectedRowModel().rows;
    const updatedData = data.filter(
      (item) => !selectedRows.some((row) => row.original.id === item.id)
    );
    setData(updatedData);
    table.resetRowSelection();
  };

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
  });

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
  const validFilterKey =
    data.length && data[0][filterKey] !== undefined
      ? filterKey
      : Object.keys(data[0] || {})[0];

  return (
    <div className='space-y-6 bg-gradient-to-br  via-white  min-h-screen pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-6 lg:px-8'>
      {/* Header Section */}
      <div className='flex   justify-between   w-full bg-gradient-to-r from-app-primary to-app-secondary rounded-xl sm:rounded-2xl p-4 sm:p-6  shadow-sm'>
        <div className=" ">
          <h2 className='text-xl sm:text-2xl font-bold mb-2'>
            {type.charAt(0).toUpperCase() + type.slice(1)} Management
          </h2>
          <p className=' text-sm sm:text-base'>
            Manage your {type} efficiently with advanced filtering and actions
          </p>
        </div>

        {type === "products" ? <Button
          onClick={() => { navigate("/dashboard/addProducts") }}
          variant='outline'
          className='w-full mt-auto sm:w-auto bg-app-primary text-white border-2 border-app-primary hover:bg-app-secondary hover:border-app-secondary transition-all duration-300 font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 shadow-sm text-sm sm:text-base'>
          <PlusIcon size={14} className='mr-2 sm:w-4 sm:h-4' />
          Add New {type.slice(0, -1)}
        </Button> : ""}
      </div>

      {/* Filters Section */}
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm  border border-gray-100 p-4 sm:p-6'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          <div className='relative flex-1 min-w-0'>
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className='w-full pl-10 sm:pl-12 pr-10 py-2.5 sm:py-3 bg-gray-50 border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-app-primary focus:bg-white transition-all duration-300 text-sm sm:text-base font-medium placeholder-gray-400'
              value={table.getColumn(validFilterKey)?.getFilterValue() ?? ""}
              onChange={(e) =>
                table.getColumn(validFilterKey)?.setFilterValue(e.target.value)
              }
              placeholder={`Search ${type}...`}
            />
            <div className='absolute inset-y-0 left-0 flex items-center pl-3 sm:pl-4 text-gray-400'>
              <ListFilterIcon size={16} className='sm:w-5 sm:h-5' />
            </div>
            {Boolean(table.getColumn(validFilterKey)?.getFilterValue()) && (
              <button
                onClick={() => {
                  table.getColumn(validFilterKey)?.setFilterValue("");
                  inputRef.current?.focus();
                }}
                className='absolute inset-y-0 right-0 flex w-10 items-center justify-center text-gray-400 hover:text-red-500 transition-colors'>
                <CircleXIcon size={16} className='sm:w-5 sm:h-5' />
              </button>
            )}


          </div>

          <div className='flex flex-col sm:flex-row gap-3 w-full lg:w-auto'>
            {/* Column Visibility Toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  transition-all duration-300 font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base'>
                  <Columns3Icon size={14} className='mr-2 sm:w-4 sm:h-4' />
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align='end'
                className='bg-white rounded-xl shadow-xl border border-gray-100 p-2 w-64'>
                <DropdownMenuLabel className='font-bold text-app-tertiary px-3 py-2 text-sm sm:text-base'>
                  Toggle columns
                </DropdownMenuLabel>
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => (
                    <DropdownMenuCheckboxItem
                      key={col.id}
                      checked={col.getIsVisible()}
                      onCheckedChange={(value) => col.toggleVisibility(!!value)}
                      className='rounded-lg hover:bg-gray-50 px-3 py-2 cursor-pointer text-sm'>
                      {col.id}
                    </DropdownMenuCheckboxItem>
                  ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Advanced Filters */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className='w-full sm:w-auto bg-white border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  transition-all duration-300 font-semibold rounded-lg sm:rounded-xl px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base'>
                  <FilterIcon size={14} className='mr-2 sm:w-4 sm:h-4' />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className='bg-white rounded-xl shadow-xl border border-gray-100 p-4 w-64'>
                <div className='space-y-4'>
                  <Label className='text-app-tertiary font-semibold text-sm sm:text-base'>
                    Status Filter
                  </Label>
                  <Select
                    onValueChange={(val) =>
                      table.getColumn("status")?.setFilterValue(val)
                    }>
                    <SelectTrigger className='rounded-xl border-2 border-gray-200 focus:border-app-primary text-sm sm:text-base'>
                      <SelectValue placeholder='Select status' />
                    </SelectTrigger>
                    <SelectContent className='bg-white rounded-xl shadow-xl border border-gray-100'>
                      <SelectItem
                        value='active'
                        className='hover:bg-gray-50 rounded-lg text-sm sm:text-base'>
                        Active
                      </SelectItem>
                      <SelectItem
                        value='inactive'
                        className='hover:bg-gray-50 rounded-lg text-sm sm:text-base'>
                        Inactive
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>



      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 overflow-hidden'>
        {/* ✅ Table Container with Horizontal Scroll */}
        <div className='overflow-x-auto w-full hidden lg:block'>
          <Table className='overflow-x-auto min-w-[900px] table-fixed'>
            <TableHeader>
              {table.getHeaderGroups().map((hg) => (
                <TableRow
                  key={hg.id}
                  className='bg-gradient-to-r border-b-2 border-gray-200'>
                  {hg.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-left text-xs sm:text-sm font-bold text-app-tertiary uppercase tracking-wider border-r border-gray-200 last:border-r-0 whitespace-nowrap'
                      style={{
                        width: header.getSize()
                          ? `${header.getSize()}px`
                          : "auto",
                        minWidth: header.id === "Actions" ? "120px" : "150px",
                      }}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className='divide-y divide-gray-200'>
              {table.getRowModel().rows.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`hover:bg-gradient-to-r hover:from-app-primary/5 hover:to-app-secondary/5 transition-all duration-300 ${row.getIsSelected()
                      ? "bg-gradient-to-r from-app-primary/10 to-app-secondary/10"
                      : index % 2 === 0
                        ? "bg-white"
                        : "bg-gray-50/50"
                      }`}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className='px-3 sm:px-4 lg:px-6 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 border-r border-gray-100 last:border-r-0 overflow-hidden'>
                        <div
                          className='truncate max-w-xs lg:max-w-none'
                          title={cell.getValue()?.toString()}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </div>
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='text-center py-8 sm:py-12 text-gray-500'>
                    <div className='flex flex-col items-center gap-3'>
                      <CircleAlertIcon className='w-8 h-8 sm:w-12 sm:h-12 text-gray-300' />
                      <div>
                        <p className='text-base sm:text-lg font-semibold text-gray-600'>
                          No {type} found
                        </p>
                        <p className='text-xs sm:text-sm text-gray-400'>
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Scroll Indicator for Mobile */}
        <div className='md:hidden bg-gray-50 px-4 py-2 text-center'>
          <p className='text-xs text-gray-500'>← Swipe to see more columns →</p>
        </div>
      </div>


      {/* Mobile cards */}
      <div className='space-y-3 sm:space-y-4 lg:hidden px-2 sm:px-0'>
        {table.getRowModel().rows.length ? (
          table.getRowModel().rows.map((row, index) => (
            <div
              key={row.id}
              className={`rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm border-2 transition-all duration-300 ${row.getIsSelected()
                ? "border-app-primary bg-gradient-to-r from-app-primary/10 to-app-secondary/10"
                : "border-gray-100 bg-white hover:border-gray-200 hover:shadow-xl"
                }`}
              data-state={row.getIsSelected() && "selected"}>
              {/* Card Header */}
              <div className='flex items-center justify-between mb-3 sm:mb-4 pb-2 sm:pb-3 border-b border-gray-100'>
                <div className='flex items-center gap-2 sm:gap-3'>
                  <div
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${row.getIsSelected() ? "bg-app-primary" : "bg-gray-300"
                      }`}></div>
                  <span className='text-xs sm:text-sm font-semibold text-app-tertiary'>
                    Item #{index + 1}
                  </span>
                </div>
                {row.getIsSelected() && (
                  <span className='text-xs bg-app-primary text-white px-2 py-1 rounded-full'>
                    Selected
                  </span>
                )}
              </div>

              {/* Card Content */}
              <div className='space-y-2 sm:space-y-3'>
                {row.getVisibleCells().map((cell, cellIndex) => (
                  <div
                    key={cell.id}
                    className='flex flex-col sm:flex-row sm:justify-between sm:items-center py-1.5 sm:py-2 gap-1 sm:gap-0'>
                    <span className='font-semibold text-gray-600 text-xs sm:text-sm'>
                      {flexRender(
                        cell.column.columnDef.header,
                        cell.getContext()
                      )}
                      :
                    </span>
                    <span className='text-gray-900 font-medium text-xs sm:text-sm break-words'>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </span>
                    {cellIndex < row.getVisibleCells().length - 1 && (
                      <hr className='sm:hidden border-gray-100 mt-1.5' />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className='text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 mx-2 sm:mx-0'>
            <div className='flex flex-col items-center gap-3 sm:gap-4'>
              <CircleAlertIcon className='w-12 h-12 sm:w-16 sm:h-16 text-gray-300' />
              <div>
                <p className='text-base sm:text-lg font-semibold text-gray-600'>
                  No {type} found
                </p>
                <p className='text-xs sm:text-sm text-gray-400'>
                  Try adjusting your search or filters
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className='bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between gap-4'>
          {/* Page Size Selector */}
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3'>
            <span className='text-xs sm:text-sm font-semibold text-gray-600'>
              Show:
            </span>
            <Select
              value={String(table.getState().pagination.pageSize)}
              onValueChange={(val) => table.setPageSize(Number(val))}>
              <SelectTrigger className='w-full sm:w-32 rounded-lg sm:rounded-xl border-2 border-gray-200 focus:border-app-primary text-sm'>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className='bg-white rounded-xl shadow-xl border border-gray-100'>
                {[5, 10, 20].map((size) => (
                  <SelectItem
                    key={size}
                    value={String(size)}
                    className='hover:bg-gray-50 rounded-lg text-sm'>
                    {size} rows
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className='text-xs sm:text-sm text-gray-500'>per page</span>
          </div>

          {/* Page Info */}
          <div className='text-xs sm:text-sm text-gray-600 bg-gray-50 px-3 sm:px-4 py-2 rounded-lg text-center order-3 lg:order-2'>
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}{" "}
            to{" "}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
              table.getState().pagination.pageSize,
              table.getFilteredRowModel().rows.length
            )}{" "}
            of {table.getFilteredRowModel().rows.length} entries
          </div>

          {/* Pagination Controls */}
          <div className='order-2 lg:order-3'>
            <Pagination>
              <PaginationContent className='flex flex-wrap justify-center lg:justify-end gap-1 sm:gap-2 items-center'>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                    className='rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 p-2 sm:px-3 sm:py-2'>
                    <ChevronFirstIcon size={14} className='sm:w-4 sm:h-4' />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className='rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 p-2 sm:px-3 sm:py-2'>
                    <ChevronLeftIcon size={14} className='sm:w-4 sm:h-4' />
                  </Button>
                </PaginationItem>

                <div className='px-2 sm:px-4 py-1.5 sm:py-2 bg-app-primary text-white rounded-lg sm:rounded-xl font-semibold shadow-sm text-xs sm:text-sm whitespace-nowrap'>
                  Page {table.getState().pagination.pageIndex + 1} of{" "}
                  {table.getPageCount()}
                </div>

                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className='rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 p-2 sm:px-3 sm:py-2'>
                    <ChevronRightIcon size={14} className='sm:w-4 sm:h-4' />
                  </Button>
                </PaginationItem>
                <PaginationItem>
                  <Button
                    variant='outline'
                    size='sm'
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                    className='rounded-lg sm:rounded-xl border-2 border-gray-200 hover:border-app-primary hover:bg-app-primary  disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 p-2 sm:px-3 sm:py-2'>
                    <ChevronLastIcon size={14} className='sm:w-4 sm:h-4' />
                  </Button>
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}

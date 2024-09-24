"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, ArrowUp, ArrowDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { formatDateManually } from "@/utils/formatDate" // Import the manual formatting function

export type User = {
  name: string
  surname: string
  number: string
  gender: string
  country: string
  dependants: number
  birthDate: Date
}

const createSortableHeader = (header: string, accessorKey: string, isDateColumn = false) => {
  return ({ column }: { column: any }) => {
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        {header}
        {isDateColumn ? (
          column.getIsSorted() === "asc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )
        ) : (
          column.getIsSorted() === "asc" ? (
            <ArrowUp className="ml-2 h-4 w-4" />
          ) : column.getIsSorted() === "desc" ? (
            <ArrowDown className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )
        )}
      </Button>
    )
  }
}

const sortBirthDate = (a: Date, b: Date) => {
  return b.getTime() - a.getTime(); // Reverse order for most recent first
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: createSortableHeader("Name", "name"),
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "surname",
    header: createSortableHeader("Surname", "surname"),
    cell: ({ row }) => <div className="capitalize">{row.getValue("surname")}</div>,
  },
  {
    accessorKey: "number",
    header: createSortableHeader("Number", "number"),
    cell: ({ row }) => <div>{row.getValue("number")}</div>,
  },
  {
    accessorKey: "gender",
    header: createSortableHeader("Gender", "gender"),
    cell: ({ row }) => <div>{row.getValue("gender")}</div>,
  },
  {
    accessorKey: "country",
    header: createSortableHeader("Country", "country"),
    cell: ({ row }) => <div>{row.getValue("country")}</div>,
  },
  {
    accessorKey: "dependants",
    header: createSortableHeader("Dependants", "dependants"),
    cell: ({ row }) => <div>{row.getValue("dependants")}</div>,
  },
  {
    accessorKey: "birthDate",
    header: createSortableHeader("Birth Date", "birthDate", true),
    cell: ({ row }) => <div>{formatDateManually(row.getValue("birthDate"))}</div>, // Format the Date object
    sortingFn: (rowA, rowB, columnId) => {
      const a = rowA.getValue(columnId) as Date;
      const b = rowB.getValue(columnId) as Date;
      return sortBirthDate(a, b);
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const user = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.number)}
            >
              Copy user number
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user.birthDate.toISOString())}
            >
              Copy user birth date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
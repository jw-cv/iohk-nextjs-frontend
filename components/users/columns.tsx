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
import { User } from '@/hooks/useUsers';

const createSortableHeader = (header: string, accessorKey: string, isDateColumn = false) => {
  const SortableHeader = ({ column }: { column: { getIsSorted: () => boolean | "asc" | "desc"; toggleSorting: (descending?: boolean) => void } }) => {
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
  SortableHeader.displayName = `SortableHeader_${header}`;
  return SortableHeader;
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
    cell: ({ row }) => {
      const gender = row.getValue("gender") as string;
      return <div>{gender.charAt(0).toUpperCase() + gender.slice(1).toLowerCase()}</div>;
    },
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
    header: createSortableHeader("Birth Date", "birthDate"),
    cell: ({ row }) => formatDateManually(new Date(row.getValue("birthDate"))),
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
              onClick={() => navigator.clipboard.writeText(user.number.toString())}
            >
              Copy user number
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(formatDateManually(new Date(user.birthDate)))}
            >
              Copy user birth date
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
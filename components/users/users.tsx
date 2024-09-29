import { DataTable } from "@/components/users/data-table"
import { columns } from "@/components/users/columns"
import { useUserContext } from "@/components/users/user-context"

export function Users() {
  const { 
    data, 
    sorting, 
    setSorting, 
    columnFilters, 
    setColumnFilters, 
    columnVisibility, 
    setColumnVisibility, 
    rowSelection, 
    setRowSelection, 
    globalFilter, 
    setGlobalFilter 
  } = useUserContext()

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={data}
        sorting={sorting}
        setSorting={setSorting}
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        columnVisibility={columnVisibility}
        setColumnVisibility={setColumnVisibility}
        rowSelection={rowSelection}
        setRowSelection={setRowSelection}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  )
}
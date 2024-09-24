import { useUserContext } from '@/components/users/user-context';
import { columns } from './columns';
import { DataTable } from './data-table';

export function Users() {
  const { data, sorting, setSorting, columnFilters, setColumnFilters, columnVisibility, setColumnVisibility, rowSelection, setRowSelection, globalFilter, setGlobalFilter } = useUserContext();

  return (
    <div className="container mx-auto py-6">
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
  );
}
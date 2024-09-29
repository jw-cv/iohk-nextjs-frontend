import { useState, useEffect } from 'react';
import { Customer } from "@/models/Customer";
import { SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table";

// Update the User type to match Customer
export type User = {
  id: string;
  name: string;
  surname: string;
  number: number; // Change this to number
  gender: string;
  country: string;
  dependants: number;
  birthDate: string;
};

export function useUsers() {
  const [data, setData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Add these new state variables
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    name: true,
    surname: true,
    number: false,
    gender: false,
    country: false,
    dependants: false,
    birthDate: false,
  });
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');
  const [selectedGender, setSelectedGender] = useState<string | undefined>(undefined);
  const [selectedDateRange, setSelectedDateRange] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });

  const setDateRange = (value: string) => {
    switch (value) {
      case 'since-2000':
        setSelectedDateRange({ start: new Date('2000-01-01'), end: null });
        break;
      case '1990-1999':
        setSelectedDateRange({ start: new Date('1990-01-01'), end: new Date('1999-12-31') });
        break;
      case '1980-1989':
        setSelectedDateRange({ start: new Date('1980-01-01'), end: new Date('1989-12-31') });
        break;
      case 'before-1980':
        setSelectedDateRange({ start: null, end: new Date('1979-12-31') });
        break;
      default:
        setSelectedDateRange({ start: null, end: null });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const processedData = await response.json();
        setData(processedData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    data,
    setData,
    loading,
    error,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter,
    selectedGender,
    setSelectedGender,
    selectedDateRange,
    setDateRange
  };
}
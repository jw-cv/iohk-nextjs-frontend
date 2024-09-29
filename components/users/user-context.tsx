"use client"

import React, { createContext, useContext, ReactNode } from 'react';
import { useUsers } from '@/hooks/useUsers';
import { SortingState, ColumnFiltersState, VisibilityState } from "@tanstack/react-table";
import { Customer } from '@/models/Customer'; // Import Customer instead of User

interface UserContextType {
  data: Customer[]; // Change this to Customer[]
  setData: React.Dispatch<React.SetStateAction<Customer[]>>; // Change this to Customer[]
  sorting: SortingState;
  setSorting: React.Dispatch<React.SetStateAction<SortingState>>;
  columnFilters: ColumnFiltersState;
  setColumnFilters: React.Dispatch<React.SetStateAction<ColumnFiltersState>>;
  columnVisibility: VisibilityState;
  setColumnVisibility: React.Dispatch<React.SetStateAction<VisibilityState>>;
  rowSelection: Record<string, boolean>;
  setRowSelection: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  // Add these new properties
  selectedGender: string | undefined;
  setSelectedGender: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedDateRange: { start: Date | null; end: Date | null };
  setDateRange: (value: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    data,
    setData,
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
  } = useUsers();

  return (
    <UserContext.Provider
      value={{
        data,
        setData,
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
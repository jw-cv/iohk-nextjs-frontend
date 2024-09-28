"use client"

import React, { createContext, useContext, useState } from 'react';
import { useUsers, User } from '@/hooks/useUsers';

type SortingState = { id: string; desc: boolean }[];
type ColumnFiltersState = { id: string; value: unknown }[];
type VisibilityState = { [key: string]: boolean };

type UserContextType = {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
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
  selectedGender: string | undefined;
  setSelectedGender: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedDateRange: string | undefined;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data, setData } = useUsers();
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
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState<Record<string, boolean>>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedDateRange, setSelectedDateRange] = useState<string | undefined>();

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
        setSelectedDateRange,
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
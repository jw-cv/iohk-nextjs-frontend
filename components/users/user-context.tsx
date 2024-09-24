"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  name: string;
  surname: string;
  number: string;
  gender: string;
  country: string;
  dependants: number;
  birthDate: string;
};

type UserContextType = {
  data: User[];
  setData: React.Dispatch<React.SetStateAction<User[]>>;
  sorting: any;
  setSorting: React.Dispatch<React.SetStateAction<any>>;
  columnFilters: any;
  setColumnFilters: React.Dispatch<React.SetStateAction<any>>;
  columnVisibility: any;
  setColumnVisibility: React.Dispatch<React.SetStateAction<any>>;
  rowSelection: any;
  setRowSelection: React.Dispatch<React.SetStateAction<any>>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
  selectedGender: string | undefined;
  setSelectedGender: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectedDateRange: string | undefined;
  setSelectedDateRange: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<User[]>([]);
  const [sorting, setSorting] = useState<any>([]);
  const [columnFilters, setColumnFilters] = useState<any>([]);
  const [columnVisibility, setColumnVisibility] = useState<any>({
    name: true,
    surname: true,
    number: false,
    gender: false,
    country: false,
    dependants: false,
    birthDate: false,
    actions: true,
  });
  const [rowSelection, setRowSelection] = useState<any>({});
  const [globalFilter, setGlobalFilter] = useState<string>('');
  const [selectedGender, setSelectedGender] = useState<string | undefined>();
  const [selectedDateRange, setSelectedDateRange] = useState<string | undefined>();

  useEffect(() => {
    // Fetch data from GraphQL API
    const fetchData = async () => {
      const response = await fetch('http://localhost:8080/graphql', { // Updated URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query {
              users {
                name
                surname
                number
                gender
                country
                dependants
                birthDate
              }
            }
          `,
        }),
      });
      const { data } = await response.json();
      setData(data.users);
    };

    fetchData();
  }, []);

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
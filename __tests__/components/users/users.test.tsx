import React from 'react';
import { render, screen } from '@testing-library/react';
import { Users } from '@/components/users/users'; // Update this import
import { UserProvider } from '@/components/users/user-context'; // Update this import
import { useUserContext } from '@/components/users/user-context'; // Update this import

// Mock the DataTable component
jest.mock('@/components/users/data-table', () => ({
  DataTable: jest.fn(() => <div data-testid="data-table">Mocked DataTable</div>),
}));

// Mock the columns
jest.mock('@/components/users/columns', () => ({
  columns: [],
}));

// Mock the useUserContext hook
jest.mock('@/components/users/user-context', () => ({
  ...jest.requireActual('@/components/users/user-context'),
  useUserContext: jest.fn(() => ({
    data: [],
    sorting: [],
    setSorting: jest.fn(),
    columnFilters: [],
    setColumnFilters: jest.fn(),
    columnVisibility: {},
    setColumnVisibility: jest.fn(),
    rowSelection: {},
    setRowSelection: jest.fn(),
    globalFilter: '',
    setGlobalFilter: jest.fn(),
  })),
}));

import { DataTable } from '@/components/users/data-table';

describe('Users component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with empty data', () => {
    const emptyContextData = {
      data: [],
      sorting: [],
      setSorting: jest.fn(),
      columnFilters: [],
      setColumnFilters: jest.fn(),
      columnVisibility: {},
      setColumnVisibility: jest.fn(),
      rowSelection: {},
      setRowSelection: jest.fn(),
      globalFilter: '',
      setGlobalFilter: jest.fn(),
    };

    (useUserContext as jest.Mock).mockReturnValue(emptyContextData);

    render(
      <UserProvider>
        <Users />
      </UserProvider>
    );

    expect(DataTable).toHaveBeenCalled();
    const dataTable = screen.getByTestId('data-table');
    expect(dataTable).toBeInTheDocument();
  });
});
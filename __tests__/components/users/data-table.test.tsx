import React from 'react';
import { render, screen, fireEvent, within, waitFor } from '@testing-library/react';
import { DataTable } from '../../../components/users/data-table';
import { columns } from '../../../components/users/columns';
import { Customer } from '@/models/Customer';

// Mock data
const mockData: Customer[] = [
  { id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: '1990-01-01', gender: 'Male' },
  { id: '2', firstName: 'Jane', lastName: 'Smith', email: 'jane@example.com', birthDate: '1995-05-05', gender: 'Female' },
];

describe('DataTable', () => {
  const mockProps = {
    columns: columns,
    data: mockData,
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

  it('formats birth dates correctly', () => {
    render(<DataTable {...mockProps} />);
    
    expect(screen.getByText('01/01/1990')).toBeInTheDocument();
    expect(screen.getByText('05/05/1995')).toBeInTheDocument();
  });

  it('displays genders correctly', () => {
    render(<DataTable {...mockProps} />);
    
    expect(screen.getByText('Male')).toBeInTheDocument();
    expect(screen.getByText('Female')).toBeInTheDocument();
  });

  it('displays correct number of selected rows', () => {
    const { rerender } = render(<DataTable {...mockProps} />);
    
    expect(screen.getByText('0 of 2 row(s) selected.')).toBeInTheDocument();

    rerender(<DataTable {...mockProps} rowSelection={{ '0': true }} />);
    
    expect(screen.getByText('1 of 2 row(s) selected.')).toBeInTheDocument();
  });

  it('disables pagination buttons when appropriate', () => {
    render(<DataTable {...mockProps} />);
    
    const previousButton = screen.getByRole('button', { name: /previous/i });
    const nextButton = screen.getByRole('button', { name: /next/i });

    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeDisabled();
  });
});
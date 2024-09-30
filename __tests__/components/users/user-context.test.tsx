import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import { UserProvider, useUserContext } from '../../../components/users/user-context';
import { Customer } from '@/models/Customer';

const TestComponent: React.FC = () => {
  const context = useUserContext();
  return (
    <div>
      <div data-testid="data">{JSON.stringify(context.data)}</div>
      <div data-testid="sorting">{JSON.stringify(context.sorting)}</div>
      <div data-testid="columnFilters">{JSON.stringify(context.columnFilters)}</div>
      <div data-testid="columnVisibility">{JSON.stringify(context.columnVisibility)}</div>
      <div data-testid="rowSelection">{JSON.stringify(context.rowSelection)}</div>
      <div data-testid="globalFilter">{context.globalFilter}</div>
      <div data-testid="selectedGender">{context.selectedGender}</div>
      <div data-testid="selectedDateRange">{JSON.stringify(context.selectedDateRange)}</div>
      <button onClick={() => context.setData([{ id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: '1990-01-01', gender: 'Male' }])}>Update Data</button>
    </div>
  );
};

describe('UserContext', () => {
  it('provides default values', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId('data').textContent).toBe(JSON.stringify([]));
    expect(screen.getByTestId('sorting').textContent).toBe(JSON.stringify([]));
    expect(screen.getByTestId('columnFilters').textContent).toBe(JSON.stringify([]));
    expect(screen.getByTestId('columnVisibility').textContent).toBe(JSON.stringify({
      name: true,
      surname: true,
      number: false,
      gender: false,
      country: false,
      dependants: false,
      birthDate: false
    }));
    expect(screen.getByTestId('rowSelection').textContent).toBe(JSON.stringify({}));
    expect(screen.getByTestId('globalFilter').textContent).toBe('');
    expect(screen.getByTestId('selectedGender').textContent).toBe('');
    expect(screen.getByTestId('selectedDateRange').textContent).toBe(JSON.stringify({ start: null, end: null }));
  });

  it('allows updating data', () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    act(() => {
      fireEvent.click(screen.getByText('Update Data'));
    });

    expect(screen.getByTestId('data').textContent).toBe(JSON.stringify([{ id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', birthDate: '1990-01-01', gender: 'Male' }]));
  });
});
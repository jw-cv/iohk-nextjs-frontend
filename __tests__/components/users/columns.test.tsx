import '@testing-library/jest-dom';
import { columns } from '../../../components/users/columns';
import { render, fireEvent, screen } from '@testing-library/react';
import { Customer } from '@/models/Customer';
import { useUserContext } from '../../../components/users/user-context';

// Mock the Button component
jest.mock("@/components/ui/button", () => ({
  Button: ({ children, onClick }: { children: React.ReactNode, onClick: () => void }) => (
    <button onClick={onClick}>{children}</button>
  ),
}));

// Mock Lucide icons
jest.mock('lucide-react', () => ({
  ArrowUpDown: () => <div data-testid="ArrowUpDown" />,
  ArrowUp: () => <div data-testid="ArrowUp" />,
  ArrowDown: () => <div data-testid="ArrowDown" />,
}));

describe('columns', () => {
  it('should have the correct number of columns', () => {
    expect(columns).toHaveLength(9);
  });

  it('should have the correct column headers', () => {
    const expectedHeaders = ['select', 'Name', 'Surname', 'Number', 'Gender', 'Country', 'Dependants', 'Birth Date', 'actions'];
    columns.forEach((column, index) => {
      if (typeof column.header === 'string') {
        expect(column.header).toBe(expectedHeaders[index]);
      } else if (typeof column.header === 'function' && column.accessorKey) {
        const Header = column.header as any;
        const { getByText } = render(<Header column={{ getIsSorted: () => false, toggleSorting: jest.fn() }} />);
        expect(getByText(expectedHeaders[index])).toBeInTheDocument();
      }
    });
  });

  it('should render sortable headers correctly', () => {
    const mockColumn = {
      getIsSorted: jest.fn(),
      toggleSorting: jest.fn(),
    };

    const { getByText, rerender } = render(
      <>{(columns[1].header as any)({ column: mockColumn })}</>
    );

    expect(getByText('Name')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button'));
    expect(mockColumn.toggleSorting).toHaveBeenCalledTimes(1);

    // Test ascending sort
    mockColumn.getIsSorted.mockReturnValue('asc');
    rerender(<>{(columns[1].header as any)({ column: mockColumn })}</>);
    expect(screen.getByTestId('ArrowUp')).toBeInTheDocument();

    // Test descending sort
    mockColumn.getIsSorted.mockReturnValue('desc');
    rerender(<>{(columns[1].header as any)({ column: mockColumn })}</>);
    expect(screen.getByTestId('ArrowDown')).toBeInTheDocument();
  });

  it('should format date correctly in Birth Date column', () => {
    const mockCustomer: Customer = {
      id: '1',
      name: 'John',
      surname: 'Doe',
      number: '1234567890',
      gender: 'Male',
      country: 'USA',
      dependants: 2,
      birthDate: '1990-01-01',
    };

    const BirthDateCell = columns[7].cell as any;
    const { getByText } = render(<BirthDateCell row={{ getValue: () => mockCustomer.birthDate }} />);
    expect(getByText('01/01/1990')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { UsersByGenderChart } from '@/components/users-overview/charts/users-by-gender-chart';

const mockData = [
  { gender: 'Male', count: 100 },
  { gender: 'Female', count: 150 },
  { gender: 'Other', count: 50 },
];

// Mock the ResponsiveContainer to provide dimensions
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }) => (
      <div style={{ width: '100%', height: 300 }}>{children}</div>
    ),
  };
});

describe('UsersByGenderChart', () => {
  it('renders correctly with data', () => {
    render(<UsersByGenderChart data={mockData} />);

    expect(screen.getByText('Users by Gender')).toBeInTheDocument();
    expect(screen.getByText('Distribution of users by gender')).toBeInTheDocument();
  });

  it('renders correctly without data', () => {
    render(<UsersByGenderChart data={[]} />);

    expect(screen.getByText('Users by Gender')).toBeInTheDocument();
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });
});
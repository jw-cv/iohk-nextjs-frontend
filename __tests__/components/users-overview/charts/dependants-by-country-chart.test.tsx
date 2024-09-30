import React from 'react';
import { render, screen } from '@testing-library/react';
import { DependantsByCountryChart } from '@/components/users-overview/charts/dependants-by-country-chart';

const mockData = [
  { country: 'USA', dependants: 100 },
  { country: 'Canada', dependants: 80 },
  { country: 'UK', dependants: 120 },
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

describe('DependantsByCountryChart', () => {
  it('renders correctly with data', () => {
    render(<DependantsByCountryChart data={mockData} />);

    expect(screen.getByText('Dependants by Country')).toBeInTheDocument();
    expect(screen.getByText('Distribution of dependants across countries')).toBeInTheDocument();
  });

  it('renders correctly without data', () => {
    render(<DependantsByCountryChart data={[]} />);

    expect(screen.getByText('Dependants by Country')).toBeInTheDocument();
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AverageAgeByCountryChart } from '@/components/users-overview/charts/average-age-by-country-chart';

const mockData = [
  { country: 'USA', averageAge: 35 },
  { country: 'Canada', averageAge: 38 },
  { country: 'UK', averageAge: 40 },
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

describe('AverageAgeByCountryChart', () => {
  it('renders correctly with data', () => {
    render(<AverageAgeByCountryChart data={mockData} />);

    expect(screen.getByText('Average Age by Country')).toBeInTheDocument();
    expect(screen.getByText('Demographic comparison of mean ages across nations')).toBeInTheDocument();
  });

  it('renders correctly without data', () => {
    render(<AverageAgeByCountryChart data={[]} />);

    expect(screen.getByText('Average Age by Country')).toBeInTheDocument();
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, screen } from '@testing-library/react';
import { AgeGroupDistributionChart } from '@/components/users-overview/charts/age-group-distribution-chart';

const mockData = [
  { ageGroup: '0-4', count: 100 },
  { ageGroup: '5-9', count: 150 },
  { ageGroup: '10-14', count: 200 },
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

describe('AgeGroupDistributionChart', () => {
  it('renders correctly with data', () => {
    render(<AgeGroupDistributionChart data={mockData} />);

    expect(screen.getByText('Age Group Distribution')).toBeInTheDocument();
    expect(screen.getByText('Distribution of users across age groups (5-year increments)')).toBeInTheDocument();
  });

});
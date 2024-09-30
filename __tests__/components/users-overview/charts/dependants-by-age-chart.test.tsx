import React from 'react';
import { render, screen } from '@testing-library/react';
import { DependantsByAgeChart } from '@/components/users-overview/charts/dependants-by-age-chart';

const mockData = [
  { birthDate: '1990-01-01', dependants: 2 },
  { birthDate: '1985-01-01', dependants: 3 },
  { birthDate: '2000-01-01', dependants: 1 },
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

describe('DependantsByAgeChart', () => {
  it('renders correctly with data', () => {
    render(<DependantsByAgeChart data={mockData} />);

    expect(screen.getByText('Dependants by Age')).toBeInTheDocument();
    expect(screen.getByText('Distribution of dependants across user ages')).toBeInTheDocument();
    
    // Use a regular expression to match the text pattern
    expect(screen.getByText(/Trending up by \d+\.\d+% across age range/)).toBeInTheDocument();
  });

  it('renders correctly without data', () => {
    render(<DependantsByAgeChart data={[]} />);

    expect(screen.getByText('Dependants by Age')).toBeInTheDocument();
    expect(screen.getByText('No data available for the selected filters')).toBeInTheDocument();
  });
});
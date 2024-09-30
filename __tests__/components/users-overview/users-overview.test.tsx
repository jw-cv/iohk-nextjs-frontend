import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UsersOverview } from '../../../components/users-overview/users-overview';
import { UserProvider } from '../../../components/users/user-context';

// Mock the chart components
jest.mock('../../../components/users-overview/charts/dependants-by-country-chart', () => ({
  DependantsByCountryChart: () => <div data-testid="dependants-by-country-chart" />,
}));
jest.mock('../../../components/users-overview/charts/age-group-distribution-chart', () => ({
  AgeGroupDistributionChart: () => <div data-testid="age-group-distribution-chart" />,
}));
jest.mock('../../../components/users-overview/charts/dependants-by-age-chart', () => ({
  DependantsByAgeChart: () => <div data-testid="dependants-by-age-chart" />,
}));
jest.mock('../../../components/users-overview/charts/users-by-gender-chart', () => ({
  UsersByGenderChart: () => <div data-testid="users-by-gender-chart" />,
}));
jest.mock('../../../components/users-overview/charts/average-age-by-country-chart', () => ({
  AverageAgeByCountryChart: () => <div data-testid="average-age-by-country-chart" />,
}));

const mockUserData = [
  { id: 1, gender: 'male', birthDate: '1990-01-01', country: 'USA', dependants: 2 },
  { id: 2, gender: 'female', birthDate: '1985-05-15', country: 'Canada', dependants: 1 },
  { id: 3, gender: 'male', birthDate: '1978-11-30', country: 'UK', dependants: 3 },
];

const mockContextValue = {
  data: mockUserData,
  selectedGender: 'all',
  setSelectedGender: jest.fn(),
  selectedDateRange: { start: null, end: null },
  setDateRange: jest.fn(),
};

describe('UsersOverview', () => {
  const renderComponent = () => {
    return render(
      <UserProvider value={mockContextValue}>
        <UsersOverview />
      </UserProvider>
    );
  };

  it('renders select inputs for gender and date range', () => {
    renderComponent();
    expect(screen.getByText('Select Gender')).toBeInTheDocument();
    expect(screen.getByText('All Dates')).toBeInTheDocument();
  });

  it('displays all chart components', () => {
    renderComponent();
    expect(screen.getByTestId('dependants-by-country-chart')).toBeInTheDocument();
    expect(screen.getByTestId('age-group-distribution-chart')).toBeInTheDocument();
    expect(screen.getByTestId('dependants-by-age-chart')).toBeInTheDocument();
    expect(screen.getByTestId('users-by-gender-chart')).toBeInTheDocument();
    expect(screen.getByTestId('average-age-by-country-chart')).toBeInTheDocument();
  });
});
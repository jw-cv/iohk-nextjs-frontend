import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '../../app/page'
import { useUserContext } from '../../components/users/user-context'

// Mock the useUserContext hook
jest.mock('../../components/users/user-context', () => ({
  useUserContext: jest.fn(() => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
  })),
}))

// Mock the LandingPage component
jest.mock('@/components/landing-page', () => ({
  LandingPage: () => <div data-testid="mock-landing-page">Mocked Landing Page</div>
}))

describe('Home', () => {
  it('renders the LandingPage component', () => {
    render(<Home />)
    
    const landingPage = screen.getByTestId('mock-landing-page')
    expect(landingPage).toBeInTheDocument()
    expect(landingPage).toHaveTextContent('Mocked Landing Page')
  })
})
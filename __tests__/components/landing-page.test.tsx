import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { LandingPage } from '../../components/landing-page'

// Mock the child components
jest.mock('../../components/users/users', () => ({
  Users: () => <div data-testid="mock-users">Mocked Users</div>
}))

jest.mock('../../components/users-overview/users-overview', () => ({
  UsersOverview: () => <div data-testid="mock-users-overview">Mocked Users Overview</div>
}))

// Mock the useUserContext hook
jest.mock('../../components/users/user-context', () => ({
  useUserContext: jest.fn(() => ({
    user: null,
    login: jest.fn(),
    logout: jest.fn(),
  }))
}))

describe('LandingPage', () => {
  it('renders the header with title and theme toggle', () => {
    render(<LandingPage />)
    
    expect(screen.getByText('IOHK', { selector: 'header h1' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /toggle theme/i })).toBeInTheDocument()
  })

  it('renders the main content section', () => {
    render(<LandingPage />)
    
    expect(screen.getByText(/One of the world's pre-eminent blockchain/)).toBeInTheDocument()
  })

  it('renders tabs for Users and Users Overview', () => {
    render(<LandingPage />)
    
    expect(screen.getByRole('tab', { name: /^users$/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /^users overview$/i })).toBeInTheDocument()
  })

  it('displays Users component by default', () => {
    render(<LandingPage />)
    
    expect(screen.getByTestId('mock-users')).toBeInTheDocument()
    expect(screen.queryByTestId('mock-users-overview')).not.toBeInTheDocument()
  })  

  it('toggles dark mode when theme button is clicked', () => {
    render(<LandingPage />)
    
    const themeToggle = screen.getByRole('button', { name: /toggle theme/i })
    
    fireEvent.click(themeToggle)
    
    expect(document.documentElement.classList.contains('dark')).toBe(true)
    
    fireEvent.click(themeToggle)
    
    expect(document.documentElement.classList.contains('dark')).toBe(false)
  })
})
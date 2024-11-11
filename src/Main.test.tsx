// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock chart.js to prevent errors during testing
jest.mock('chart.js', () => ({
  Chart: {
    register: jest.fn(),
    update: jest.fn(),
    destroy: jest.fn(),
    render: jest.fn()
  }
}));

describe('App component', () => {
  beforeEach(() => {
    // Mock the token in localStorage for protected routes
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    // Clean up after each test
    localStorage.removeItem('token');
  });

  // Helper function to render the app with a specific route
  const renderAppWithRoute = (route: string) => {
    window.history.pushState({}, 'Test page', route);
    render(<App />);
  };

  test('renders Login page on /login route', async () => {
    // Ensure token is not set to simulate non-authenticated user
    localStorage.removeItem('token');
    
    renderAppWithRoute('/login');
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
  });

  test('renders Dashboard on /home route (protected by PrivateRoute)', async () => {
    renderAppWithRoute('/home');
    expect(await screen.findByText(/dashboard/i)).toBeInTheDocument();
  });

  test('renders User Management on /users route (protected by PrivateRoute)', async () => {
    renderAppWithRoute('/users');
    // Assuming the text "User Management" is in the UI for this route
    expect(await screen.findByText(/user management/i)).toBeInTheDocument();
  });

  test('renders Page not found for an unknown route', async () => {
    renderAppWithRoute('/unknown-route');
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });

  // Example test for a chart rendering (even though it's mocked)
  test('renders a chart without error', async () => {
    renderAppWithRoute('/home');  // Assuming this route has a chart

    // Since the chart.js is mocked, we won't test the actual chart render,
    // but ensure that its rendering doesn't throw errors or break the app.
    expect(screen.getByTestId('chart-container')).toBeInTheDocument(); // Assuming the chart container has a data-testid
  });
});

// App.test.tsx
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the chart.js library
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
    localStorage.setItem('token', 'test-token');
  });

  afterEach(() => {
    localStorage.removeItem('token');
  });

  const renderAppWithRoute = (route: string) => {
    window.history.pushState({}, 'Test page', route);
    render(<App />);
  };

  test('renders Login page on /login route', async () => {
    localStorage.removeItem('token');
    renderAppWithRoute('/login');
    expect(await screen.findByText(/login/i)).toBeInTheDocument();
  });

//   test('renders Dashboard on /home route (protected by PrivateRoute)', async () => {
//     renderAppWithRoute('/home');
//     expect(await screen.findByTestId("dashboard-title")).toBeInTheDocument();
//   });

  test('renders User Management on /users route (protected by PrivateRoute)', async () => {
    renderAppWithRoute('/users');
    expect(await screen.findByTestId("user-management-title")).toBeInTheDocument();
  });

  test('renders Page not found for an unknown route', async () => {
    renderAppWithRoute('/unknown-route');
    expect(await screen.findByText(/page not found/i)).toBeInTheDocument();
  });

//   test('renders ToastContainer', async () => {
//     renderAppWithRoute('/');
//     expect(await screen.findByRole('button', { name: /close/i })).toBeInTheDocument();
//   });
});

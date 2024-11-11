import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute'; // Your PrivateRoute component

describe('PrivateRoute Component', () => {
  beforeEach(() => {
    // Clear the localStorage before each test to simulate different scenarios
    localStorage.clear();
  });

  it('should redirect to /login if token is not present in localStorage', () => {
    // Ensure there is no token in localStorage
    localStorage.removeItem('token');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<PrivateRoute />} />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the user is redirected to the login page
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('should render child routes if token is present in localStorage', () => {
    // Set a token in localStorage to simulate an authenticated user
    localStorage.setItem('token', 'some-valid-token');

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/protected" element={<PrivateRoute />}>
            <Route path="/protected" element={<div>Protected Page</div>} />
          </Route>
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the protected route is rendered
    expect(screen.getByText('Protected Page')).toBeInTheDocument();
  });
});

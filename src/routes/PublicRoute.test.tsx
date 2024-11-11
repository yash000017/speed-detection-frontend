import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import PublicRoute from './PublicRoute'; // Import PublicRoute

describe('PublicRoute Component', () => {
  it('should redirect to /home if user is authenticated', () => {
    // Render PublicRoute with isAuthenticated set to true
    render(
      <MemoryRouter initialEntries={['/public']}>
        <Routes>
          <Route
            path="/public"
            element={<PublicRoute isAuthenticated={true}><div>Public Page</div></PublicRoute>}
          />
          <Route path="/home" element={<div>Home Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the user is redirected to /home
    expect(screen.getByText('Home Page')).toBeInTheDocument();
    expect(screen.queryByText('Public Page')).not.toBeInTheDocument(); // Ensure the public page is not rendered
  });

  it('should render children if user is not authenticated', () => {
    // Render PublicRoute with isAuthenticated set to false
    render(
      <MemoryRouter initialEntries={['/public']}>
        <Routes>
          <Route
            path="/public"
            element={<PublicRoute isAuthenticated={false}><div>Public Page</div></PublicRoute>}
          />
        </Routes>
      </MemoryRouter>
    );

    // Assert that the children are rendered
    expect(screen.getByText('Public Page')).toBeInTheDocument();
  });
});

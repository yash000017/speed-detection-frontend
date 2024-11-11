import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout'; // Assuming your Layout component is in the current folder
import { useNavigate } from 'react-router-dom';

// Mock the useNavigate hook with jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Layout Component', () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate); // Cast useNavigate to jest.Mock
    mockNavigate.mockClear();
  });

  it('should render the layout and navigate when a menu item is clicked', async () => {
    // Render the component wrapped with MemoryRouter to handle routing
    render(
      <MemoryRouter>
        <Layout>
          <div>Test Content</div>
        </Layout>
      </MemoryRouter>
    );

    // Find the "Plans" menu item using getByText or getByTestId
    const plansMenuItem = screen.getByTestId('Plans');

    // Click the "Plans" menu item
    fireEvent.click(plansMenuItem);

    // After clicking, check that the mockNavigate function was called with the correct route
    expect(mockNavigate).toHaveBeenCalledWith('/plans');
  });

//   it('should call handleLogout when logout is clicked', async () => {
//     // Render the component wrapped with MemoryRouter to handle routing
//     render(
//       <MemoryRouter>
//         <Layout>
//           <div>Test Content</div>
//         </Layout>
//       </MemoryRouter>
//     );

//     // Add console logs to debug
//     const logoutButton = screen.getByText('Logout');
//     console.log("Logout Button: ", logoutButton); // Check if the button is rendered

//     fireEvent.click(logoutButton);

//     // Add logging to verify navigate is being called correctly
//     console.log("Navigate function calls: ", mockNavigate.mock.calls); // Check mockNavigate calls

//     // Check that mockNavigate was called with the correct route ("/login")
//     expect(mockNavigate).toHaveBeenCalledWith('/login');
//   });
});

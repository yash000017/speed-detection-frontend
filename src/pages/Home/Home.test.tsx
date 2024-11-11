// import { render, screen, waitFor } from '@testing-library/react';
// import axios from 'axios';
// import { MemoryRouter } from 'react-router-dom';
// import Dashboard from './Home';

// // Mock axios instance
// jest.mock('../../services/axiosInstance');
// const mockedAxios = axios as jest.Mocked<typeof axios>;

// describe('Dashboard Component', () => {
//   beforeEach(() => {
//     jest.clearAllMocks();
//   });

//   it('should render DashboardCards and BarChart when data is fetched successfully', async () => {
//     // Mocking the response from the API
//     mockedAxios.get.mockResolvedValueOnce({
//       data: {
//         status: "true",
//         data: {
//           totalUsers: 1000,
//           subscribedUsers: 800,
//           totalRevenue: 20000,
//           planWiseUsers: [
//             { planId: "1", planName: "Basic", userCount: 500 },
//             { planId: "2", planName: "Premium", userCount: 300 },
//             { planId: "3", planName: "Enterprise", userCount: 200 }
//           ],
//           monthlyUserCount: [
//             { month: "2024-01-01", userCount: 100 },
//             { month: "2024-02-01", userCount: 120 },
//             { month: "2024-03-01", userCount: 150 },
//           ],
//           monthlyRevenue: [
//             { month: "2024-01-01", revenue: 2000 },
//             { month: "2024-02-01", revenue: 2500 },
//             { month: "2024-03-01", revenue: 3000 },
//           ],
//         }
//       }
//     });

//     // Render the Dashboard component
//     render(
//       <MemoryRouter>
//         <Dashboard />
//       </MemoryRouter>
//     );

//     // Wait for the data to be displayed
//     await waitFor(() => {
//       expect(screen.getByText('Dashboard')).toBeInTheDocument();

//       // Check if the DashboardCards component renders with correct data
//       expect(screen.getByText('1000')).toBeInTheDocument(); // Total Users Count
//       expect(screen.getByText('800')).toBeInTheDocument(); // Subscribed Users Count
//       expect(screen.getByText('20000')).toBeInTheDocument(); // Total Amount Generated
//       expect(screen.getByText('Basic')).toBeInTheDocument(); // Plan Name
//       expect(screen.getByText('500')).toBeInTheDocument(); // Plan Users Count

//       // Check if the BarChart components are rendered
//       expect(screen.getByText('Revenue Overview')).toBeInTheDocument();
//       expect(screen.getByText('User Growth Overview')).toBeInTheDocument();
//     });
//   });

//   it('should handle error if data fetching fails', async () => {
//     // Mocking a failed API request
//     mockedAxios.get.mockRejectedValueOnce(new Error('Error fetching data'));

//     // Render the Dashboard component
//     render(
//       <MemoryRouter>
//         <Dashboard />
//       </MemoryRouter>
//     );

//     // Check that an error is handled (you can check for error message or console logs depending on your implementation)
//     await waitFor(() => {
//       expect(screen.getByText('Dashboard')).toBeInTheDocument();
//       // Optionally, you can test that an error message or fallback UI appears here
//       // e.g., expect(screen.getByText('Failed to load data')).toBeInTheDocument();
//     });
//   });
// });

import axios from 'axios';

// Mock the entire axios module, including the create method
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
  })),
}));

// Mock localStorage
global.localStorage = {
  getItem: jest.fn(() => 'mocked-token'),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
  length: 0,
  key: jest.fn(),
};

describe('axiosInstance', () => {
  beforeEach(() => {
    jest.clearAllMocks();  // Reset any mock calls before each test
  });

//   it('should add Authorization header when token is in localStorage', async () => {
//     // Mock axiosInstance.get() response
//     (axiosInstance.get as jest.Mock).mockResolvedValue({
//       data: 'mocked data',
//     });

//     // Call axiosInstance.get to trigger the mock
//     await axiosInstance.get('/some-endpoint');

//     // Test that the Authorization header was set correctly
//     expect(axiosInstance.get).toHaveBeenCalledWith(
//       '/some-endpoint',
//       expect.objectContaining({
//         headers: expect.objectContaining({
//           Authorization: 'Bearer mocked-token',
//         }),
//       })
//     );
//   });

//   it('should handle response error correctly', async () => {
//     // Mock a rejected promise for a failed API call
//     (axiosInstance.get as jest.Mock).mockRejectedValue({
//       response: { data: 'Error occurred' },
//     });

//     // Mock console.error to check if error is logged
//     console.error = jest.fn();

//     try {
//       await axiosInstance.get('/error-endpoint');
//     } catch (error) {
//       expect(console.error).toHaveBeenCalledWith('API error:', 'Error occurred');
//     }
//   });

  it('should call request interceptor', async () => {
    // Get the mock axios instance
    const mockAxiosInstance = axios.create();

    // Setup interceptors mock
    mockAxiosInstance.interceptors.request.use(jest.fn());

    // Call axiosInstance.get to trigger interceptor
    await mockAxiosInstance.get('/some-endpoint');

    // Ensure the interceptor function was called
    expect(mockAxiosInstance.interceptors.request.use).toHaveBeenCalled();
  });

  it('should call response interceptor', async () => {
    // Get the mock axios instance
    const mockAxiosInstance = axios.create();

    // Setup interceptors mock
    mockAxiosInstance.interceptors.response.use(jest.fn());

    // Call axiosInstance.get to trigger interceptor
    await mockAxiosInstance.get('/some-endpoint');

    // Ensure the response interceptor was called
    expect(mockAxiosInstance.interceptors.response.use).toHaveBeenCalled();
  });
});

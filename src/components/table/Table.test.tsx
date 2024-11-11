// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import CustomTable, { CustomTableProps, Data, Column } from './Table';

// describe('CustomTable Component', () => {
//     const setFilters = jest.fn();
//     const setPage = jest.fn();
//     const setRowsPerPage = jest.fn();
//     const setSortConfig = jest.fn();

//   beforeEach(() => {
//     // Clear previous calls to mock functions
//     jest.clearAllMocks();
//   });

//   const columns: Column[] = [
//     { id: 'id', label: 'ID', sortable: true,  filterable: true },
//     { id: 'name', label: 'Name', sortable: true, filterable: true },
//   ];

//   const data: Data[] = [
//     { id: '1', name: 'John Doe' },
//     { id: '2', name: 'Jane Doe' },
//   ];


//   const setup = (propsOverrides: Partial<CustomTableProps> = {}) => {
//     const defaultProps: CustomTableProps = {
//       data,
//       columns,
//       loading: false,
//       page: 0,
//       setPage: jest.fn(),
//       rowsPerPage: 5,
//       setRowsPerPage: jest.fn(),
//       totalItems: data.length,
//       sortConfig: null,
//       setSortConfig: jest.fn(),
//       filters: {},
//       setFilters: jest.fn(),
//       ...propsOverrides,
//     };

//     return render(<CustomTable {...defaultProps} />);
//   };

//   test('renders table with data', () => {
//     setup();

//     expect(screen.getByText('ID')).toBeInTheDocument();
//     expect(screen.getByText('Name')).toBeInTheDocument();
//     expect(screen.getByText('John Doe')).toBeInTheDocument();
//     expect(screen.getByText('Jane Doe')).toBeInTheDocument();
//   });

//   test('renders loading spinner when loading is true', () => {
//     setup({ loading: true });

//     expect(screen.getByRole('progressbar')).toBeInTheDocument();
//   });

//   test('calls setSortConfig when sorting a column', () => {
//     const setSortConfig = jest.fn();
//     setup({ setSortConfig });

//     fireEvent.click(screen.getByLabelText('Sort by ID'));

//     expect(setSortConfig).toHaveBeenCalledWith({ key: 'id', direction: 'asc' });
//   });

//   test('calls setFilters when filter input changes', async () => {
//     // Mock data and columns props for the table
//     // const mockData = [{ id: 1, name: 'John Doe' }];
//     // const mockColumns = [{ Header: 'Name', accessor: 'name' }];
    
//     // Render the component with the necessary props
//     render(
//       <CustomTable
//         setFilters={setFilters} // Mock function
//         setPage={setPage} // Mock function
//         setRowsPerPage={setRowsPerPage} // Mock function
//         setSortConfig={setSortConfig} // Mock function
//         filters={{ name: '' }} // Provide an initial filter value
//         data={data} // Mock data
//         columns={columns} // Mock columns
//         loading={false} // Mock loading state
//         page={0} // Initial page
//         rowsPerPage={10} // Mock rows per page
//         totalItems={1} // Mock total items
//         sortConfig={{ key: 'name', direction: 'asc' }} // Mock sort configuration
//       />
//     );

//     // Select the input field for the 'Name' filter (adjust selector if needed)
//     const filterInput = screen.getByPlaceholderText('Filter Name');

//     // Change the value of the input field
//     fireEvent.change(filterInput, { target: { value: 'John' } });

//     // Wait for the setFilters function to be called with the correct argument
//     await waitFor(() => expect(setFilters).toHaveBeenCalledWith({ name: 'John' }));
//   });

//   test('calls setPage when changing pages', () => {
//     // Mock data and columns props for the table
//     // const mockData = [{ id: 1, name: 'John Doe' }];
//     // const mockColumns = [{ Header: 'Name', accessor: 'name' }];
    
//     // Render the component with the necessary props
//     render(
//       <CustomTable
//         setFilters={setFilters}
//         setPage={setPage}
//         setRowsPerPage={setRowsPerPage}
//         setSortConfig={setSortConfig}
//         filters={{ name: '' }}
//         data={data}
//         columns={columns}
//         loading={false}
//         page={0}
//         rowsPerPage={10} // Mock rows per page
//         totalItems={1} // Mock total items
//         sortConfig={{ key: 'name', direction: 'asc' }} // Mock sort configuration
//       />
//     );

//     // Find and click the "next page" button (adjust selector if needed)
//     const nextPageButton = screen.getByLabelText('Go to next page'); // Adjust according to your pagination controls
//     fireEvent.click(nextPageButton);

//     // Verify setPage has been called with the correct argument
//     expect(setPage).toHaveBeenCalledWith(1);
//   });

//   test('calls setRowsPerPage when changing rows per page', () => {
//     const setRowsPerPage = jest.fn();
//     setup({ setRowsPerPage });

//     // Select the "Rows per page" dropdown using role "combobox"
//     const rowsPerPageSelect = screen.getByRole('combobox', { name: /rows per page/i });
//     fireEvent.change(rowsPerPageSelect, { target: { value: '10' } });

//     expect(setRowsPerPage).toHaveBeenCalledWith(10);
//   });
//   test('calls handleEdit when edit button is clicked', () => {
//     const handleEdit = jest.fn();
//     setup({ handleEdit });

//     fireEvent.click(screen.getAllByLabelText('Edit')[0]);

//     expect(handleEdit).toHaveBeenCalledWith(data[0]);
//   });

//   test('calls handleDelete when delete button is clicked', () => {
//     const handleDelete = jest.fn();
//     setup({ handleDelete });

//     fireEvent.click(screen.getAllByLabelText('Delete')[0]);

//     expect(handleDelete).toHaveBeenCalledWith(data[0]);
//   });
// });

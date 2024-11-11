import React, { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  Paper,
  IconButton,
  CircularProgress,
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { debounce } from 'lodash';
import { EditPlan } from '../../pages/plans/Plans';

export interface Data {
  id: string;
  [key: string]: any;
}

export interface Column {
  id: keyof Data;
  label: string;
  sortable?: boolean;
  filterable?: boolean;
}

export interface CustomTableProps {
  data: Data[];
  columns: Column[];
  loading: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
  totalItems: number;
  handleDelete?: (row: EditPlan) => Promise<void>;
  handleEdit?: (row: EditPlan) => Promise<void>;
  sortConfig: { key: string; direction: 'asc' | 'desc' } | null;
  setSortConfig: React.Dispatch<React.SetStateAction<{ key: string; direction: 'asc' | 'desc' } | null>>;
  filters: { [key: string]: string };
  setFilters: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  columns,
  loading,
  page,
  setPage,
  rowsPerPage,
  setRowsPerPage,
  totalItems,
  handleDelete,
  handleEdit,
  sortConfig,
  setSortConfig,
  filters,
  setFilters,
}) => {
  const [localFilters, setLocalFilters] = useState<{ [key: string]: string }>({ ...filters });

  const handleSort = (columnId: keyof Data) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === columnId && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key: columnId as string, direction });
  };

  // Debounced API filter update
  const debouncedFilterChange = useMemo(
    () =>
      debounce((newFilters) => {
        setFilters(newFilters);
      }, 1000),
    [setFilters]
  );

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    columnId: keyof Data
  ) => {
    const { value } = e.target;
    setLocalFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
    debouncedFilterChange({ ...localFilters, [columnId]: value });
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id as string}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {column.label}
                    {column.sortable && (
                      <IconButton
                        onClick={() => handleSort(column.id)}
                        size="small"
                        sx={{ paddingTop: sortConfig ? '5px' : '0px' }}
                        aria-label={`Sort by ${column.label}`}
                      >
                        {sortConfig?.key === column.id && sortConfig.direction === 'asc' ? (
                          <ArrowUpward fontSize="small" />
                        ) : (
                          <ArrowDownward fontSize="small" />
                        )}
                      </IconButton>
                    )}
                  </div>

                  {column.filterable && (
                    <TextField
                      size="small"
                      variant="outlined"
                      placeholder={`Filter ${column.label}`}
                      value={localFilters[column.id] || ''}
                      onChange={(e) => handleFilterChange(e, column.id)}
                      style={{ marginTop: '4px' }}
                    />
                  )}
                </TableCell>
              ))}
              {(handleEdit || handleDelete) && (
                <TableCell sx={{ alignContent: 'flex-start', paddingTop: '20px' }}>Actions</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + (handleEdit || handleDelete ? 1 : 0)} align="center">
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                <TableRow key={row.id}>
                  {columns.map((column) => (
                    <TableCell key={`${row.id}-${column.id as string}`}>{row[column.id]}</TableCell>
                  ))}
                  {(handleEdit || handleDelete) && (
                    <TableCell align="center">
                      {handleEdit && (
                        <IconButton onClick={() => handleEdit(row as unknown as EditPlan)} aria-label="Edit">
                          <EditIcon />
                        </IconButton>
                      )}
                      {handleDelete && (
                        <IconButton onClick={() => handleDelete(row as unknown as EditPlan)} aria-label="Delete">
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={totalItems}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CustomTable;

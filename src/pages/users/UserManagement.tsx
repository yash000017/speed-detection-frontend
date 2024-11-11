import React, { useEffect, useState } from 'react';
import axiosInstance from '../../services/axiosInstance';
import BreadCrumbs from '../../components/breadcrumbs/BreadCrumbs';
import { Box } from '@mui/material';
import "./userManagement.scss";
import CustomTable from '../../components/table/Table';
import { notify } from '../../utils/toast';
import { UserData } from '../../types/types';

// Define an interface for User data
interface UserPlan {
  userPlanId: string;
  userId: string;
  planId: string;
  currentBallCount: number;
  paymentAmount: number;
  paymentGatewayId: string;
  paymentOn: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  plan: { planName: string };
}

interface User {
  userId: string;
  userName: string;
  email: string;
  age: number;
  role: string;
  createdAt: string;
  updatedAt: string;
  userPlans: UserPlan[];
}

const UserManagement: React.FC = () => {
  const [data, setData] = useState<UserData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filters, setFilters] = useState<{ [key: string]: string }>({}); // State for filters

  const breadCrumbsArr = [
    {
      title: "User Management",
      link: null,
    },
    {
      title: "Home",
      link: "/home",
    },
    {
      title: "User Management",
      link: "/users",
    },
  ];

  const fetchData = async () => {
    setLoading(true);
    try {
      // Prepare sorting and filtering parameters for the API call
      const sortField = sortConfig?.key || 'createdAt';
      const sortOrder = sortConfig?.direction || 'asc';

      const response = await axiosInstance.get(`/users`, {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          sortField,
          sortOrder,
          filters: JSON.stringify(filters), // Pass filters as JSON string
        },
      });

      if (response.data && response.data.status === "true") {
        const { data: users, pagination } = response.data;
        const usersWithId: UserData[] = users.map((user: User) => {
          const activeUserPlan = user.userPlans.find(plan => plan.isActive);

          return {
            id: parseInt(user.userId),
            userId: user.userId,
            userName: user.userName,
            email: user.email,
            age: user.age,
            role: user.role,
            currentBallCount: activeUserPlan ? activeUserPlan.currentBallCount : 'N/A',
            paymentAmount: activeUserPlan ? activeUserPlan.paymentAmount : 'N/A',
            isActive: activeUserPlan ? 'Yes' : 'No',
            planName: activeUserPlan?.plan?.planName || 'N/A',
          };
        });

        setData(usersWithId)
        setTotalItems(pagination?.totalItems || 0);
      } else {
        notify("Error fetching users!", 'error');
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, sortConfig, filters]);

  // Define columns for the CustomTable
  const columns = [
    { id: 'userName', label: 'Name', sortable: true, filterable: true },
    { id: 'email', label: 'Email', sortable: true, filterable: true },
    { id: 'age', label: 'Age', sortable: true, filterable: true },
    // { id: 'role', label: 'Role', sortable: true, filterable: true },
    { id: 'planName', label: 'Plan Name', sortable: true, filterable: true },
    { id: 'currentBallCount', label: 'Ball Count', sortable: true, filterable: true },
  ];

  return (
    <Box className="user-container">
      <Box className="user-header">
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
        {/* <CommonButton type="submit">Save</CommonButton> */}
      </Box>
      <Box className="user-table">
        <h2 data-testid="user-management-title">User Management</h2>
        <CustomTable
          data={data}
          columns={columns}
          loading={loading}
          page={page}
          setPage={setPage}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          totalItems={totalItems}
          sortConfig={sortConfig} 
          setSortConfig={setSortConfig}
          filters={filters} 
          setFilters={setFilters}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;

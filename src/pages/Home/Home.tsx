import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import DashboardCards from '../../components/DashboardCard/DashboardCard';
import BarChart from '../../components/charts/Charts';
import axiosInstance from '../../services/axiosInstance';

const Dashboard: React.FC = () => {
  // State variables
  const [totalUsersCount, setTotalUsersCount] = useState(0);
  const [subscribedUserCount, setSubscribedUserCount] = useState(0);
  const [totalAmountGenerated, setTotalAmountGenerated] = useState(0);
  const [planWiseUsers, setPlanWiseUsers] = useState<{ planId: string; planName: string; userCount: number }[]>([]);
  const [monthlyUserCount, setMonthlyUserCount] = useState<number[]>([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await axiosInstance.get('/dashboard/data');
        if (response?.data?.status === "true") {
          const { totalUsers, subscribedUsers, totalRevenue, planWiseUsers, monthlyUserCount, monthlyRevenue } = response.data.data;

          setTotalUsersCount(totalUsers);
          setSubscribedUserCount(subscribedUsers);
          setTotalAmountGenerated(totalRevenue);
          setPlanWiseUsers(planWiseUsers);
          
          const prepareMonthlyUserData = (monthlyData: { month: string; userCount: number }[]) => {
            const currentMonthIndex = new Date().getMonth();
            const monthlyValues = Array(13).fill(0);
            monthlyData.forEach(item => {
              const monthIndex = new Date(item.month).getMonth();
              const index = (currentMonthIndex - monthIndex + 12) % 12;
              monthlyValues[index] = item.userCount;
            });
            return monthlyValues.reverse();
          };

          const prepareMonthlyRevenueData = (monthlyData: { month: string; revenue: number }[]) => {
            const currentMonthIndex = new Date().getMonth();
            const monthlyValues = Array(13).fill(0);
            monthlyData.forEach(item => {
              const monthIndex = new Date(item.month).getMonth();
              const index = (currentMonthIndex - monthIndex + 12) % 12;
              monthlyValues[index] = item.revenue;
            });
            return monthlyValues.reverse();
          };

          setMonthlyUserCount(prepareMonthlyUserData(monthlyUserCount));
          setMonthlyRevenue(prepareMonthlyRevenueData(monthlyRevenue));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <Box p={3} bgcolor="#e1d3d373" sx={{ borderRadius: "12px" }}>
      <Typography data-testid="dashboard-title" variant="h4" sx={{ color: "black", fontWeight: "500" }} gutterBottom>
        Dashboard
      </Typography>

      <DashboardCards
        totalUsersCount={totalUsersCount}
        subscribedUserCount={subscribedUserCount}
        totalAmountGenerated={totalAmountGenerated}
        planWiseUsers={planWiseUsers}
      />

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2, 
          justifyContent: 'space-between',
        }}
        p={2}
      >
        <Card sx={{ flex: '1 1 300px', borderRadius: 2 }}> {/* 300px min-width */}
          <CardContent>
            <Typography variant="h6" sx={{ color: "black" }}>Collection Overview</Typography>
            <BarChart 
              monthlyData={monthlyRevenue} 
              title="Revenue Overview" 
              label="Total Revenue" 
              color="rgba(255, 99, 132, 0.5)" 
            />
          </CardContent>
        </Card>
        <Card sx={{ flex: '1 1 300px', borderRadius: 2 }}> {/* 300px min-width */}
          <CardContent>
            <Typography variant="h6" sx={{ color: "black" }}>User Growth Overview</Typography>
            <BarChart 
              monthlyData={monthlyUserCount} 
              title="User Growth Overview" 
              label="Total Users" 
              color="rgba(54, 162, 235, 0.5)" 
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default Dashboard;

import React from 'react';
import { Box, Typography } from '@mui/material';

interface DashboardProps {
  totalUsersCount: number;
  subscribedUserCount: number;
  totalAmountGenerated: number;
  planWiseUsers: { planName: string; userCount: number }[];
}

const DashboardCards: React.FC<DashboardProps> = ({
  totalUsersCount,
  subscribedUserCount,
  totalAmountGenerated,
  planWiseUsers,
}) => {
  // Base card data for Total Users, Subscribed Users, and Total Revenue
  const baseCardData = [
    { title: 'Total Users', count: totalUsersCount, icon: '👥' },
    { title: 'Subscribed Users', count: subscribedUserCount, icon: '🔖' },
    { title: 'Total Revenue', count: `₹${totalAmountGenerated}`, icon: '💰' },
  ];

  // Map through planWiseUsers and format it for the cards
  const dynamicPlanData = planWiseUsers.map((plan) => ({
    title: `${plan.planName}`,
    count: plan.userCount,
    icon: '📊',
  }));

  // Combine base data and plan data
  const cardData = [...baseCardData, ...dynamicPlanData];

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="space-between" p={2}>
      {cardData.map((card, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: "30px",
            justifyContent: 'flex-start',
            width: { xs: '100%', sm: 'calc(33.33% - 2%)' },
            height: '100px',
            borderRadius: '8px',
            boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            backgroundColor: '#ffffff',
            padding: '10px',
            marginBottom: '16px',
          }}
        >
          <Typography variant="h4">{card.icon}</Typography>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="body1" sx={{ fontWeight: "500" }} color="black">
              {card.title}
            </Typography>
            <Typography variant="h5" color="primary">
              {card.count}
            </Typography>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default DashboardCards;

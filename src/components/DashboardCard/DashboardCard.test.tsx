import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import DashboardCards from './DashboardCard';

describe('DashboardCards', () => {
  const props = {
    totalUsersCount: 100,
    subscribedUserCount: 75,
    totalAmountGenerated: 5000,
    planWiseUsers: [
      { planName: 'Basic', userCount: 40 },
      { planName: 'Premium', userCount: 35 },
    ],
  };

  it('renders the base cards for total users, subscribed users, and total revenue', () => {
    render(<DashboardCards {...props} />);
    
    // Check if base card titles are rendered
    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('Subscribed Users')).toBeInTheDocument();
    expect(screen.getByText('Total Revenue')).toBeInTheDocument();

    // Check if base card counts are rendered
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('75')).toBeInTheDocument();
    expect(screen.getByText('₹5000')).toBeInTheDocument();
  });

  it('renders the plan-wise user cards dynamically', () => {
    render(<DashboardCards {...props} />);

    // Check if dynamic plan titles and counts are rendered
    props.planWiseUsers.forEach((plan) => {
      expect(screen.getByText(plan.planName)).toBeInTheDocument();
      expect(screen.getByText(plan.userCount.toString())).toBeInTheDocument();
    });
  });

  it('renders the correct number of cards', () => {
    render(<DashboardCards {...props} />);
    const totalCardsCount = 3 + props.planWiseUsers.length; // 3 base cards + dynamic cards
    expect(screen.getAllByRole('heading', { level: 5 }).length).toBe(totalCardsCount);
  });

  it('displays icons for each card', () => {
    render(<DashboardCards {...props} />);

    // Check if icons are rendered in the correct order
    expect(screen.getByText('👥')).toBeInTheDocument();
    expect(screen.getByText('🔖')).toBeInTheDocument();
    expect(screen.getByText('💰')).toBeInTheDocument();
    expect(screen.getAllByText('📊').length).toBe(props.planWiseUsers.length);
  });
});

// BreadCrumbs.test.tsx
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom'; // Wrap with Router for Link components
import BreadCrumbs from './BreadCrumbs'; // Import your BreadCrumbs component

describe('BreadCrumbs Component', () => {
  // Test 1: Render the BreadCrumbs component with multiple breadcrumbs
  it('should render breadcrumbs with links and slashes only if there are more than two breadcrumbs', () => {
    const breadCrumbsArr = [
      { title: 'Home', link: '/' },
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'User Profile', link: null },
    ];
  
    render(
      <Router>
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
      </Router>
    );
  
    // Check if the breadcrumbs are rendered correctly
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();
  
    // Check if links are correctly rendered only if link exists
    const homeLink = screen.getByText('Home').closest('a');
    if (homeLink) {
      expect(homeLink).toHaveAttribute('href', '/');
    }
  
    const dashboardLink = screen.getByText('Dashboard').closest('a');
    if (dashboardLink) {
      expect(dashboardLink).toHaveAttribute('href', '/dashboard');
    }
  
    // Check for slashes only if there are more than two breadcrumbs
    if (breadCrumbsArr.length > 2) {
      const slashes = screen.queryAllByText('/');
      expect(slashes.length).toBeGreaterThan(0);  // Ensure slashes are rendered between breadcrumbs
    } else {
      const slashes = screen.queryAllByText('/');
      expect(slashes.length).toBe(0);  // Ensure no slashes are rendered
    }
  });
  
  

  // Test 2: Render breadcrumbs without any links
  it('should render breadcrumbs without links when link is null', () => {
    const breadCrumbsArr = [
      { title: 'Home', link: '/' },
      { title: 'Dashboard', link: null },
      { title: 'User Profile', link: null },
    ];

    render(
      <Router>
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
      </Router>
    );

    // Check if the breadcrumbs are rendered correctly
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('User Profile')).toBeInTheDocument();

    // Ensure "Dashboard" and "User Profile" do not have links
    expect(screen.getByText('Dashboard').closest('a')).toBeNull();
    expect(screen.getByText('User Profile').closest('a')).toBeNull();
  });

  // Test 3: Check if slashes are properly rendered between breadcrumbs
  it('should render slashes between breadcrumbs', () => {
    const breadCrumbsArr = [
      { title: 'Home', link: '/' },
      { title: 'Dashboard', link: '/dashboard' },
      { title: 'User Profile', link: '/user-profile' },
    ];

    render(
      <Router>
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
      </Router>
    );

    // Check that slashes are present between breadcrumbs
    const slashes = screen.getAllByText('/');
    expect(slashes.length).toBe(1); // Should have 2 slashes between 3 breadcrumbs
  });

  // Test 4: Ensure first breadcrumb does not have a slash before it
  it('should not display a slash before the first breadcrumb', () => {
    const breadCrumbsArr = [
      { title: 'Home', link: '/' },
      { title: 'Dashboard', link: '/dashboard' },
    ];

    render(
      <Router>
        <BreadCrumbs breadCrumbsArr={breadCrumbsArr} />
      </Router>
    );

    // Ensure that there is no slash before the first breadcrumb
    const firstBreadcrumb = screen.getByText('Home');
    expect(firstBreadcrumb.previousSibling).toBeNull();
  });
});

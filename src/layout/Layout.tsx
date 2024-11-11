import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PeopleIcon from '@mui/icons-material/People';
import { NavigateFunction, useNavigate, useLocation } from 'react-router-dom';
import axiosInstance from '../services/axiosInstance';
import { notify } from '../utils/toast';

const drawerWidth = 240;
const collapsedDrawerWidth = 60;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}


const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen, // Use MUI's default duration
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen, // Use MUI's default duration
      }),
    }),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.secondary,
  }));
  

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const StyledToolbar = styled(Toolbar)({
    display: 'flex',
    justifyContent: 'space-between',
});

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
});

const DrawerStyled = styled(Drawer)<{ open?: boolean }>(({ theme, open }) => ({
    width: open ? drawerWidth : collapsedDrawerWidth,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        width: open ? drawerWidth : collapsedDrawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        boxSizing: 'border-box',
    },
}));

const handleLogout = async (navigate: NavigateFunction) => {
    try {
        console.log("------")
      const token = localStorage.getItem('token');
  
      // Make the API request to log out the user
      await axiosInstance.post('/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token if needed for authorization
        },
      });

      notify("logout successful!", 'success');
  
      localStorage.removeItem('token');
      navigate('/login');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const sideBarList = [
    {
        name: 'Home',
        rootRoute: '/home',
        route: '/home',
        icon: <DashboardIcon />, // Updated to DashboardIcon for Home
        subMenu: [],
    },
    {
        name: 'Plans',
        rootRoute: '/plans',
        route: '/plans',
        icon: <LocalOfferIcon />, // Icon for Plans
        subMenu: [],
    },
    {
        name: 'Users',
        rootRoute: '/users',
        route: '/users',
        icon: <PeopleIcon />, // Icon for Users
        subMenu: [],
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(!open);
    };

    return (
        <Box display="flex">
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <StyledToolbar>
                    <StyledBox>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            style={{ marginRight: 16, display: open ? 'none' : 'block', cursor: 'pointer' }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Speed Detection 
                        </Typography>
                    </StyledBox>
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={() => handleLogout(navigate)}
                        style={{ cursor: 'pointer' }}
                        data-testid="logout"
                    >
                        Logout
                    </Typography>
                </StyledToolbar>
            </AppBar>
            <DrawerStyled variant="permanent" anchor="left" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose} style={{ cursor: 'pointer' }}>
                        {theme.direction === 'ltr' ? <MenuIcon /> : <MenuIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarList.map((navLink) => {
                        const isSelected = location.pathname.includes(navLink.route);

                        return (
                            <ListItem key={navLink.name} disablePadding>
                                <ListItemButton
                                    data-testid={navLink.name}
                                    onClick={() => navigate(navLink.route)}
                                    style={{
                                        minHeight: '50px',
                                        justifyContent: open ? 'initial' : 'center',
                                        backgroundColor: isSelected ? theme.palette.primary.main : 'transparent',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <ListItemIcon
                                        style={{
                                            minWidth: 0,
                                            marginRight: open ? 24 : 'auto',
                                            justifyContent: 'center',
                                            color: isSelected ? theme.palette.text.secondary : theme.palette.text.primary, // Set icon color based on selection
                                        }}
                                    >
                                        {navLink.icon ? React.cloneElement(navLink.icon, { style: { color: isSelected ? theme.palette.text.secondary : theme.palette.text.primary } }) : <InboxIcon />}
                                    </ListItemIcon>
                                    {open && (
                                        <ListItemText
                                            primary={navLink.name}
                                            primaryTypographyProps={{
                                                style: { color: isSelected ? theme.palette.text.secondary : theme.palette.text.primary }, // Set text color based on selection
                                            }}
                                        />
                                    )}
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </DrawerStyled>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}

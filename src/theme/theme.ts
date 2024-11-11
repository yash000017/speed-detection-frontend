// theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#EF4E4E',
    },
    background: {
      default: '#FFFFFF',
    },
    text: {
      primary: '#888',
      secondary: '#ffffff',
    },
    error: {
      main: '#ff0000',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 768,
      lg: 1200,
      xl: 1536,
    },
  },
  custom: {
    animationDuration: {
      enteringScreen: '0.3s',
      leavingScreen: '0.3s',
    },
  },
});

export default theme;

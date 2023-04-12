import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Chart from '../chart/Chart';
import Deposits from '../deposits/Deposits';
import Orders from '../orders/Orders';
import Copyright from '../copyright/Copyright';
import { Button } from '@mui/material';
import { getIsConnected } from '../../redux/tickers/ticker-selectors';
import {
  fetchTickers,
  stopConnection,
} from '../../redux/tickers/ticker-operations';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function DashboardContent() {
  const [theme, setTheme] = React.useState(lightTheme);
  const dispatch = useDispatch();
  const isConnected = useSelector(getIsConnected);

  const toggleTheme = () => {
    if (theme === lightTheme) {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  const handleConnect = () => {
    dispatch(fetchTickers());
  };
  const handleDisconnect = () => {
    dispatch(stopConnection());
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar>
            <Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#800080' }}
                onClick={handleDisconnect}
                disabled={!isConnected}
              >
                Stop conection
              </Button>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#800080' }}
                onClick={handleConnect}
                disabled={isConnected}
              >
                Start conection
              </Button>
            </Box>
            <h1 style={{ margin: '0 auto' }}>Online trading tickers </h1>
            <Button
              onClick={toggleTheme}
              variant="contained"
              sx={{ backgroundColor: '#FFC0CB ' }}
            >
              Click Theme: {theme.palette.mode}
            </Button>
          </Toolbar>

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
            {/* Copyright */}
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}

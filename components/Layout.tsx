// components/Layout.js

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Typography, Button, Grid } from '@material-ui/core';
import { useAuth } from 'react-use-auth';
import { connect } from 'react-redux';
import CustomButton from './CustomButton';

type LayoutProps = {
  children?: any;
  title?: string;
  clearError?: any;
  error?: boolean;
  errorMessage?: string;
};
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  borderRadius: '0.9em',
  justifyContent: 'center',
  alignItems: 'center',
};

const linkStyleInactive = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '2em',
  marginRight: '0.5em',
};

const linkStyleActive = {
  color: 'red',
  textDecoration: 'none',
  fontSize: '2em',
  marginRight: '0.5em',
};

const errorContainer = {
  border: '1px solid #DDD',
  borderRadius: '0.9em',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '1em',
  marginBottom: '1em',
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  children,
  title,
  clearError,
  error,
  errorMessage,
}) => {
  const { isAuthenticated, login, logout } = useAuth();
  const router = useRouter();
  return (
    <div style={layoutStyle}>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        {error && (
          <Grid container style={errorContainer}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h6">{errorMessage}</Typography>
            </Grid>
            <Grid container xs={12} justify="center" alignItems="center">
              <Button variant="contained" color="primary" onClick={clearError}>
                Ok
              </Button>
            </Grid>
          </Grid>
        )}
        <nav style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Link href="/">
              <a style={router.pathname === '/' ? linkStyleActive : linkStyleInactive}>
                <Typography variant="body1">Home</Typography>
              </a>
            </Link>{' '}
            <Link href="/about">
              <a style={router.pathname === '/about' ? linkStyleActive : linkStyleInactive}>
                <Typography variant="body1">About</Typography>
              </a>
            </Link>{' '}
            {isAuthenticated() && (
              <Link href="/logs">
                <a style={router.pathname === '/logs' ? linkStyleActive : linkStyleInactive}>
                  <Typography variant="body1">Log</Typography>
                </a>
              </Link>
            )}{' '}
          </div>
          {isAuthenticated() ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CustomButton onClick={logout}>
                <Typography variant="body1">Logout</Typography>
              </CustomButton>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <CustomButton onClick={login}>
                <Typography variant="body1">Login</Typography>
              </CustomButton>
            </div>
          )}
        </nav>
      </header>
      {children}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    error: state.error.error,
    errorMessage: state.error.message,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (accessToken: string) => {
    dispatch({ type: 'LOGIN_USER', payload: accessToken });
  },
  logoutUser: () => {
    dispatch({ type: 'LOGOUT_USER', payload: null });
  },
  clearError: () => {
    dispatch({ type: 'CLEAR_ERROR', payload: null });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Layout);

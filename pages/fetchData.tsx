import React, { useEffect } from 'react';
import { useAuth } from 'react-use-auth';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

export interface LogProps {
  logs: Log[];
  error: string | null;
}

export interface Log {
  date: string;
  images: LogImages[];
}

export interface LogImages {
  timestamp: string;
  path: string;
}

const FetchData: React.FunctionComponent<{
  addLogs: any;
  addError: any;
  loginUser: any;
  logoutUser: any;
}> = ({ addLogs, addError, loginUser, logoutUser }) => {
  const { authResult, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (!isAuthenticated()) {
        addError('Login failed: Unauthrorized User');
        logoutUser();
      } else if (process.env.AUTH_0_AUDIENCE && process.env.AUTH_0_AUDIENCE!.length > 0) {
        loginUser(authResult?.accessToken);
        try {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${authResult.accessToken}`);
          const res = await fetch(`${process.env.AUTH_0_AUDIENCE}/logs`, {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
          });
          const data: Log = await res.json();
          addLogs(data);
          router.push('/');
        } catch (error) {
          addError('There was an error accessing the API, make sure the unit is active');
        }
      } else {
        addError('API Endpoint not set');
      }
      router.push('/');
    })();
  }, []);

  return (
    <Layout>
      <Typography variant="h3">Please hold while we are fetching data...</Typography>
    </Layout>
  );
};

const mapStateToProps = (state: any) => {
  return {
    accessToken: state.user,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  loginUser: (accessToken: string) => {
    dispatch({ type: 'LOGIN_USER', payload: accessToken });
  },
  logoutUser: () => {
    dispatch({ type: 'LOGOUT_USER', payload: null });
  },
  addLogs: (logs: any) => {
    dispatch({ type: 'ADD_LOGS', payload: logs });
  },
  addError: (error: string) => {
    dispatch({ type: 'ERROR', payload: error });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchData);

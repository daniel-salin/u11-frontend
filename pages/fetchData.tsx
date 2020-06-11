import React, { useEffect, Dispatch } from 'react';
import { useAuth } from 'react-use-auth';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { NextPage } from 'next';
import Layout from '../components/Layout';

export interface LogProps {
  logs: Log[];
  error: string | null;
  addLogs: AddLogs;
  addError: AddError;
  loginUser: LoginUser;
  logoutUser: LogoutUser;
}

export interface AddLogs {
  (logs: Log): void;
}
export interface AddError {
  (error: string): void;
}
export interface LoginUser {
  (accessToken: string): void;
}
export interface LogoutUser {
  (): void;
}

export interface Log {
  date: string;
  images: LogImages[];
}

export interface LogImages {
  timestamp: string;
  path: string;
}

const FetchData: NextPage<LogProps> = ({ addLogs, addError, loginUser, logoutUser }) => {
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

export interface State {
  user: {
    accessToken: string;
  };
}

const mapStateToProps = (state: State) => {
  return {
    accessToken: state.user,
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<{ type: string; payload?: Log | string | null }>
) => ({
  loginUser: (accessToken: string): void => {
    dispatch({ type: 'LOGIN_USER', payload: accessToken });
  },
  logoutUser: (): void => {
    dispatch({ type: 'LOGOUT_USER', payload: null });
  },
  addLogs: (logs: Log): void => {
    dispatch({ type: 'ADD_LOGS', payload: logs });
  },
  addError: (error: string): void => {
    dispatch({ type: 'ERROR', payload: error });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchData);

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

const FetchData: React.FunctionComponent<{ addLogs: any; addError: any }> = ({
  addLogs,
  addError,
}) => {
  const { authResult } = useAuth();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      if (process.env.AUTH_0_AUDIENCE && process.env.AUTH_0_AUDIENCE!.length > 0) {
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
          return data;
        } catch (error) {
          addError('There was an error accessing the API, make sure the unit is active');
          return error;
        }
      } else {
        addError('API Endpoint not set');
        return 'API Endpoint not set';
      }
    })();
    router.push('/');
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
  addLogs: (logs: any) => {
    dispatch({ type: 'ADD_LOGS', payload: logs });
  },
  addError: (error: string) => {
    dispatch({ type: 'ERROR', payload: error });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(FetchData);

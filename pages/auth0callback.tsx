// src/pages/auth0_callback

import React, { useEffect } from 'react';
import { useAuth } from 'react-use-auth';
import { Typography } from '@material-ui/core';
import Layout from '../components/Layout';

const Auth0Callback: React.FunctionComponent = () => {
  const { handleAuthentication } = useAuth();
  useEffect(() => {
    handleAuthentication({ postLoginRoute: '/' });
  }, []);

  return (
    <Layout>
      <Typography variant="h3">Please hold while we authenticate you...</Typography>
    </Layout>
  );
};

export default Auth0Callback;

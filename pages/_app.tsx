import React, { FC } from 'react';
import { AppProps } from 'next/app';
import { AuthProvider, useAuth } from 'react-use-auth';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
import theme from '../styles/theme';

import { wrapper } from '../redux/store';

export interface Params {
  domain: string | undefined;
  clientID: string | undefined;
  redirectUri: string | undefined;
  audience: string | undefined;
  responseType: string | undefined;
  scope: string | undefined;
}

const WrappedApp: FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();
  const params: Params = {
    domain: process.env.AUTH_0_DOMAIN,
    clientID: process.env.AUTH_0_CLIENT_ID,
    redirectUri: process.env.AUTH_0_REDIRECT_URI,
    audience: process.env.AUTH_0_AUDIENCE,
    responseType: process.env.AUTH_0_RESPONSE_TYPE,
    scope: 'openid profile email',
  };

  return (
    <>
      <Head>
        <title>Surveillo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider
          navigate={router.push}
          auth0_audience_domain={params.audience!}
          auth0_params={params!}
          auth0_domain={params.domain!}
          auth0_client_id={params.clientID!}
          customPropertyNamespace=""
        >
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};

export default wrapper.withRedux(WrappedApp);

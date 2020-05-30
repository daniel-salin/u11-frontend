import { AppProps } from 'next/app';
// import { Auth0Provider } from 'use-auth0-hooks';
import { AuthProvider } from 'react-use-auth';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { useRouter } from 'next/router';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  const params = {
    domain: process.env.AUTH_0_DOMAIN,
    clientID: process.env.AUTH_0_CLIENT_ID,
    redirectUri: process.env.AUTH_0_REDIRECT_URI,
    audience: process.env.AUTH_0_AUDIENCE,
    responseType: process.env.AUTH_0_RESPONSE_TYPE,
    scope: '',
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
          auth0_audience_domain=""
          auth0_params={params}
          auth0_domain="dango.eu.auth0.com"
          auth0_client_id="Wf26uWirC6WNAbtkD1P0jk3S4fVNeqEg"
          customPropertyNamespace=""
        >
          <Component {...pageProps} />
        </AuthProvider>
      </ThemeProvider>
    </>
  );
};
export default MyApp;

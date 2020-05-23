import { AppProps } from 'next/app';
import { Auth0Provider } from 'use-auth0-hooks';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../styles/theme';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <title>Surveillo</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Auth0Provider
          domain="dango.eu.auth0.com"
          clientId="Wf26uWirC6WNAbtkD1P0jk3S4fVNeqEg"
          redirectUri="http://localhost:3000"
        >
          <Component {...pageProps} />
        </Auth0Provider>
      </ThemeProvider>
    </>
  );
};
export default MyApp;

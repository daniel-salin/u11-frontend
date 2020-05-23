// components/Layout.js

import Head from 'next/head';
import Link from 'next/link';
import { Typography } from '@material-ui/core';

type LayoutProps = {
  title?: string;
};
const layoutStyle = {
  margin: 20,
  padding: 20,
  border: '1px solid #DDD',
  borderRadius: '10px',
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontSize: '2em',
  marginRight: '1em',
};

const Layout: React.FunctionComponent<LayoutProps> = ({ children, title }) => (
  <div style={layoutStyle}>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <nav>
        <Link href="/">
          <a style={linkStyle}>
            <Typography variant="body1">Home</Typography>
          </a>
        </Link>{' '}
        <Link href="/about">
          <a style={linkStyle}>
            <Typography variant="body1">About</Typography>
          </a>
        </Link>{' '}
      </nav>
    </header>
    {children}
  </div>
);
export default Layout;

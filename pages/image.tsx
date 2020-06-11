import { NextPage, NextPageContext } from 'next';
import fetch from 'isomorphic-fetch';
import { useEffect, useState } from 'react';
import { Typography, Grid, Button, makeStyles } from '@material-ui/core';
import Router from 'next/router';
import { connect } from 'react-redux';
import Layout from '../components/Layout';

const useStyles = makeStyles({
  container: {
    padding: '1em',
  },
  image: {
    width: '100%',
    height: 'auto',
  },
});
// @ts-ignore
const Image: NextPage<ImageProps> = ({ url, accessToken }) => {
  const classes = useStyles();
  const [image, setImage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchImage = async (fetchUrl: string) => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      const imageSource: string | null = await fetch(fetchUrl, requestOptions)
        .then((response: Response) => response.blob())
        .then((result: Blob) => URL.createObjectURL(result))
        .catch((error: Error) => {
          setErrorMessage(error.message);
          return null;
        });

      if (imageSource) setImage(imageSource);
    };

    fetchImage(url);
  }, []);

  return (
    <Layout title="Image">
      <Grid container>
        <Grid container>
          <Button onClick={() => Router.back()}>Go Back</Button>
        </Grid>
        <Grid container className={classes.container}>
          {image ? (
            <img className={classes.image} src={image} alt="surveillance_img" />
          ) : (
            <>
              {!errorMessage ? (
                <Typography variant="h5">Image loading</Typography>
              ) : (
                <Typography variant="h5">{errorMessage}</Typography>
              )}
            </>
          )}
          <Grid container item />
        </Grid>
      </Grid>
    </Layout>
  );
};

// @ts-ignore
Image.getInitialProps = async (context: NextPageContext) => {
  if (context.query.path) {
    const imagePath = context.query.path.toString().replace('.jpg', '').replace('/', '__');
    const url = `${process.env.AUTH_0_AUDIENCE}/images/${imagePath}`;
    return { url };
  }
  return {};
};

export interface ImageProps extends NextPageContext {
  accessToken: string;
  image: string;
  errorMessage?: string;
  url: string;
}

export interface State {
  user: {
    accessToken: string;
  };
}

const mapStateToProps = (state: State) => {
  return {
    accessToken: state.user.accessToken,
  };
};

export default connect(mapStateToProps, null)(Image);

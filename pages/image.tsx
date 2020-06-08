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

const Image: NextPage<ImageProps> = ({ url, accessToken }) => {
  const classes = useStyles();
  const [image, setImage] = useState<any>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchImage = async () => {
      const myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${accessToken}`);
      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
      };
      const imageBody = await fetch(url, requestOptions)
        .then((response: any) => response.blob())
        .then((result: any) => URL.createObjectURL(result))
        .catch((error: any) => setErrorMessage(error.message));
      setImage(imageBody);
    };
    fetchImage();
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

export interface ImageProps {
  url?: any;
  accessToken?: any;
  image?: any;
  errorMessage?: string;
}

export interface State {
  user: {
    accessToken: string;
  };
}

Image.getInitialProps = async (context: NextPageContext) => {
  if (context.query.path) {
    const imagePath = context.query.path.toString().replace('.jpg', '').replace('/', '__');
    const url = `${process.env.AUTH_0_AUDIENCE}/images/${imagePath}`;
    return { url };
  }
  return {};
};

const mapStateToProps = (state: State) => {
  return {
    accessToken: state.user.accessToken,
  };
};

export default connect(mapStateToProps, null)(Image);

import { Typography, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from 'react-use-auth';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const useStyles = makeStyles({
  container: {
    padding: '1em',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
  },
  '@keyframes blinker': {
    from: { transform: 'rotate(0deg)', filter: 'brightness(60%)' },

    to: { transform: 'rotate(45deg)', filter: 'brightness(126%)' },
  },
  image: {
    animationName: '$blinker',
    animationDuration: '6000ms',
    animationTimingFunction: 'linear',
    animationIterationCount: 'infinite',
    animationDirection: 'alternate',
    display: 'block',
    margin: 'auto',
    width: '50%',
    height: 'auto',
  },
});
const Home: NextPage = () => {
  const classes = useStyles();
  const { isAuthenticated, user } = useAuth();

  return (
    <Layout title="Home">
      <Grid className={classes.container} container>
        <Grid item xs={12}>
          <Typography variant="h1" className={classes.header}>
            {isAuthenticated() ? `Welcome ${user.name}` : 'Surveillo'}
          </Typography>
        </Grid>
        <Grid justify="center" item xs={6}>
          <img className={classes.image} src="/logo.png" alt="logo" />
        </Grid>
      </Grid>
    </Layout>
  );
};

export default Home;

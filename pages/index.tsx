import { Typography, Grid, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

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
  },
});

type HomeProps = {
  title: string;
};

const Home: React.FunctionComponent<HomeProps> = ({ title }) => {
  const classes = useStyles();
  return (
    <Grid className={classes.container} container spacing={4}>
      <Grid item xs={12}>
        <Typography variant="h1" className={classes.header}>
          Surveillo
        </Typography>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h5" className={classes.header}>
              <Link href="/about">About</Link>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h5" className={classes.header}>
              <Link href="/">Home</Link>
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid justify="center" item xs={6}>
        <img className={classes.image} src="/logo.png" alt="logo" />
      </Grid>
    </Grid>
  );
};
export default Home;

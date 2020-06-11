import { Typography, Grid, makeStyles } from '@material-ui/core';
import { NextPage } from 'next';
import Layout from '../components/Layout';

const useStyles = makeStyles({
  importantText: {
    color: 'red',
    marginTop: '0.5em',
  },
  container: {
    padding: '1em',
  },
  header: {
    marginBottom: '0.5em',
  },
});

const About: NextPage = () => {
  const classes = useStyles();
  return (
    <Layout title="About">
      <Grid container className={classes.container}>
        <Typography className={classes.header} variant="h4">
          What is surveillo?
        </Typography>
        <Typography variant="body1">
          Surveillo is a DIY security camera pieced together using a Rasperry Pi 3 with a camera
          module that is connectect to a web interface built using NextJs with OAuth and Typescript.
          The Rasperry Pi itself acts as the backend/server/REST API.
        </Typography>
        <Typography variant="body1">
          When the Raspi is acive and running the script and ngrok tunnel setup it will snap and
          save a picture with the logged timestamp and date if motion is detected. This is done by
          using OpenCV library for Python to compute the individual camera frames and compare them
          to a reference frame with a certain threshold.
        </Typography>
        <Typography variant="body1">
          This project was built as a means to learn more about Python, machine vision and the
          capabilites of a Raspberry Pi.
        </Typography>
        <Typography variant="body2" className={classes.importantText}>
          IF YOU WANT TO TEST THIS OUT MAKE CERTAIN YOU HAVE FULL PERMISSION TO DO IN THE AREA WHERE
          IT IS DEPLOYED. THE LAWS SURROUNDING CCTV SURVEILLANCE VARY DEPENDING ON WHERE IN THE
          WORLD YOU ARE SITUATED. THE GDPR RULING REGARDING CAMERA SURRVEILLANCE AND STORAGE OF
          SURVEILLANCE FOOTAGE ALSO APPLY.
        </Typography>
        <Grid container item />
      </Grid>
    </Layout>
  );
};
export default About;

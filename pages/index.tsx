type HomeProps = {
  title: string;
};

const Home: React.FunctionComponent<HomeProps> = ({ title }) => <h1>{title}</h1>;

export default Home;

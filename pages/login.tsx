import { useAuth } from 'react-use-auth';
import Layout from '../components/Layout';

const Login: React.FunctionComponent = () => {
  const { login, logout } = useAuth();
  return (
    <Layout title="Login">
      <button type="button" onClick={logout}>
        Logout
      </button>
      <button type="button" onClick={login}>
        Login
      </button>
    </Layout>
  );
};

export default Login;

import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.tsx';

const Login = () => {
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <LoginForm />
      
      <Link to="/usuarios">Ver usuarios</Link>
    </div>
  );
};

export default Login;


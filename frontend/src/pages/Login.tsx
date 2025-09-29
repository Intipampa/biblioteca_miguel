import { Link } from 'react-router-dom';
import LoginForm from '../components/loginForm';

const Login = () => {
  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <LoginForm />
      
      <Link to="/registro">
        <button>Crear cuenta</button>
      </Link>
      <Link to="/usuarios">Ver usuarios</Link>
    </div>
  );
};

export default Login;


// src/components/LoginForm.tsx

import { useState } from 'react';
import API from '../api/api';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    correo: '',
    password: '',
  });
  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await API.post('/auth/login', form);
      setMensaje(res.data.mensaje);

      // Aquí podrías guardar el token si usas JWT en el backend
      // localStorage.setItem('token', res.data.token);

      navigate('/usuarios'); // Redirigir a la "bandeja de usuarios"
    } catch (err: any) {
      setMensaje(err.response?.data?.error || 'Error al iniciar sesión.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="correo"
        type="email"
        placeholder="Correo"
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={handleChange}
        required
      />
      <button type="submit">Iniciar Sesión</button>

      <p>{mensaje}</p>

      <p>
        ¿No tienes cuenta? <Link to="/registro">Crear cuenta</Link>
      </p>
    </form>
  );
};

export default LoginForm;

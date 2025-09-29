import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

const RegistroForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    password: '',
    confirmarPassword: '',
  });

  const [mensaje, setMensaje] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validaciones básicas
    if (form.password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (form.password !== form.confirmarPassword) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    try {
      const res = await API.post('/auth/registro', form);
      setMensaje(res.data.mensaje);

      // Espera 1 segundo y redirige al login
      setTimeout(() => navigate('/login'), 1000);
    } catch (err: any) {
      setMensaje(err.response?.data?.error || 'Error al registrar usuario.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" onChange={handleChange} required />
        <input name="correo" type="email" placeholder="Correo" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña (mínimo 8 caracteres)" onChange={handleChange} required />
        <input name="confirmarPassword" type="password" placeholder="Confirmar Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>{mensaje}</p>

      <p>¿Ya tienes una cuenta?</p>
      <button onClick={() => navigate('/login')}>Ir al Login</button>
    </div>
  );
};

export default RegistroForm;

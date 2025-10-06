import { useEffect, useState } from 'react';
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
    edad: '',
    ci: '',
    paisId: '',
    generoId: '',
  });

  const [paises, setPaises] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resPaises, resGeneros] = await Promise.all([
          API.get('/utils/paises'),
          API.get('/utils/generos'),
        ]);
        setPaises(resPaises.data);
        setGeneros(resGeneros.data);
      } catch (error) {
        console.error('Error al cargar países o géneros');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password.length < 8) {
      setMensaje('La contraseña debe tener al menos 8 caracteres.');
      return;
    }

    if (form.password !== form.confirmarPassword) {
      setMensaje('Las contraseñas no coinciden.');
      return;
    }

    try {
      const payload = {
        nombre: form.nombre,
        apellido: form.apellido,
        correo: form.correo,
        password: form.password,
        confirmarPassword: form.confirmarPassword,
        edad: parseInt(form.edad),
        ci: form.ci,
        paisId: parseInt(form.paisId),
        generoId: parseInt(form.generoId),
      };

      const res = await API.post('/auth/registro', payload);
      setMensaje(res.data.mensaje);

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
        <input name="edad" type="number" placeholder="Edad" onChange={handleChange} required />
        <input name="ci" placeholder="Cédula de Identidad" onChange={handleChange} required />

        <select name="paisId" onChange={handleChange} required>
          <option value="">Seleccione un país</option>
          {paises.map((pais: any) => (
            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
          ))}
        </select>

        <select name="generoId" onChange={handleChange} required>
          <option value="">Seleccione un género</option>
          {generos.map((genero: any) => (
            <option key={genero.id} value={genero.id}>{genero.nombre}</option>
          ))}
        </select>

        <button type="submit">Registrarse</button>
      </form>

      <p>{mensaje}</p>
      <p>¿Ya tienes una cuenta?</p>
      <button onClick={() => navigate('/login')}>Ir al Login</button>
    </div>
  );
};

export default RegistroForm;

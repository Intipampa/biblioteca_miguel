import { useEffect, useState } from 'react';
import API from '../api/api';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  edad: number;
  ci: string;
  paisId: number;
  generoId: number;
  pais: { nombre: string };
  genero: { nombre: string };
}

interface Pais {
  id: number;
  nombre: string;
}

interface Genero {
  id: number;
  nombre: string;
}

const UsuariosTable = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [paises, setPaises] = useState<Pais[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState<Usuario | null>(null);

  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    edad: 0,
    ci: '',
    paisId: 1,
    generoId: 1
  });

  const cargarDatos = async () => {
    const [usuariosRes, paisesRes, generosRes] = await Promise.all([
      API.get('/usuarios'),
      API.get('/paises'),
      API.get('/generos'),
    ]);

    setUsuarios(usuariosRes.data);
    setPaises(paisesRes.data);
    setGeneros(generosRes.data);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (modoEdicion && usuarioEditando) {
      await API.put(`/usuarios/${usuarioEditando.id}`, form);
    } else {
      await API.post('/usuarios', form);
    }
    setForm({ nombre: '', apellido: '', correo: '', edad: 0, ci: '', paisId: 1, generoId: 1 });
    setModoEdicion(false);
    setUsuarioEditando(null);
    await cargarDatos();
  };

  const handleEditar = (usuario: Usuario) => {
    setUsuarioEditando(usuario);
    setForm({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      edad: usuario.edad,
      ci: usuario.ci,
      paisId: usuario.paisId,
      generoId: usuario.generoId
    });
    setModoEdicion(true);
  };

  return (
    <div>
      <h2>Usuarios Registrados</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Edad</th>
            <th>CI</th>
            <th>País</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(usuario => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.correo}</td>
              <td>{usuario.edad}</td>
              <td>{usuario.ci}</td>
              <td>{usuario.pais?.nombre}</td>
              <td>{usuario.genero?.nombre}</td>
              <td>
                <button onClick={() => handleEditar(usuario)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{modoEdicion ? 'Editar Usuario' : 'Agregar Usuario'}</h3>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
        <input name="apellido" placeholder="Apellido" value={form.apellido} onChange={handleChange} required />
        <input name="correo" type="email" placeholder="Correo" value={form.correo} onChange={handleChange} required />
        <input name="edad" type="number" placeholder="Edad" value={form.edad} onChange={handleChange} required />
        <input name="ci" placeholder="Cédula de Identidad" value={form.ci} onChange={handleChange} required />

        <select name="paisId" value={form.paisId} onChange={handleChange}>
          {paises.map(pais => (
            <option key={pais.id} value={pais.id}>{pais.nombre}</option>
          ))}
        </select>

        <select name="generoId" value={form.generoId} onChange={handleChange}>
          {generos.map(genero => (
            <option key={genero.id} value={genero.id}>{genero.nombre}</option>
          ))}
        </select>

        <button type="submit">{modoEdicion ? 'Actualizar' : 'Agregar'}</button>
      </form>
    </div>
  );
};

export default UsuariosTable;

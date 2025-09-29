import { useEffect, useState } from 'react';
import API from '../api/api';

interface Usuario {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  creadoEn?: string;
}

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  useEffect(() => {
    const obtenerUsuarios = async () => {
      try {
        const res = await API.get('/usuarios');
        setUsuarios(res.data);
      } catch (err) {
        console.error('Error al obtener usuarios', err);
      }
    };

    obtenerUsuarios();
  }, []);

  return (
    <div>
      <h2>Bandeja de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Creado En</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.correo}</td>
              <td>{u.creadoEn ? new Date(u.creadoEn).toLocaleString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Usuarios;

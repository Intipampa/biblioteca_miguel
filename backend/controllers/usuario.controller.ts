import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      include: {
        pais: true,
        genero: true
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};
export const crearUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, correo, password, edad, ci, paisId, generoId } = req.body;

  try {
    const nuevoUsuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        password,
        edad,
        ci,
        paisId,
        generoId
      }
    });

    res.status(201).json(nuevoUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};
export const editarUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { nombre, apellido, correo, edad, ci, paisId, generoId } = req.body;

  try {
    const usuarioActualizado = await prisma.usuario.update({
      where: { id: Number(id) },
      data: {
        nombre,
        apellido,
        correo,
        edad,
        ci,
        paisId,
        generoId
      }
    });

    res.json(usuarioActualizado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al editar usuario' });
  }
};


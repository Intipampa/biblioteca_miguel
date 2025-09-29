import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; // Importas el cliente de Prisma

const prisma = new PrismaClient(); // Instancias Prisma

// Esta función maneja la petición GET a /api/libros
export const obtenerLibros = async (req: Request, res: Response) => {
  try {
    const libros = await prisma.libro.findMany(); // Consulta todos los libros
    res.json(libros); // Devuelve el array de libros en formato JSON
  } catch (error) {
    console.error('Error al obtener libros:', error);
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

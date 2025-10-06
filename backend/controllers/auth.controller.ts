import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

export const registrarUsuario = async (req: Request, res: Response) => {
  const {
    nombre,
    apellido,
    correo,
    password,
    confirmarPassword,
    edad,
    ci,
    paisId,
    generoId,
  } = req.body;

  // Validaciones básicas
  if (!nombre || !apellido || !correo || !password || !confirmarPassword || !edad || !ci || !paisId || !generoId) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' });
  }

  if (password !== confirmarPassword) {
    return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
  }

  try {
    // Verificar si ya existe un usuario con ese correo o ci
    const [correoExistente, ciExistente] = await Promise.all([
      prisma.usuario.findUnique({ where: { correo } }),
      prisma.usuario.findUnique({ where: { ci } }),
    ]);

    if (correoExistente) {
      return res.status(400).json({ error: 'El correo ya está registrado.' });
    }

    if (ciExistente) {
      return res.status(400).json({ error: 'La cédula de identidad ya está registrada.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        password: hashedPassword,
        edad: Number(edad),
        ci,
        paisId: Number(paisId),
        generoId: Number(generoId),
      },
    });

    res.status(201).json({ mensaje: 'Usuario registrado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
};

export const loginUsuario = async (req: Request, res: Response) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ error: 'Correo y contraseña son obligatorios.' });
  }

  try {
    // Verificar si el usuario existe
    const usuario = await prisma.usuario.findUnique({
      where: { correo },
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Comparar contraseña
    const esPasswordValido = await bcrypt.compare(password, usuario.password);
    if (!esPasswordValido) {
      return res.status(401).json({ error: 'Credenciales inválidas.' });
    }

    // Si todo está bien
    res.status(200).json({
      mensaje: 'Inicio de sesión exitoso.',
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        correo: usuario.correo,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/paises', async (req, res) => {
  const paises = await prisma.pais.findMany();
  res.json(paises);
});

router.get('/generos', async (req, res) => {
  const generos = await prisma.genero.findMany();
  res.json(generos);
});

export default router;

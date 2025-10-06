import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
  const generos = await prisma.genero.findMany();
  res.json(generos);
});

export default router;

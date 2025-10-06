import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/', async (_req, res) => {
  const paises = await prisma.pais.findMany();
  res.json(paises);
});

export default router;

import express from 'express';
import { listarUsuarios } from '../controllers/usuario.controller';

const router = express.Router();

router.get('/', listarUsuarios);

export default router;

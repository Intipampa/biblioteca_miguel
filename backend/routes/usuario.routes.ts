import { Router } from 'express';
import {
  obtenerUsuarios,
  crearUsuario,
  editarUsuario,
} from '../controllers/usuario.controller';

const router = Router();

router.get('/', obtenerUsuarios);
router.post('/', crearUsuario);
router.put('/:id', editarUsuario);

export default router;

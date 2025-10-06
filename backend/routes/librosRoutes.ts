import express from 'express';
import { obtenerLibros } from '../controllers/librosController'; 

const router = express.Router();

router.get('/libros', obtenerLibros);

export default router;

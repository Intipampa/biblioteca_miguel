import express from 'express';
import { obtenerLibros } from '../controllers/librosController'; // Importas la función

const router = express.Router();

router.get('/libros', obtenerLibros); // Si hacen GET a /api/libros -> llama a obtenerLibros

export default router;

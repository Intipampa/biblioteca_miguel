import express from 'express';
import cors from 'cors';

import librosRoutes from './routes/librosRoutes';
import authRoutes from './routes/auth.routes'; 
import usuarioRoutes from './routes/usuario.routes';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/libros', librosRoutes);  
app.use('/api/auth', authRoutes);      // http://localhost:3000
app.use('/api/usuarios', usuarioRoutes);  
// Inicio del servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});

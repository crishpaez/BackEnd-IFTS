import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import areasRoutes from './routes/areasRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import indexRoutes from './routes/indexRoutes.js';
import 'dotenv/config';
import { connectDB } from './config/db.js';

/* 
import rolesRoutes from './routes/rolesRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js'; */

const app = express();

// Configuración de __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Configuración de vistas (Pug)
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Conectar Mongo antes de montar rutas
await connectDB();

// Rutas
app.use('/', indexRoutes);
app.use('/areas', areasRoutes);
app.use('/empleados', empleadosRoutes);
/* 
app.use('/roles', rolesRoutes);
app.use('/tareas', tareasRoutes); */

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});







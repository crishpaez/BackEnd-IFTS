
import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import conectarDB from './config/db.js';

import indexRoutes from './routes/indexRoutes.js';
import areasRoutes from './routes/areasRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a la base de datos
conectarDB();

// Configuración de middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

// Configuración de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', indexRoutes);
app.use('/areas', areasRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/roles', rolesRoutes);
app.use('/tareas', tareasRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

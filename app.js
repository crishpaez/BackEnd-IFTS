import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
dotenv.config();

// Importar rutas
import indexRoutes from './routes/indexRoutes.js';
import areasRoutes from './routes/areasRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';
import tareasRoutes from './routes/tareasRoutes.js';

const app = express();

// Configuración de paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use('/styles', express.static(path.join(__dirname, 'styles')));

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Conexión a MongoDB Atlas
const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('No se encontró la variable MONGODB_URI en .env');
  process.exit(1);
}

mongoose.connect(uri)
  .then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error de conexión a MongoDB Atlas:', err));

// Rutas
app.use('/', indexRoutes);
app.use('/areas', areasRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/roles', rolesRoutes);
app.use('/tareas', tareasRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.render('home', { titulo: 'Inicio', hojaEstilo: 'home' });
});

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

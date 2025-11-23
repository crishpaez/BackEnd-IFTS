import express from 'express';
import mongoose from 'mongoose';
import methodOverride from 'method-override';
import path from 'path';
import { fileURLToPath } from 'url';

// Importar rutas
import areasRoutes from './routes/areasRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
import rolesRoutes from './routes/rolesRoutes.js';

// Importar modelo de roles para inicialización
import rolModelo from './models/Rol.js';

const app = express();

// Configuración de paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de vistas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Conexión a MongoDB
const uri = 'mongodb+srv://Proyecto:BackEnd@cluster0.j35ltw9.mongodb.net/';

mongoose.connect(uri)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');
    await inicializarRoles(); // carga automática de roles
  })
  .catch(err => console.error('Error de conexión a MongoDB Atlas:', err));


// Inicialización automática de roles fijos
async function inicializarRoles() {
  const roles = await rolModelo.obtenerRoles();
  if (roles.length === 0) {
    await rolModelo.agregarRol('Administrativo', 'Gestiona documentación, trámites y soporte administrativo.');
    await rolModelo.agregarRol('Operario', 'Realiza tareas operativas y de producción en planta.');
    await rolModelo.agregarRol('Chofer', 'Conduce vehículos y se encarga de la logística de transporte.');
    console.log('Roles iniciales cargados automáticamente');
  }
}

// Rutas
app.use('/areas', areasRoutes);
app.use('/empleados', empleadosRoutes);
app.use('/roles', rolesRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.render('index', { titulo: 'Inicio', hojaEstilo: 'index' });
});

// Servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

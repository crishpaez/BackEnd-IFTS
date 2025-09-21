import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import methodOverride from 'method-override';
import areasRoutes from './routes/areasRoutes.js';
import empleadosRoutes from './routes/empleadosRoutes.js';
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

// Rutas
app.get('/', (req, res) => {
  res.send('Bienvenida a LogiFlow');
});

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

/* 
const tareasRoutes = require('./routes/tareasRoutes');
const rolesRoutes = require('./routes/rolesRoutes');


const { obtenerRoles } = require('./controllers/rolesController');

app.get('/roles', async (req, res) => {
  try {
    const roles = await obtenerRoles();
    res.render('roles/listado', { roles });
  } catch (error) {
    res.status(500).send('Error al cargar roles');
  }
});


const { obtenerTareas } = require('./controllers/tareasController');

app.get('/tareas', async (req, res) => {
  try {
    const tareas = await obtenerTareas();
    res.render('tareas/listado', { tareas });
  } catch (error) {
    res.status(500).send('Error al cargar tareas');
  }
});
 */







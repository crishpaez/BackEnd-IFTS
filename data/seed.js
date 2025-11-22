// seed.js
import 'dotenv/config';
import { connectDB } from './config/db.js';
import areaModelo from './models/Area.js';
import empleadoModelo from './models/Empleado.js';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function readJson(relPath) {
  const p = path.join(__dirname, relPath);
  const txt = await fs.readFile(p, 'utf-8');
  return JSON.parse(txt);
}

async function run() {
  await connectDB();

  const areas = await readJson('./data/areas.json').catch(() => []);
  const empleados = await readJson('./data/empleados.json').catch(() => []);

  console.log('Reinicializando colecciones...');
  await areaModelo.eliminarTodasLasAreas();
  await empleadoModelo.eliminarTodasLosEmpleados();

  if (areas.length) {
    await areaModelo.guardarAreas(areas);
    console.log(`+ Cargadas ${areas.length} áreas`);
  }
  if (empleados.length) {
    await empleadoModelo.guardarEmpleados(empleados);
    console.log(`+ Cargados ${empleados.length} empleados`);
  }

  console.log('✔️ Seed OK');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
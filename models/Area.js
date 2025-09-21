import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarId } from '../utils/idGenerator.js';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/areas.json');

// Funcion para obtener todas las areas
async function obtenerAreas() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Funcion para guardar las areas en el archivo json
async function guardarAreas(areas) {
  await writeFile(filePath, JSON.stringify(areas, null, 2));
}

// Funcion para agregar una area
async function agregarArea(nombre, descripcion) {
  const areas = await obtenerAreas();
  const nuevaArea = {
    id: generarId(areas),
    nombre, // operaciones | almacén | administración
    descripcion
  };
  areas.push(nuevaArea);
  await guardarAreas(areas);
  return nuevaArea;
}

// Funcion para actualizar un area con su id
async function actualizarArea(id, nuevosDatos) {
  const areas = await obtenerAreas();
  const index = areas.findIndex(a => a.id === id);
  if (index === -1) return null;

  areas[index] = { ...areas[index], ...nuevosDatos};
  await guardarAreas(areas);
  return areas[index];
}

// Funcion para eliminar un area por su id
async function eliminarAreaPorId(id) {
  const areas = await obtenerAreas();
  const actualizadas = areas.filter(e => e.id !== id);
  await guardarAreas(actualizadas);
}

// Funcion para eliminar todas las areas
async function eliminarTodasLasAreas() {
  await guardarAreas([]); // Sobrescribe el archivo con un array vacío
}


const areaModelo = { obtenerAreas, guardarAreas, agregarArea, actualizarArea, eliminarAreaPorId, eliminarTodasLasAreas };
export default areaModelo;
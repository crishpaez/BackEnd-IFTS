import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarId } from '../utils/idGenerator.js';

// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/roles.json');

// Funcion para obtener todos los roles
async function obtenerRoles() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

//Reemplazar por funciones
/* class Rol {
  constructor({ id, nombre, descripcion }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
  }
}

module.exports = Rol; */

const rolModelo = { obtenerRoles };
export default rolModelo;
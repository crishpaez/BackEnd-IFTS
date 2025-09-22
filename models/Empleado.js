import { readFile, writeFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { generarId } from '../utils/idGenerator.js';


// Ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '../data/empleados.json');

// Funcion para obtener todos los empleados
async function obtenerEmpleados() {
  try {
    const data = await readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Funcion para obtener un empleado por id
async function obtenerEmpleadoPorId(id) {
  const empleados = await obtenerEmpleados();
  return empleados.find(e => e.id == id) || null;
}


// Funcion para guardar los empleados en el archivo json
async function guardarEmpleados(empleados) {
  await writeFile(filePath, JSON.stringify(empleados, null, 2));
}

// Funcion para agregar un empleado
async function agregarEmpleado(nombre, apellido, rol, area, activo) {
  const empleados = await obtenerEmpleados();
  const nuevoEmpleado = {
    id: generarId(empleados),
    nombre,
    apellido,
    rol,      // administrador | operador | supervisor
    area,     // operaciones | almacén | administración
    activo: activo === 'true'
  };
  empleados.push(nuevoEmpleado);
  await guardarEmpleados(empleados);
  return nuevoEmpleado;
}

// Funcion para actualizar un empleado por id -- desactivar, cambiar de rol, cambiar de area
async function actualizarEmpleadoPorId(id, nuevosDatos) {
  const empleados = await obtenerEmpleados();
  const index = empleados.findIndex(e => e.id == id);
  if (index === -1) return null;

  // Convertir activo a booleano si existe
  if ('activo' in nuevosDatos) {
    nuevosDatos.activo = nuevosDatos.activo === 'true';
  }

  empleados[index] = { ...empleados[index], ...nuevosDatos };
  await guardarEmpleados(empleados);
  return empleados[index];
}



// Funcion para eliminar un empleado por su id
async function eliminarEmpleadoPorId(id) {
  const empleados = await obtenerEmpleados();
  const index = empleados.findIndex(e => e.id === id);
  if (index === -1) return null;

  const eliminado = empleados[index];
  empleados.splice(index, 1);
  await guardarEmpleados(empleados);
  return eliminado;
}

// Funcion para eliminar todas los empleados
async function eliminarTodasLosEmpleados() {
  await guardarEmpleados([]); // Sobrescribe el archivo con un array vacío
}


const empleadoModelo = { obtenerEmpleados, obtenerEmpleadoPorId, guardarEmpleados, agregarEmpleado, actualizarEmpleadoPorId, eliminarEmpleadoPorId, eliminarTodasLosEmpleados };
export default empleadoModelo;
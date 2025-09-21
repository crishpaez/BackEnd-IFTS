const fs = require('fs').promises;
const path = require('path');
const Tarea = require('../models/Tarea');

const rutaArchivo = path.join(__dirname, '../data/tareas.json');

// Leer todas las tareas
async function obtenerTareas() {
  const data = await fs.readFile(rutaArchivo, 'utf-8');
  return JSON.parse(data);
}

// Crear una nueva tarea
async function crearTarea(datos) {
  const tareas = await obtenerTareas();
  const nuevaTarea = new Tarea({
    id: Date.now().toString(),
    ...datos
  });
  tareas.push(nuevaTarea);
  await fs.writeFile(rutaArchivo, JSON.stringify(tareas, null, 2));
  return nuevaTarea;
}

// Filtrar tareas por estado, prioridad, fecha o área
async function filtrarTareas({ estado, prioridad, area }) {
  const tareas = await obtenerTareas();
  return tareas.filter(t => {
    return (!estado || t.estado === estado) &&
           (!prioridad || t.prioridad === prioridad) &&
           (!area || t.area === area);
  });
}

// Actualizar una tarea por ID
async function actualizarTarea(id, nuevosDatos) {
  const tareas = await obtenerTareas();
  const index = tareas.findIndex(t => t.id === id);
  if (index === -1) return null;

  tareas[index] = { ...tareas[index], ...nuevosDatos };
  await fs.writeFile(rutaArchivo, JSON.stringify(tareas, null, 2));
  return tareas[index];
}

// Eliminar una tarea por ID
async function eliminarTarea(id) {
  const tareas = await obtenerTareas();
  const tareasFiltradas = tareas.filter(t => t.id !== id);
  await fs.writeFile(rutaArchivo, JSON.stringify(tareasFiltradas, null, 2));
  return tareasFiltradas.length < tareas.length;
}

module.exports = {
  obtenerTareas,
  crearTarea,
  filtrarTareas,
  actualizarTarea,
  eliminarTarea
};
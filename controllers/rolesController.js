const fs = require('fs').promises;
const path = require('path');
const Rol = require('../models/Rol');

const rutaArchivo = path.join(__dirname, '../data/roles.json');

// Leer todos los roles
async function obtenerRoles() {
  const data = await fs.readFile(rutaArchivo, 'utf-8');
  return JSON.parse(data);
}

// Crear un nuevo rol
async function crearRol(datos) {
  const roles = await obtenerRoles();
  const nuevoRol = new Rol({
    id: Date.now().toString(),
    ...datos
  });
  roles.push(nuevoRol);
  await fs.writeFile(rutaArchivo, JSON.stringify(roles, null, 2));
  return nuevoRol;
}

// Actualizar un rol por ID
async function actualizarRol(id, nuevosDatos) {
  const roles = await obtenerRoles();
  const index = roles.findIndex(r => r.id === id);
  if (index === -1) return null;

  roles[index] = { ...roles[index], ...nuevosDatos };
  await fs.writeFile(rutaArchivo, JSON.stringify(roles, null, 2));
  return roles[index];
}

// Eliminar un rol por ID
async function eliminarRol(id) {
  const roles = await obtenerRoles();
  const rolesFiltrados = roles.filter(r => r.id !== id);
  await fs.writeFile(rutaArchivo, JSON.stringify(rolesFiltrados, null, 2));
  return rolesFiltrados.length < roles.length;
}

module.exports = {
  obtenerRoles,
  crearRol,
  actualizarRol,
  eliminarRol
};
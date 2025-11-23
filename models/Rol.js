// models/Rol.js
const rolesPredefinidos = [
  { id: 1, nombre: 'Administrativo', descripcion: 'Gestiona documentación, trámites y soporte administrativo.' },
  { id: 2, nombre: 'Operario', descripcion: 'Realiza tareas operativas y de producción en planta.' },
  { id: 3, nombre: 'Chofer', descripcion: 'Conduce vehículos y se encarga de la logística de transporte.' }
];

export async function obtenerRoles() {
  return rolesPredefinidos;
}

export async function obtenerRolPorId(id) {
  return rolesPredefinidos.find(r => r.id === Number(id));
}

const rolModelo = { obtenerRoles, obtenerRolPorId };
export default rolModelo;

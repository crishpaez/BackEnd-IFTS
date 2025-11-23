// controllers/rolesController.js
import rolModelo from '../models/Rol.js';

async function mostrarRoles(req, res) {
  const roles = await rolModelo.obtenerRoles();
  res.render('roles/listado', {
    titulo: 'Lista de Roles',
    roles,
    hojaEstilo: 'roles/listado'
  });
}

async function detalleRol(req, res) {
  const id = parseInt(req.params.id);
  const rol = await rolModelo.obtenerRolPorId(id);
  if (!rol) return res.status(404).send('Rol no encontrado');

  res.render('roles/detalle', {
    titulo: `Detalle del Rol: ${rol.nombre}`,
    rol,
    hojaEstilo: 'roles/detalle'
  });
}


const rolesController = { mostrarRoles, detalleRol };
export default rolesController;

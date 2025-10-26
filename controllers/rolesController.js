import Rol from '../modelsDB/Rol.js';
import { responder } from '../utils/respuestas.js';

export async function mostrarRoles(req, res) {
  try {
    const roles = await Rol.find();
    responder(req, res, 200, 'Listado de Roles', roles, null, 'roles/listado');
  } catch (error) {
    responder(req, res, 500, 'Error al obtener roles');
  }
}

export function formularioNuevoRol(req, res) {
  res.render('roles/formulario', {
    titulo: 'Crear nuevo rol',
    mensaje: req.query.mensaje || null
  });
}

export async function guardarRol(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    const nuevo = await Rol.create({ nombre, descripcion });
    responder(req, res, 201, 'Rol creado correctamente', nuevo, '/roles');
  } catch (error) {
    responder(req, res, 400, 'Error al crear rol');
  }
}

export async function formularioEditarRol(req, res) {
  try {
    const rol = await Rol.findById(req.params.id);
    if (!rol) return responder(req, res, 404, 'Rol no encontrado');
    res.render('roles/editar', {
      titulo: 'Editar rol',
      rol,
      mensaje: req.query.mensaje || null
    });
  } catch (error) {
    responder(req, res, 500, 'Error al cargar formulario de edición');
  }
}

export async function actualizarRol(req, res) {
  try {
    const actualizado = await Rol.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return responder(req, res, 404, 'Rol no encontrado');
    responder(req, res, 200, 'Rol actualizado correctamente', actualizado, '/roles');
  } catch (error) {
    responder(req, res, 500, 'Error al actualizar rol');
  }
}

export async function eliminarRol(req, res) {
  try {
    const eliminado = await Rol.findByIdAndDelete(req.params.id);
    if (!eliminado) return responder(req, res, 404, 'Rol no encontrado');
    responder(req, res, 200, 'Rol eliminado correctamente', eliminado, '/roles');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar rol');
  }
}

export async function eliminarTodosLosRoles(req, res) {
  try {
    await Rol.deleteMany({});
    responder(req, res, 200, 'Todos los roles fueron eliminados', null, '/roles');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar todos los roles');
  }
}

const rolesController = {
  mostrarRoles,
  formularioNuevoRol,
  guardarRol,
  formularioEditarRol,
  actualizarRol,
  eliminarRol,
  eliminarTodosLosRoles
};

export default rolesController;

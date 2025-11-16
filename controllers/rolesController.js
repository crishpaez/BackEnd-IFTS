import Rol from '../models/Rol.js';
import { responder } from '../utils/respuestas.js';

// Listar todos los roles
export async function obtenerRoles(req, res) {
  try {
    const roles = await Rol.find();
    res.render('roles/listado', { 
      roles, 
      mensajeExito: req.query.mensajeExito || null,
      hojaEstilo: 'roles/listado' 
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener roles');
  }
}

// Mostrar formulario de creación
export function mostrarFormulario(req, res) {
  res.render('roles/formulario', { 
    hojaEstilo: 'roles/formulario'  
  });
}

// Crear un nuevo rol
export async function crearRol(req, res) {
  try {
    const nuevoRol = new Rol({
      nombre: req.body.nombre,
      descripcion: req.body.descripcion
    });
    await nuevoRol.save();
    res.redirect('/roles?mensajeExito=Rol creado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear rol');
  }
}

// Eliminar un rol por ID
export async function eliminarRol(req, res) {
  try {
    const eliminado = await Rol.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).send('Rol no encontrado');
    }
    res.redirect('/roles?mensajeExito=Rol eliminado correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar rol');
  }
}

const rolesController = {
  obtenerRoles,
  mostrarFormulario,
  crearRol,
  eliminarRol
};

export default rolesController;
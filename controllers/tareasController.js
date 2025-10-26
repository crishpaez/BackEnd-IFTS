import Tarea from '../modelsDB/Tarea.js';
import { responder } from '../utils/respuestas.js';

// Mostrar todas las tareas
export async function mostrarTareas(req, res) {
  try {
    const tareas = await Tarea.find().populate('empleado');
    responder(req, res, 200, 'Listado de Tareas', tareas, null, 'tareas/listado');
  } catch (error) {
    responder(req, res, 500, 'Error al obtener tareas');
  }
}

// Formulario para crear nueva tarea
export function formularioNuevaTarea(req, res) {
  res.render('tareas/formulario', {
    titulo: 'Crear nueva tarea',
    mensaje: req.query.mensaje || null
  });
}

// Guardar nueva tarea
export async function guardarTarea(req, res) {
  try {
    const { titulo, descripcion, empleado, fecha } = req.body;
    const nueva = await Tarea.create({ titulo, descripcion, empleado, fecha });
    responder(req, res, 201, 'Tarea creada correctamente', nueva, '/tareas');
  } catch (error) {
    responder(req, res, 400, 'Error al crear tarea');
  }
}

// Formulario para editar tarea
export async function formularioEditarTarea(req, res) {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return responder(req, res, 404, 'Tarea no encontrada');
    res.render('tareas/editar', {
      titulo: 'Editar tarea',
      tarea,
      mensaje: req.query.mensaje || null
    });
  } catch (error) {
    responder(req, res, 500, 'Error al cargar formulario de edición');
  }
}

// Actualizar tarea
export async function actualizarTarea(req, res) {
  try {
    const actualizada = await Tarea.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return responder(req, res, 404, 'Tarea no encontrada');
    responder(req, res, 200, 'Tarea actualizada correctamente', actualizada, '/tareas');
  } catch (error) {
    responder(req, res, 500, 'Error al actualizar tarea');
  }
}

// Eliminar tarea
export async function eliminarTarea(req, res) {
  try {
    const eliminada = await Tarea.findByIdAndDelete(req.params.id);
    if (!eliminada) return responder(req, res, 404, 'Tarea no encontrada');
    responder(req, res, 200, 'Tarea eliminada correctamente', eliminada, '/tareas');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar tarea');
  }
}

// Eliminar todas las tareas
export async function eliminarTodasLasTareas(req, res) {
  try {
    await Tarea.deleteMany({});
    responder(req, res, 200, 'Todas las tareas fueron eliminadas', null, '/tareas');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar todas las tareas');
  }
}

const tareasController = {
  mostrarTareas,
  formularioNuevaTarea,
  guardarTarea,
  formularioEditarTarea,
  actualizarTarea,
  eliminarTarea,
  eliminarTodasLasTareas
};

export default tareasController;

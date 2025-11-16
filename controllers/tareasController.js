import Tarea from '../models/Tarea.js';
import { responder } from '../utils/respuestas.js';

// Listar todas las tareas
export async function obtenerTareas(req, res) {
  try {
    const tareas = await Tarea.find();
    res.render('tareas/listado', { 
      tareas, 
      mensajeExito: req.query.mensajeExito || null,
      hojaEstilo: 'tareas/listado'  
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener tareas');
  }
}

// Mostrar formulario de creación
export function mostrarFormulario(req, res) {
  res.render('tareas/formulario', { 
    hojaEstilo: 'tareas/formulario'  
  });
}

// Crear nueva tarea
export async function crearTarea(req, res) {
  try {
    const nuevaTarea = new Tarea({
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      estado: req.body.estado || 'pendiente'
    });
    await nuevaTarea.save();
    res.redirect('/tareas?mensajeExito=Tarea creada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al crear tarea');
  }
}

// Mostrar formulario de edición
export async function editarTarea(req, res) {
  try {
    const tarea = await Tarea.findById(req.params.id);
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.render('tareas/editar', { 
      tarea,
      hojaEstilo: 'tareas/editar'  
    });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al cargar tarea');
  }
}

// Actualizar tarea
export async function actualizarTarea(req, res) {
  try {
    await Tarea.findByIdAndUpdate(req.params.id, {
      titulo: req.body.titulo,
      descripcion: req.body.descripcion,
      estado: req.body.estado
    });
    res.redirect('/tareas?mensajeExito=Tarea actualizada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al actualizar tarea');
  }
}

// Eliminar tarea
export async function eliminarTarea(req, res) {
  try {
    await Tarea.findByIdAndDelete(req.params.id);
    res.redirect('/tareas?mensajeExito=Tarea eliminada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar tarea');
  }
}

const tareasController = {
  obtenerTareas,
  mostrarFormulario,
  crearTarea,
  editarTarea,
  actualizarTarea,
  eliminarTarea
};

export default tareasController;
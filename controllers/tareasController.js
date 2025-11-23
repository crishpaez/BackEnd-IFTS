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

// Mostrar tarea por ID
export async function mostrarTareaPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    const tarea = await Tarea.findOne({ id });

    if (!tarea) return res.status(404).send('Tarea no encontrada');

    res.render('tareas/detalle', {
      titulo: 'Detalle de Tarea',
      tarea,
      hojaEstilo: 'tareas/detalle'
    });
  } catch (error) {
    console.error('Error al obtener tarea:', error);
    res.status(500).send('Error interno al cargar tarea');
  }
}

// Crear nueva tarea
export async function crearTarea(req, res) {
  try {
    const ultima = await Tarea.findOne().sort({ id: -1 });
    const nuevoId = ultima ? ultima.id + 1 : 1;

    const nuevaTarea = new Tarea({
      id: nuevoId,
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
    const id = parseInt(req.params.id);
    const tarea = await Tarea.findOne({ id });
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
    const id = parseInt(req.params.id);
    await Tarea.findOneAndUpdate({ id }, {
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

// Eliminar real por id numérico
export async function eliminarTarea(req, res) {
  try {
    const id = parseInt(req.params.id);
    const tarea = await Tarea.findOneAndDelete({ id });
    if (!tarea) return res.status(404).send('Tarea no encontrada');
    res.redirect('/tareas?mensajeExito=Tarea eliminada correctamente');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al eliminar tarea');
  }
}


const tareasController = {
  obtenerTareas,
  mostrarTareaPorId,
  crearTarea,
  editarTarea,
  actualizarTarea,
  eliminarTarea
};

export default tareasController;

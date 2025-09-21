const express = require('express');
const router = express.Router();
const {
  obtenerTareas,
  crearTarea,
  filtrarTareas,
  actualizarTarea,
  eliminarTarea
} = require('../controllers/tareasController');

// Obtener todas las tareas
router.get('/', async (req, res) => {
  try {
    const filtros = req.query;
    const tareas = Object.keys(filtros).length
      ? await filtrarTareas(filtros)
      : await obtenerTareas();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener tareas' });
  }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
  try {
    const nueva = await crearTarea(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear tarea' });
  }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
  try {
    const actualizada = await actualizarTarea(req.params.id, req.body);
    if (!actualizada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(actualizada);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar tarea' });
  }
});

// Eliminar una tarea
router.delete('/:id', async (req, res) => {
  try {
    const eliminada = await eliminarTarea(req.params.id);
    if (!eliminada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar tarea' });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const {
  obtenerRoles,
  crearRol,
  actualizarRol,
  eliminarRol
} = require('../controllers/rolesController');

// Obtener todos los roles
router.get('/', async (req, res) => {
  try {
    const roles = await obtenerRoles();
    res.json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener roles' });
  }
});

// Crear un nuevo rol
router.post('/', async (req, res) => {
  try {
    const nuevo = await crearRol(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear rol' });
  }
});

// Actualizar un rol
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await actualizarRol(req.params.id, req.body);
    if (!actualizado) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar rol' });
  }
});

// Eliminar un rol
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await eliminarRol(req.params.id);
    if (!eliminado) return res.status(404).json({ error: 'Rol no encontrado' });
    res.json({ mensaje: 'Rol eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar rol' });
  }
});

module.exports = router;
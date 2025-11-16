import express from 'express';
import { obtenerRoles, mostrarFormulario, crearRol, eliminarRol } from '../controllers/rolesController.js';

const router = express.Router();

// Listar roles
router.get('/', obtenerRoles);

// Mostrar formulario de creación
router.get('/nuevo', mostrarFormulario);

// Crear rol
router.post('/', crearRol);

// Eliminar rol
router.post('/eliminar/:id', eliminarRol);

export default router;

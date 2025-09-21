import express from 'express';
import empleadosController from '../controllers/empleadosController.js';

const router = express.Router();

// Vistas
router.get('/', empleadosController.mostrarEmpleados);
router.get('/:id', empleadosController.mostrarEmpleadoPorId);
router.get('/nueva', empleadosController.formularioNuevoEmpleado);
router.post('/nueva', empleadosController.guardarEmpleado);
router.get('/editar/:id', empleadosController.formularioEditarEmpleado);
router.put('/editar/:id', empleadosController.actualizarEmpleado);
router.delete('/eliminar/:id', empleadosController.eliminarEmpleado);

export default router;
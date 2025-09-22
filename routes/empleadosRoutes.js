import express from 'express';
import empleadosController from '../controllers/empleadosController.js';

const router = express.Router();

// Vistas
router.get('/', empleadosController.mostrarEmpleados);
router.get('/nuevo', empleadosController.formularioNuevoEmpleado);
router.post('/nuevo', empleadosController.guardarEmpleado);
router.get('/editar/:id', empleadosController.formularioEditarEmpleado);
router.put('/editar/:id', empleadosController.actualizarEmpleado);
router.delete('/eliminar/:id', empleadosController.eliminarEmpleado);
router.get('/:id', empleadosController.mostrarEmpleadoPorId); 
router.delete('/eliminar-todos', empleadosController.eliminarTodosLosEmpleados);

export default router;
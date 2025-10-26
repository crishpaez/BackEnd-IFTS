import express from 'express';
import empleadosController from '../controllers/empleadosController.js';

const router = express.Router();

router.get('/', empleadosController.mostrarEmpleados);
router.get('/nuevo', empleadosController.formularioNuevoEmpleado);
router.post('/', empleadosController.guardarEmpleado);
router.get('/editar/:id', empleadosController.formularioEditarEmpleado);
router.put('/:id', empleadosController.actualizarEmpleado);
router.delete('/:id', empleadosController.eliminarEmpleado);
router.delete('/', empleadosController.eliminarTodosLosEmpleados);

export default router;

import express from 'express';
import tareasController from '../controllers/tareasController.js';

const router = express.Router();

router.get('/', tareasController.mostrarTareas);
router.get('/nueva', tareasController.formularioNuevaTarea);
router.post('/', tareasController.guardarTarea);
router.get('/editar/:id', tareasController.formularioEditarTarea);
router.put('/:id', tareasController.actualizarTarea);
router.delete('/:id', tareasController.eliminarTarea);
router.delete('/', tareasController.eliminarTodasLasTareas);

export default router;

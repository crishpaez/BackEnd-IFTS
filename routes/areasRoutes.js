import express from 'express';
import areasController from '../controllers/areasController.js';

const router = express.Router();

router.get('/', areasController.mostrarAreas);
router.get('/nueva', areasController.formularioNuevaArea);
router.post('/', areasController.guardarArea);
router.get('/editar/:id', areasController.formularioEditarArea);
router.put('/:id', areasController.actualizarArea);
router.delete('/:id', areasController.eliminarArea);
router.delete('/', areasController.eliminarTodasLasAreas);

export default router;

import express from 'express';
import areasController from '../controllers/areasController.js';

const router = express.Router();

// Vistas
router.get('/', areasController.mostrarAreas);
router.get('/nueva', areasController.formularioNuevaArea);
router.post('/nueva', areasController.guardarArea);
router.get('/editar/:id', areasController.formularioEditarArea);
router.put('/editar/:id', areasController.actualizarArea);
router.delete('/eliminar/:id', areasController.eliminarArea);
router.delete('/eliminar-todas', areasController.eliminarTodasLasAreas);

export default router;
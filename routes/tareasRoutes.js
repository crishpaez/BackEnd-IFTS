import express from 'express';
import { obtenerTareas, mostrarFormulario, crearTarea, editarTarea, actualizarTarea, eliminarTarea } from '../controllers/tareasController.js';

const router = express.Router();

router.get('/', obtenerTareas);
router.get('/nuevo', (req, res) => {
  res.render('tareas/formulario', { hojaEstilo: 'tareas/formulario', tarea: null });
});
router.post('/', crearTarea);
router.get('/editar/:id', editarTarea);
router.post('/actualizar/:id', actualizarTarea);
router.post('/eliminar/:id', eliminarTarea);

export default router;

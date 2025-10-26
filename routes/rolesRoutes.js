import express from 'express';
import rolesController from '../controllers/rolesController.js';

const router = express.Router();

router.get('/', rolesController.mostrarRoles);
router.get('/nuevo', rolesController.formularioNuevoRol);
router.post('/', rolesController.guardarRol);
router.get('/editar/:id', rolesController.formularioEditarRol);
router.put('/:id', rolesController.actualizarRol);
router.delete('/:id', rolesController.eliminarRol);
router.delete('/', rolesController.eliminarTodosLosRoles);

export default router;

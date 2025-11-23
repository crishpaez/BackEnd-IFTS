// routes/rolesRoutes.js
import express from 'express';
import rolesController from '../controllers/rolesController.js';

const router = express.Router();

// Listar roles
router.get('/', rolesController.mostrarRoles);

// Ver detalle de un rol
router.get('/:id', rolesController.detalleRol);

export default router;

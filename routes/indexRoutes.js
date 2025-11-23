import express from 'express';

const router = express.Router();

// Vistas
router.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Inicio',
    hojaEstilo: 'home'
  });
});

export default router;


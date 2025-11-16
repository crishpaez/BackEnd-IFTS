import express from 'express';

const router = express.Router();

// Vistas
router.get('/', (req, res) => {
  res.render('home', {
    titulo: 'Inicio',
    hojaEstilo: 'home'
  });
});


router.get('/test', (req, res) => {
  res.render('home', {
    titulo: 'Prueba de estilos',
    hojaEstilo: 'test'
  });
});


export default router;


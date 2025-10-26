import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    titulo: 'Inicio',
    mensaje: req.query.mensaje || null
  });
});

export default router;

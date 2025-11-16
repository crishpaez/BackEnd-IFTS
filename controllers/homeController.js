// Controlador para la vista de inicio
function mostrarHome(req, res) {
  res.render('home', {
    titulo: 'Inicio',
    hojaEstilo: 'home'
  });
}

export default { mostrarHome };

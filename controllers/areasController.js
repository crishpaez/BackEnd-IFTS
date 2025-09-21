import areaModelo from '../models/Area.js';

// Mostrar todas las áreas
async function mostrarAreas(req, res) {
  try {
    const areas = await areaModelo.obtenerAreas();
    res.render('areas/listado', { titulo: 'Lista de Áreas', areas });
  } catch (error) {
    console.error('Error al obtener áreas:', error);
    res.status(500).send('Error interno al cargar áreas');
  }
}

// Redirección al Formulario para crear una nueva área
function formularioNuevaArea(req, res) {
  res.render('areas/formulario', { titulo: 'Crear Nueva Area' });
}

// Crear área
async function guardarArea(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).send('Nombre y descripción son requeridos');
    }

    await areaModelo.agregarArea(nombre, descripcion);
    res.redirect('/areas');
  } catch (error) {
    console.error('Error al guardar área:', error);
    res.status(500).send('Error interno al guardar área');
  }
}


// Redirección al Formulario para editar area
async function formularioEditarArea(req, res) {
  try {
    const id = parseInt(req.params.id);
    const areas = await areaModelo.obtenerAreas();
    const area = areas.find(a => a.id === id);
    if (!area) return res.status(404).send('Área no encontrado');

    res.render('areas/editar', { titulo: 'Editar Área', area });
  } catch (error) {
    console.error('Error al cargar formulario de edición:', error);
    res.status(500).send('Error interno al cargar formulario');
  }
}

// Actualizar un área
async function actualizarArea(req, res) {
  try {
    const id = parseInt(req.params.id);
    const nuevosDatos = req.body;

    const actualizada = await areaModelo.actualizarArea(id, nuevosDatos);
    if (!actualizada) return res.status(404).send('Área no encontrada');

    res.redirect('/areas');
  } catch (error) {
    console.error('Error al actualizar área:', error);
    res.status(500).send('Error interno al actualizar área');
  }
}

// Eliminar un área por ID
async function eliminarArea(req, res) {
  try {
    const id = parseInt(req.params.id);
    await areaModelo.eliminarAreaPorId(id);
    res.redirect('/areas');
  } catch (error) {
    console.error('Error al eliminar área:', error);
    res.status(500).send('Error interno al eliminar área');
  }
}

const areasController = { mostrarAreas, guardarArea, formularioNuevaArea, formularioEditarArea, actualizarArea, eliminarArea };
export default areasController;
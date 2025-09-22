import areaModelo from '../models/Area.js';
import { responder } from '../utils/respuestas.js';


// Mostrar todas las áreas
async function mostrarAreas(req, res) {
  try {
    const areas = await areaModelo.obtenerAreas();
    const esJson = req.query.formato === 'json';
    const mensajeExito = req.query.mensaje;

    if (esJson) {
      return responder(req, res, 200, 'Listado de áreas obtenido correctamente', areas);
    }

    res.render('areas/listado', {
      titulo: 'Lista de Áreas',
      areas,
      mensajeExito
    });

  } catch (error) {
    console.error('Error al obtener áreas:', error);
    return responder(req, res, 500, 'Error interno al cargar áreas', null, '/areas');
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
      return responder(req, res, 400, 'Nombre y descripción son requeridos', null, '/areas');
    }

    const nuevaArea = await areaModelo.agregarArea(nombre, descripcion);
    return responder(req, res, 201, 'Área guardada exitosamente', nuevaArea, '/areas');
  } catch (error) {
    console.error('Error al guardar área:', error);
    return responder(req, res, 500, 'Error interno al guardar área', null, '/areas');
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

    if (!actualizada) {
      return responder(req, res, 404, 'Área no encontrada', null, '/areas');
    }

    return responder(req, res, 200, 'Área actualizada correctamente', actualizada, '/areas');
  } catch (error) {
    console.error('Error al actualizar área:', error);
    return responder(req, res, 500, 'Error interno al actualizar área', null, '/areas');
  }
}

// Eliminar un área
async function eliminarArea(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminada = await areaModelo.eliminarAreaPorId(id);

    if (!eliminada) {
      return responder(req, res, 404, 'Área no encontrada', null, '/areas');
    }

    return responder(req, res, 200, 'Área eliminada correctamente', eliminada, '/areas');
  } catch (error) {
    console.error('Error al eliminar área:', error);
    return responder(req, res, 500, 'Error interno al eliminar área', null, '/areas');
  }
}

//Eliminar todas las áreas
async function eliminarTodasLasAreas(req, res) {
  try {
    await areaModelo.eliminarTodasLasAreas();
    return responder(req, res, 200, 'Todas las áreas fueron eliminadas correctamente', null, '/areas');
  } catch (error) {
    console.error('Error al eliminar todas las áreas:', error);
    return responder(req, res, 500, 'Error interno al eliminar todas las áreas', null, '/areas');
  }
}

const areasController = { mostrarAreas, guardarArea, formularioNuevaArea, formularioEditarArea, actualizarArea, eliminarArea, eliminarTodasLasAreas };
export default areasController;
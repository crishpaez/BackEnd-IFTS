import Area from '../modelsDB/Area.js';
import { responder } from '../utils/respuestas.js';

export async function mostrarAreas(req, res) {
  try {
    const areas = await Area.find();
    responder(req, res, 200, 'Listado de Áreas', areas, null, 'areas/listado');
  } catch (error) {
    responder(req, res, 500, 'Error al obtener áreas');
  }
}

export function formularioNuevaArea(req, res) {
  res.render('areas/formulario', {
    titulo: 'Crear nueva área',
    mensaje: req.query.mensaje || null
  });
}

export async function guardarArea(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    const nueva = await Area.create({ nombre, descripcion });
    responder(req, res, 201, 'Área creada correctamente', nueva, '/areas');
  } catch (error) {
    responder(req, res, 400, 'Error al crear área');
  }
}

export async function formularioEditarArea(req, res) {
  try {
    const area = await Area.findById(req.params.id);
    if (!area) return responder(req, res, 404, 'Área no encontrada');
    res.render('areas/editar', {
      titulo: 'Editar área',
      area,
      mensaje: req.query.mensaje || null
    });
  } catch (error) {
    responder(req, res, 500, 'Error al cargar formulario de edición');
  }
}

export async function actualizarArea(req, res) {
  try {
    const actualizada = await Area.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizada) return responder(req, res, 404, 'Área no encontrada');
    responder(req, res, 200, 'Área actualizada correctamente', actualizada, '/areas');
  } catch (error) {
    responder(req, res, 500, 'Error al actualizar área');
  }
}

export async function eliminarArea(req, res) {
  try {
    const eliminada = await Area.findByIdAndDelete(req.params.id);
    if (!eliminada) return responder(req, res, 404, 'Área no encontrada');
    responder(req, res, 200, 'Área eliminada correctamente', eliminada, '/areas');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar área');
  }
}

export async function eliminarTodasLasAreas(req, res) {
  try {
    await Area.deleteMany({});
    responder(req, res, 200, 'Todas las áreas fueron eliminadas', null, '/areas');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar todas las áreas');
  }
}

const areasController = {
  mostrarAreas,
  formularioNuevaArea,
  guardarArea,
  formularioEditarArea,
  actualizarArea,
  eliminarArea,
  eliminarTodasLasAreas
};

export default areasController;

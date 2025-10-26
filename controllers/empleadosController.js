import Empleado from '../modelsDB/Empleado.js';
import { responder } from '../utils/respuestas.js';

export async function mostrarEmpleados(req, res) {
  try {
    const empleados = await Empleado.find().populate('area').populate('rol');
    responder(req, res, 200, 'Listado de Empleados', empleados, null, 'empleados/listado');
  } catch (error) {
    responder(req, res, 500, 'Error al obtener empleados');
  }
}

export function formularioNuevoEmpleado(req, res) {
  res.render('empleados/formulario', {
    titulo: 'Crear nuevo empleado',
    mensaje: req.query.mensaje || null
  });
}

export async function guardarEmpleado(req, res) {
  try {
    const { nombre, apellido, dni, area, rol } = req.body;
    const nuevo = await Empleado.create({ nombre, apellido, dni, area, rol });
    responder(req, res, 201, 'Empleado creado correctamente', nuevo, '/empleados');
  } catch (error) {
    responder(req, res, 400, 'Error al crear empleado');
  }
}

export async function formularioEditarEmpleado(req, res) {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return responder(req, res, 404, 'Empleado no encontrado');
    res.render('empleados/editar', {
      titulo: 'Editar empleado',
      empleado,
      mensaje: req.query.mensaje || null
    });
  } catch (error) {
    responder(req, res, 500, 'Error al cargar formulario de edición');
  }
}

export async function actualizarEmpleado(req, res) {
  try {
    const actualizado = await Empleado.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return responder(req, res, 404, 'Empleado no encontrado');
    responder(req, res, 200, 'Empleado actualizado correctamente', actualizado, '/empleados');
  } catch (error) {
    responder(req, res, 500, 'Error al actualizar empleado');
  }
}

export async function eliminarEmpleado(req, res) {
  try {
    const eliminado = await Empleado.findByIdAndDelete(req.params.id);
    if (!eliminado) return responder(req, res, 404, 'Empleado no encontrado');
    responder(req, res, 200, 'Empleado eliminado correctamente', eliminado, '/empleados');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar empleado');
  }
}

export async function eliminarTodosLosEmpleados(req, res) {
  try {
    await Empleado.deleteMany({});
    responder(req, res, 200, 'Todos los empleados fueron eliminados', null, '/empleados');
  } catch (error) {
    responder(req, res, 500, 'Error al eliminar todos los empleados');
  }
}

const empleadosController = {
  mostrarEmpleados,
  formularioNuevoEmpleado,
  guardarEmpleado,
  formularioEditarEmpleado,
  actualizarEmpleado,
  eliminarEmpleado,
  eliminarTodosLosEmpleados
};

export default empleadosController;

import empleadoModelo from '../models/Empleado.js';
import rolModelo from '../models/Rol.js';
import areaModelo from '../models/Area.js';
import { responder } from '../utils/respuestas.js';

// Mostrar todos los empleados
async function mostrarEmpleados(req, res) {
  try {
    const empleados = await empleadoModelo.obtenerEmpleados();
    const esJson = req.query.formato === 'json';
    const mensajeExito = req.query.mensaje;

    if (esJson) {
      return responder(req, res, 200, 'Listado de empleados obtenido correctamente', empleados);
    }

    res.render('empleados/listado', {
      titulo: 'Lista de Empleados',
      empleados,
      mensajeExito,
      hojaEstilo: 'empleados/listado'
    });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return responder(req, res, 500, 'Error interno al cargar empleados', null, '/empleados');
  }
}

// Formulario para crear nuevo empleado
async function formularioNuevoEmpleado(req, res) {
  try {
    const roles = await rolModelo.obtenerRoles();
    const areas = await areaModelo.obtenerAreas();

    res.render('empleados/formulario', {
      titulo: 'Crear Nuevo Empleado',
      roles,
      areas,
      empleado: {},
      hojaEstilo: 'empleados/formulario'
    });
  } catch (error) {
    console.error('Error al cargar roles o áreas:', error);
    res.status(500).send('Error al cargar el formulario');
  }
}

// Guardar nuevo empleado
async function guardarEmpleado(req, res) {
  try {
    const { nombre, apellido, rol, area, activo } = req.body;

    if (!nombre || !apellido || !rol || !area) {
      return responder(req, res, 400, 'Nombre, apellido, rol y área son requeridos', null, '/empleados');
    }

    const activoBool = activo === 'true'; // convertir a booleano
    const nuevoEmpleado = await empleadoModelo.agregarEmpleado(nombre, apellido, rol, area, activoBool);

    return responder(req, res, 201, 'Empleado creado exitosamente', nuevoEmpleado, '/empleados');
  } catch (error) {
    console.error('Error al guardar empleado:', error);
    return responder(req, res, 500, 'Error interno al guardar empleado', null, '/empleados');
  }
}

// Formulario para editar empleado
async function formularioEditarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    const empleados = await empleadoModelo.obtenerEmpleados();
    const roles = await rolModelo.obtenerRoles();
    const areas = await areaModelo.obtenerAreas();

    const empleado = empleados.find(e => e.id === id);
    if (!empleado) return res.status(404).send('Empleado no encontrado');

    res.render('empleados/editar', {
      titulo: 'Editar Empleado',
      empleado,
      roles,
      areas,
      hojaEstilo: 'empleados/editar'
    });
  } catch (error) {
    console.error('Error al cargar formulario de edición de empleado:', error);
    res.status(500).send('Error interno al cargar formulario de empleado');
  }
}

// Actualizar empleado
async function actualizarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    const nuevosDatos = req.body;

    const actualizado = await empleadoModelo.actualizarEmpleadoPorId(id, nuevosDatos);
    if (!actualizado) {
      return responder(req, res, 404, 'Empleado no encontrado', null, '/empleados');
    }

    return responder(req, res, 200, 'Empleado actualizado correctamente', actualizado, '/empleados');
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    return responder(req, res, 500, 'Error interno al actualizar empleado', null, '/empleados');
  }
}

// Eliminar empleado por ID
async function eliminarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    const eliminado = await empleadoModelo.eliminarEmpleadoPorId(id);

    if (!eliminado) {
      return responder(req, res, 404, 'Empleado no encontrado', null, '/empleados');
    }

    return responder(req, res, 200, 'Empleado eliminado correctamente', eliminado, '/empleados');
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    return responder(req, res, 500, 'Error interno al eliminar empleado', null, '/empleados');
  }
}

const empleadosController = {
  mostrarEmpleados,
  formularioNuevoEmpleado,
  guardarEmpleado,
  formularioEditarEmpleado,
  actualizarEmpleado,
  eliminarEmpleado
};

export default empleadosController;

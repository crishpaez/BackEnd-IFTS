import empleadoModelo from '../models/Empleado.js';
import  rolModelo from '../models/Rol.js';
import areaModelo from '../models/Area.js';
import { responder } from '../utils/respuestas.js';


// Mostrar todas las áreas
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
      mensajeExito
    });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    return responder(req, res, 500, 'Error interno al cargar empleados', null, '/empleados');
  }
}

// Mostrar empleado por id
async function mostrarEmpleadoPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return responder(req, res, 400, 'ID inválido', null, '/empleados');
    }

    const empleado = await empleadoModelo.obtenerEmpleadoPorId(id);
    if (!empleado) {
      console.warn(`Empleado con ID ${id} no encontrado`);
      return responder(req, res, 404, 'Empleado no encontrado', null, '/empleados');
    }

    const esJson = req.query.formato === 'json';
    if (esJson) {
      return responder(req, res, 200, 'Empleado encontrado correctamente', empleado);
    }

    res.render('empleados/ver', {
      titulo: 'Detalle del Empleado',
      empleado
    });
  } catch (error) {
    console.error('Error al buscar empleado por ID:', error);
    return responder(req, res, 500, 'Error interno al buscar empleado', null, '/empleados');
  }
}

// Redirección al Formulario para crear un nuevo empleado
async function formularioNuevoEmpleado(req, res) {
  
  try {
    const roles = await rolModelo.obtenerRoles();
    const areas = await areaModelo.obtenerAreas(); 

    res.render('empleados/formulario', {
      titulo: 'Crear Nuevo Empleado',
      roles,
      areas,
      empleado: {} 
    });
  } catch (error) {
    console.error('Error al cargar roles o áreas:', error);
    res.status(500).send('Error al cargar el formulario');
  }
}

// Crear empleado
  async function guardarEmpleado(req, res) {
  try {
    const { nombre, apellido, rol, area, activo } = req.body;

    // Validación de campos obligatorios
    if (!nombre || !apellido || !rol || !area) {
      return responder(req, res, 400, 'Nombre, apellido, rol y área son requeridos', null, '/empleados');
    }

    // Validación de estado activo/inactivo
    if (activo !== 'true' && activo !== 'false') {
      return responder(req, res, 400, 'El estado activo/inactivo es inválido', null, '/empleados');
    }

    const nuevoEmpleado = await empleadoModelo.agregarEmpleado(nombre, apellido, rol, area, activo);
    return responder(req, res, 201, 'Empleado creado exitosamente', nuevoEmpleado, '/empleados');
  } catch (error) {
    console.error('Error al guardar empleado:', error);
    return responder(req, res, 500, 'Error interno al guardar empleado', null, '/empleados');

  }
}


// Redirección al Formulario para editar empleado 
async function formularioEditarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    const empleados = await empleadoModelo.obtenerEmpleados();
    const roles = await rolModelo.obtenerRoles();      
    const areas = await areaModelo.obtenerAreas();


    const empleado = empleados.find(a => a.id === id);
    if (!empleado) return res.status(404).send('Empleado no encontrado');

    res.render('empleados/editar', {titulo: 'Editar Empleado', empleado, roles, areas});


  } catch (error) {
    console.error('Error al cargar formulario de edición de empleado:', error);
    res.status(500).send('Error interno al cargar formulario de empleado');
  }
}

// Actualizar un empleado
async function actualizarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    const nuevosDatos = req.body;

    const actualizado = await empleadoModelo.actualizarEmpleadoPorId(id, nuevosDatos);
    if (!actualizado) {
      return responder(req, res, 404, 'Empleado no encontrado', null, '/empleados');
    }
    //res.redirect('/empleados');
    return responder(req, res, 200, 'Empleado actualizado correctamente', actualizado, '/empleados');

  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    return responder(req, res, 500, 'Error interno al actualizar empleado', null, '/empleados');
  }
}

// Eliminar un empleado por ID
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

// Eliminar todos los empleados
async function eliminarTodosLosEmpleados(req, res) {
  try {
    await empleadoModelo.eliminarTodasLosEmpleados();
    return responder(req, res, 200, 'Todos los empleados fueron eliminados correctamente', null, '/empleados');
  } catch (error) {
    console.error('Error al eliminar todos los empleados:', error);
    return responder(req, res, 500, 'Error interno al eliminar todos los empleados', null, '/empleados');
  }
}

const empleadosController = { mostrarEmpleados, mostrarEmpleadoPorId, guardarEmpleado, formularioNuevoEmpleado, formularioEditarEmpleado, actualizarEmpleado, eliminarEmpleado, eliminarTodosLosEmpleados };
export default empleadosController
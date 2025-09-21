import empleadoModelo from '../models/Empleado.js';
import  rolModelo from '../models/Rol.js';
import areaModelo from '../models/Area.js';


// Mostrar todas las áreas
async function mostrarEmpleados(req, res) {
  try {
    const empleados = await empleadoModelo.obtenerEmpleados();
    res.render('empleados/listado', { titulo: 'Lista de Empleados', empleados });
  } catch (error) {
    console.error('Error al obtener empleados:', error);
    res.status(500).send('Error interno al cargar empleados');
  }
}

// Mostrar empleado por id
async function mostrarEmpleadoPorId(req, res) {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).send('ID inválido');
    }

    const empleado = await obtenerEmpleadoPorId(id);

    if (!empleado) {
      console.warn(`Empleado con ID ${id} no encontrado`);
      return res.status(404).send('Empleado no encontrado');
    }

    res.render('empleados/ver', {
      titulo: 'Detalle del Empleado',
      empleado
    });
  } catch (error) {
    console.error('Error al buscar empleado por ID:', error);
    res.status(500).send('Error interno al buscar empleado');
  }
}

// Redirección al Formulario para crear un nuevo empleado
async function formularioNuevoEmpleado(req, res) {
  
  //res.render('empleados/formulario', { titulo: 'Crear Nuevo Empleado' });
  try {
    const roles = await rolModelo.obtenerRoles();
    const areas = await areaModelo.obtenerAreas(); 

    res.render('empleados/formulario', {
      titulo: 'Crear Nuevo Empleado',
      roles,
      areas,
      empleado: {} // campos vacíos
    });
  } catch (error) {
    console.error('Error al cargar roles o áreas:', error);
    res.status(500).send('Error al cargar el formulario');
  }
}

// Crear empleado
async function guardarEmpleado(req, res) {
  try {
    const { nombre, apellido, rol, area } = req.body;
    if (!nombre || !apellido || !rol || !area ) {
      return res.status(400).send('Nombre, apellido, rol y area son requeridos');
    }

    await empleadoModelo.agregarEmpleado(nombre, apellido, rol, area);
    res.redirect('/empleados');
  } catch (error) {
    console.error('Error al guardar empleado:', error);
    res.status(500).send('Error interno al guardar empleado');
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
    if (!actualizado) return res.status(404).send('Empleado no encontrado');

    res.redirect('/empleados');
  } catch (error) {
    console.error('Error al actualizar empleado:', error);
    res.status(500).send('Error interno al actualizar empleado');
  }
}

// Eliminar un empleado por ID
async function eliminarEmpleado(req, res) {
  try {
    const id = parseInt(req.params.id);
    await empleadoModelo.eliminarEmpleadoPorId(id);
    res.redirect('/empleados');
  } catch (error) {
    console.error('Error al eliminar empleado:', error);
    res.status(500).send('Error interno al eliminar empleado');
  }
}

const empleadosController = { mostrarEmpleados, mostrarEmpleadoPorId, guardarEmpleado, formularioNuevoEmpleado, formularioEditarEmpleado, actualizarEmpleado, eliminarEmpleado };
export default empleadosController
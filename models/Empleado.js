// models/Empleado.js
import mongoose from 'mongoose';

const EmpleadoSchema = new mongoose.Schema(
  {
    id: { type: Number, index: true, unique: true },
    nombre: { type: String, required: true, trim: true },
    apellido: { type: String, required: true, trim: true },
    rol: { type: String, required: true, trim: true },   // admin|operador|supervisor
    area: { type: String, required: true, trim: true },  // operaciones|almacén|...
    activo: { type: Boolean, default: true },
  },
  { versionKey: false, timestamps: true }
);

const EmpleadoModel =
  mongoose.models.Empleado || mongoose.model('Empleado', EmpleadoSchema);

// Generador de ID incremental
async function nextId() {
  const last = await EmpleadoModel.findOne().sort({ id: -1 }).lean();
  return last?.id ? last.id + 1 : 1;
}

// === API usada por los controladores ===

// Listar todos los empleados
export async function obtenerEmpleados() {
  return await EmpleadoModel.find().sort({ id: 1 }).lean();
}

// Buscar empleado por ID
export async function obtenerEmpleadoPorId(id) {
  return await EmpleadoModel.findOne({ id: Number(id) }).lean();
}

// Crear nuevo empleado
export async function agregarEmpleado(nombre, apellido, rol, area, activo) {
  const id = await nextId();
  const doc = await EmpleadoModel.create({
    id,
    nombre,
    apellido,
    rol,
    area,
    activo: String(activo) === 'true',
  });
  return {
    id: doc.id,
    nombre: doc.nombre,
    apellido: doc.apellido,
    rol: doc.rol,
    area: doc.area,
    activo: doc.activo,
  };
}

// Actualizar empleado por ID
export async function actualizarEmpleadoPorId(id, nuevosDatos) {
  const payload = { ...nuevosDatos };
  if ('activo' in payload) payload.activo = String(payload.activo) === 'true';

  const updated = await EmpleadoModel.findOneAndUpdate(
    { id: Number(id) },
    { $set: payload },
    { new: true }
  ).lean();
  return updated;
}

// Eliminar empleado por ID
export async function eliminarEmpleadoPorId(id) {
  const deleted = await EmpleadoModel.findOneAndDelete({ id: Number(id) }).lean();
  return deleted;
}

// Exportar API simplificada
const empleadoModelo = {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  agregarEmpleado,
  actualizarEmpleadoPorId,
  eliminarEmpleadoPorId,
};

export default empleadoModelo;

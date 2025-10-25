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

async function nextId() {
  const last = await EmpleadoModel.findOne().sort({ id: -1 }).lean();
  return last?.id ? last.id + 1 : 1;
}

// === API igual a la que usan tus controladores ===
export async function obtenerEmpleados() {
  return await EmpleadoModel.find().sort({ id: 1 }).lean();
}

export async function obtenerEmpleadoPorId(id) {
  return await EmpleadoModel.findOne({ id: Number(id) }).lean();
}

export async function guardarEmpleados(empleados) {
  await EmpleadoModel.deleteMany({});
  if (Array.isArray(empleados) && empleados.length) {
    await EmpleadoModel.insertMany(
      empleados.map(e => ({
        id: e.id,
        nombre: e.nombre,
        apellido: e.apellido,
        rol: e.rol,
        area: e.area,
        activo: !!e.activo,
      }))
    );
  }
}

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

export async function eliminarEmpleadoPorId(id) {
  const deleted = await EmpleadoModel.findOneAndDelete({ id: Number(id) }).lean();
  return deleted;
}

export async function eliminarTodasLosEmpleados() {
  await EmpleadoModel.deleteMany({});
}

const empleadoModelo = {
  obtenerEmpleados,
  obtenerEmpleadoPorId,
  guardarEmpleados,
  agregarEmpleado,
  actualizarEmpleadoPorId,
  eliminarEmpleadoPorId,
  eliminarTodasLosEmpleados,
};

export default empleadoModelo;
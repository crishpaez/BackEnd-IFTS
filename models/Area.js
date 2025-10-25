// models/Area.js
import mongoose from 'mongoose';
import { generarId } from '../utils/idGenerator.js';

// Esquema con campo 'id' numérico para compatibilidad
const AreaSchema = new mongoose.Schema(
  {
    id: { type: Number, index: true, unique: true },
    nombre: { type: String, required: true, trim: true },
    descripcion: { type: String, required: true, trim: true },
  },
  { versionKey: false, timestamps: true }
);

const AreaModel = mongoose.models.Area || mongoose.model('Area', AreaSchema);

// Helpers
async function nextId() {
  const last = await AreaModel.findOne().sort({ id: -1 }).lean();
  return last?.id ? last.id + 1 : 1;
}

// === API usada por tus controladores ===

export async function obtenerAreas() {
  const areas = await AreaModel.find().sort({ id: 1 }).lean();
  return areas.map(({ id, nombre, descripcion }) => ({ id, nombre, descripcion }));
}

export async function guardarAreas(areas) {
  // Solo para compatibilidad cuando se llama a "borrar todo" y volver a guardar
  await AreaModel.deleteMany({});
  if (Array.isArray(areas) && areas.length) {
    await AreaModel.insertMany(
      areas.map(a => ({ id: a.id, nombre: a.nombre, descripcion: a.descripcion }))
    );
  }
}

export async function agregarArea(nombre, descripcion) {
  const id = await nextId();
  const doc = await AreaModel.create({ id, nombre, descripcion });
  return { id: doc.id, nombre: doc.nombre, descripcion: doc.descripcion };
}

export async function actualizarArea(id, nuevosDatos) {
  const updated = await AreaModel.findOneAndUpdate(
    { id: Number(id) },
    { $set: { ...nuevosDatos } },
    { new: true }
  ).lean();
  return updated
    ? { id: updated.id, nombre: updated.nombre, descripcion: updated.descripcion }
    : null;
}

export async function eliminarAreaPorId(id) {
  const deleted = await AreaModel.findOneAndDelete({ id: Number(id) }).lean();
  return deleted
    ? { id: deleted.id, nombre: deleted.nombre, descripcion: deleted.descripcion }
    : null;
}

export async function eliminarTodasLasAreas() {
  await AreaModel.deleteMany({});
}

const areaModelo = {
  obtenerAreas,
  guardarAreas,
  agregarArea,
  actualizarArea,
  eliminarAreaPorId,
  eliminarTodasLasAreas,
};

export default areaModelo;
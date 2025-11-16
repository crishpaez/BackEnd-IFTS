import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  descripcion: { type: String, required: true, trim: true },
  estado: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' }
}, { timestamps: true });

const Tarea = mongoose.model('Tarea', tareaSchema);

export default Tarea;

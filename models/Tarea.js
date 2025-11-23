import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true }, 
  titulo: { type: String, required: true },
  descripcion: { type: String },
  estado: { type: String, default: 'pendiente' }
});

export default mongoose.model('Tarea', tareaSchema);
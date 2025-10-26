import mongoose from 'mongoose';

const tareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  empleado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Empleado',
    required: true
  }
});

const Tarea = mongoose.model('Tarea', tareaSchema);
export default Tarea;

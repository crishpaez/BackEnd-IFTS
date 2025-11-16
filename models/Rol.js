import mongoose from 'mongoose';

// Definimos el esquema de Rol
const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true // agrega createdAt y updatedAt automáticamente
});

// Creamos el modelo
const Rol = mongoose.model('Rol', rolSchema);

export default Rol;

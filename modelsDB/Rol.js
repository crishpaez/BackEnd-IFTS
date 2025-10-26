import mongoose from 'mongoose';

const rolSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  }
});

const Rol = mongoose.model('Rol', rolSchema);
export default Rol;

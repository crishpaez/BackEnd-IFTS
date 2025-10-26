import mongoose from 'mongoose';

const areaSchema = new mongoose.Schema({
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

const Area = mongoose.model('Area', areaSchema);
export default Area;

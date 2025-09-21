class Tarea {
  constructor({
    id,
    descripcion,
    estado = 'pendiente',
    prioridad = 'media',
    fechaCreacion = new Date().toISOString(),
    fechaVencimiento = null,
    fechaFinalizacion = null,
    area,
    asignadoA = null,
    incidencia = null
  }) {
    this.id = id;
    this.descripcion = descripcion;
    this.estado = estado; // pendiente | en proceso | finalizada
    this.prioridad = prioridad; // alta | media | baja
    this.fechaCreacion = fechaCreacion;
    this.fechaVencimiento = fechaVencimiento;
    this.fechaFinalizacion = fechaFinalizacion;
    this.area = area; // operaciones | almacén
    this.asignadoA = asignadoA; // ID de empleado
    this.incidencia = incidencia; // texto opcional
  }

  finalizar(fecha = new Date().toISOString()) {
    this.estado = 'finalizada';
    this.fechaFinalizacion = fecha;
  }

  asignarEmpleado(idEmpleado) {
    this.asignadoA = idEmpleado;
  }

  registrarIncidencia(texto) {
    this.incidencia = texto;
    this.estado = 'en proceso';
  }
}

module.exports = Tarea;
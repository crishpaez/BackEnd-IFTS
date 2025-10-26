// JSON para APIs
export function responderJson(res, status, mensaje, datos = null) {
  const respuesta = { exito: status < 400, mensaje };
  if (datos) respuesta.datos = datos;
  return res.status(status).json(respuesta);
}

// Redirección con mensaje
export function responderHtmlConRedirect(res, ruta, mensaje) {
  const url = `${ruta}?mensaje=${encodeURIComponent(mensaje)}`;
  return res.redirect(url);
}

// Mensaje plano
export function responderHtml(res, status, mensaje) {
  return res.status(status).send(mensaje);
}

// Renderizado de vista
export function responderVista(res, vista, mensaje, datos = null) {
  return res.render(vista, {
    titulo: mensaje,
    datos,
    mensaje
  });
}

// Controlador principal
export function responder(req, res, status, mensaje, datos = null, rutaRedirect = null, vista = null) {
  const esJson = req.query.formato === 'json';

  if (esJson) return responderJson(res, status, mensaje, datos);

  if (status < 400) {
    if (vista) {
      return responderVista(res, vista, mensaje, datos);
    }
    if (rutaRedirect) {
      return responderHtmlConRedirect(res, rutaRedirect, mensaje);
    }
    return responderHtml(res, 500, 'Error interno: falta ruta o vista');
  }

  return responderHtml(res, status, mensaje);
}

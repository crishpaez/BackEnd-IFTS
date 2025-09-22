export function responderJson(res, status, mensaje, datos = null) {
  const respuesta = { exito: status < 400, mensaje };
  if (datos) respuesta.datos = datos;
  return res.status(status).json(respuesta);
}

export function responderHtmlConRedirect(res, ruta, mensaje) {
  const url = `${ruta}?mensaje=${encodeURIComponent(mensaje)}`;
  return res.redirect(url);
}

export function responderHtml(res, status, mensaje) {
  return res.status(status).send(mensaje);
}

export function responder(req, res, status, mensaje, datos = null, rutaRedirect) {
  const esJson = req.query.formato === 'json';
  if (esJson) return responderJson(res, status, mensaje, datos);

  if (status < 400) {
    if (!rutaRedirect) {
      console.warn('responder(): falta rutaRedirect para respuesta HTML');
      return responderHtml(res, 500, 'Error interno: falta ruta de redirección');
    }
    return responderHtmlConRedirect(res, rutaRedirect, mensaje);
  }

  return responderHtml(res, status, mensaje);
}
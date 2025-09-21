export function generarId(lista) {
  if (!Array.isArray(lista) || lista.length === 0) return 1;

  const ids = lista.map(item => item.id);
  const maxId = Math.max(...ids);
  return maxId + 1;
}
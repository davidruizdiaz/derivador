/**
 * Submódulo de registro encargado recuperar los datos del formulario.
 * @module Sesiones/RecuperadorDatos
 */

/**
 * Recupera los datos del formulario y los agrupa en un objeto.
 * @return {Object} Objeto con datos de la sesión
 * @example { description: string, date: string, numCaptures: number, initHour: string, endHour: string }
 */
async function getFormData() {
  const inps = document.getElementsByTagName('input');
  const description = {};
  for (const inp of inps) {
    if (inp.type === 'radio' && inp.checked === false) continue;
    description[inp.name] = (inp.type === 'radio' && inp.checked) ? Number(inp.value.trim()) : inp.value.trim();
  }
  return description;
}

export { getFormData };

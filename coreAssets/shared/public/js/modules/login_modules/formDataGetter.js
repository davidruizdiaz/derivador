/**
 * Submódulo de acceso encargado obtener los datos del formulario.
 * @module Acceso/RecuperadorDatos
 */
/**
 * Recupera los datos del formulario y los agrupa en un objeto.
 * @return {Object} Objeto que representa un usuario
 * @example
 * { user: string, pass: string }
 */
async function getFormData() {
  const inps = document.getElementsByTagName('input');
  const user = {};
  for (const inp of inps) {
    user[inp.name] = inp.value.trim();
  }
  return user;
}

export { getFormData };

/**
 * Submódulo de acceso encargado Limpiar el formulario.
 * @module Acceso/ReiniciadorFormulario
 */
/**
 * Elimina todos los datos ingresados y
 * deja el formulario en el estado inicial.
 */
function cleanForm() {
  const inputs = document.getElementsByTagName('input');
  const btns = document.getElementsByTagName('button');
  const errors = document.getElementsByClassName('error');

  for (const inp of inputs) {
    inp.value = '';
  }

  for (const btn of btns) {
    btn.disabled = true;
  }

  for (const error of errors) {
    error.textContent = '';
  }
}

export { cleanForm };

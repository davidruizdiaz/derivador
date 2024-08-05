/**
 * Submódulo de registro encargado limpiar el formulario.
 * @module Sesiones/ReiniciadorFormulario
 */

import { activeAllButtons } from "./buttonsController.js";

/**
 * Elimina todos los datos ingresados y
 * deja el formulario en el estado inicial.
 */
function cleanForm() {
  const inputs = document.getElementsByTagName('input');
  const errors = document.getElementsByClassName('error');

  for (const inp of inputs) {
    inp.value = (inp['type'] !== 'radio') ? '' : inp.value;
    if (inp.name === 'initHour') {
      inp.value = dayjs().format('HH:mm');
    }
    if (inp.name === 'endHour') {
      inp.value = dayjs().add(1, 'hour').format('HH:mm').toString();
    }
    if (inp.name === 'date') {
      inp.value = dayjs().format('YYYY-MM-DD');
    }
  }

  for (const error of errors) {
    error.textContent = '';
  }

  activeAllButtons(false);

}

export { cleanForm };

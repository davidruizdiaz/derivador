/**
 * Submódulo de registro encargado limpiar el formulario.
 * @module Registro/ReiniciadorFormulario
 */
import { hiddenSpinner } from "../common_modules/spinner.js";
import { reinitFotos } from "./camController.js";

/**
 * Elimina todos los datos ingresados y
 * deja el formulario en el estado inicial.
 */
function cleanForm() {
  const inputs = document.getElementsByTagName('input');
  const btns = document.getElementsByTagName('button');
  const imgs = document.getElementsByTagName('img');
  const infos = document.getElementsByClassName('foto-info');
  const errors = document.getElementsByClassName('error');

  for (const inp of inputs) {
    inp.value = '';
  }

  for (const btn of btns) {
    btn.disabled = true;
  }

  for (const img of imgs) {
    img.setAttribute('src', './imgs/rostros.webp');
    const id = img.getAttribute('id');
    img.classList.add(
      (id === 'img1') ? 'face-left' :
        (id === 'img2') ? 'face-center' : 'face-right'
    )
  }

  for (const info of infos) {
    info.textContent = '';
  }

  for (const error of errors) {
    error.textContent = '';
  }

  reinitFotos();
  hiddenSpinner();
}

export { cleanForm };

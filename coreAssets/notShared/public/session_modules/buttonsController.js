/**
 * Submódulo de sesiones encargado de controlar los botones.
 * @module Sesiones/ControladorBotones
 */

import { cleanForm } from "./form_cleaner.js";

/**
 * Referencia al campo descripción.
 * @type {Object}
 */
const inDescription = document.querySelector('#description');
/**
 * Referencia al campo fecha.
 * @type {Object}
 */
const btnSubmit = document.querySelector('#btnSubmit');
/**
 * Referencia al botón reset.
 * @type {Object}
 */
const btnCancel = document.querySelector('#btnCancel');

/**
 * Inicia el controlador de botones y campos.
 */
function initButtonsController() {
  inDescription.addEventListener('input', handleChanges);
}

/**
 * Función que controla los botones según 
 * las entradas en los inputs.
 */
function handleChanges() {
  const nLen = inDescription.value.length;
  if (nLen > 0) {
    enableCancel();
  }
  if (nLen <= 0) {
    cleanForm();
    disableSubmit();
  }
  if (nLen > 3) {
    enableSubmit();
  }
  if (nLen < 4) {
    disableSubmit();
  }
}

/** Activa el botón enviar. */
function enableSubmit() {
  btnSubmit.disabled = false;
}

/** Desactiva el botón enviar. */
function disableSubmit() {
  btnSubmit.disabled = true;
}

/** Activa el botón cancelar. */
function enableCancel() {
  btnCancel.disabled = false;
}

/** Desactiva el botón cancelar. */
function disableCancel() {
  btnCancel.disabled = true;
}

/**
 * Activa o desactiva todos los componentes
 * según el parámetro.
 * @param active {boolean} Bandera, true=activar false=desactivar
 */
function activeAllButtons(active) {
  if (active) {
    enableSubmit();
    enableCancel()
  } else {
    disableSubmit();
    disableCancel()
  }
}

export { initButtonsController, activeAllButtons };

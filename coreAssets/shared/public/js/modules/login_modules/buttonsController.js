/**
 * Submódulo de acceso encargado de controlar los botones.
 * @module Acceso/ControladorBotones
 */
import { cleanForm } from "./form_cleaner.js";

/**
 * Referencia al campo nombre de usuario.
 * @type {Object}
 */
const inUser = document.querySelector('#user');
/**
 * Referencia al campo password.
 * @type {Object}
 */
const inPass = document.querySelector('#pass');
/**
 * Referencia al botón submit.
 * @type {Object}
 */
const btnSubmit = document.querySelector('#btnSubmit');
/**
 * Referencia al botón reset.
 * @type {Object}
 */
const btnCancel = document.querySelector('#btnCancel');

/**
 * Inicia el evento del controlador de botones y campos.
 */
function initButtonsController() {
  document.querySelector('.input-container')
    .addEventListener('input', handleChanges);
}

/**
 * Función que controla los botones según 
 * las entradas en los inputs.
 */
function handleChanges() {
  const uLen = inUser.value.length;
  const pLen = inPass.value.length;
  if (uLen > 0 || pLen > 0) {
    enableCancel();
  }
  if (uLen <= 0 && pLen <= 0) {
    cleanForm();
  }
  if (uLen <= 3 || pLen <= 4) {
    disableSubmit();
  }
  if (uLen >= 3 && pLen >= 4) {
    enableSubmit();
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
 * @param active {boolean} Bandera para activar o desactivar campos
 */
function activeAllButtons(active) {
  if (active) {
    inUser.disabled = false;
    inPass.disabled = false;
    enableSubmit();
    enableCancel()
  } else {
    inUser.disabled = true;
    inPass.disabled = true;
    disableSubmit();
    disableCancel()
  }
}

export { initButtonsController, activeAllButtons };

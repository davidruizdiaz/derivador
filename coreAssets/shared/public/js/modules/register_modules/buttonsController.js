/**
 * Submódulo de registro encargado de controlar los botones.
 * @module Registro/ControladorBotones
 */
import { hiddenSpinner, showSpinner } from "../common_modules/spinner.js";
import { cleanForm } from "./form_cleaner.js";

/**
 * Referencia al campo nombre.
 * @type {Object}
 */
const inName = document.querySelector('#name');
/**
 * Referencia al campo documento.
 * @type {Object}
 */
const inDocument = document.querySelector('#document');
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
 * Referencia al botón para capturar foto.
 * @type {Object}
 */
const btnFoto = document.querySelector('#btnFoto');

/**
 * Inicia el controlador de botones y campos.
 */
function initButtonsController() {
  document.querySelector('.input-container')
    .addEventListener('input', handleChanges);
  const imgs = document.getElementsByTagName('img');
  for (const img of imgs) {
    img.addEventListener('load', handleChanges)
  }
}

/**
 * Función que controla los botones según 
 * las entradas en los inputs.
 */
function handleChanges() {
  const nLen = inName.value.length;
  const dLen = inDocument.value.length;
  if (nLen > 0 || dLen > 0) {
    enableCancel();
  }
  if (nLen <= 0 && dLen <= 0) {
    cleanForm();
  }
  if (nLen <= 0 || dLen <= 0 || !checkImages()) {
    disableSubmit();
  }
  if (nLen > 0 && dLen > 0) {
    enableFoto();
    if (checkImages()) {
      enableSubmit();
      disableFoto();
    }
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

/** Activa el botón foto. */
function enableFoto() {
  btnFoto.disabled = false;
}

/** Desactiva el botón foto. */
function disableFoto() {
  btnFoto.disabled = true;
}

/**
 * Verifica si ya se cargaron todas las imágenes.
 * @return {boolean} Bandera true=valido false=no valido
 */
function checkImages() {
  const infos = document.getElementsByClassName('foto-info');
  let isOk = true;
  for (const info of infos) {
    isOk = (info.textContent === '✔️ Listo') ? true : false;
  }
  return isOk;
}

/**
 * Activa o desactiva todos los componentes
 * según el parámetro.
 * @param active {boolean} Bandera, true=activar false=desactivar
 */
function activeAllButtons(active) {
  if (active) {
    inName.disabled = false;
    inDocument.disabled = false;
    enableSubmit();
    enableCancel()
    enableFoto();
    hiddenSpinner();
  } else {
    inName.disabled = true;
    inDocument.disabled = true;
    disableSubmit();
    disableCancel()
    disableFoto();
    showSpinner();
  }
}

export { initButtonsController, activeAllButtons };

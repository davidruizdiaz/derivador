/**
 * Submódulo de consultas encargado de controlar la vista.
 * @module Consultas/Controlador
 */
import { searchPersonByNameOrDocument } from "../common_modules/apiConsumer.js"
import { notificator } from "../common_modules/notifications.js";
import { loadTable } from "./tableController.js"

/** 
 * Referencia al campo de búsqueda
 * @type {Object}
 */
const inSearch = document.querySelector('input[type=search]');
/** 
 * Para guardar el id del timer
 * @type {string}
 * @default null
 */
let timerId = null;

/**
 * Inicia los eventos y llamadas iniciales a la API de la página
 */
async function init() {
  await sendSearch();
  inSearch.addEventListener('input', () => {
    //INFO: El timer se reinicia cada 400ms
    clearTimeout(timerId);
    timerId = setTimeout(() => { sendSearch(inSearch.value) }, 400);
  });
}

/**
 * Envía el parámetro de búsqueda al consumerApi()
 * El resultado es enviado a loadTable()
 * @param param {string} Parámetro de búsqueda 
 */
async function sendSearch(param = "") {
  const req = await searchPersonByNameOrDocument(param);
  if (!req.ok) {
    notificator.notify(`⚠️ ${req.msg}`, 'error')
  }
  const { persons } = req;
  loadTable(persons)
}

export { init, sendSearch }

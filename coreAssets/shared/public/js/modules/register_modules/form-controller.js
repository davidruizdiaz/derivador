/**
 * Submódulo de registro encargado de controlar el envío de los datos.
 * @module Registro/ControladorFormulario
 */
import { video } from "../common_modules/cam.js";
import { activeAllButtons, initButtonsController } from "./buttonsController.js";
import { takeFoto } from "./camController.js";
import { getFormData } from "./formDataGetter.js";
import { cleanForm } from "./form_cleaner.js";
import { validateForm } from "./validate_form.js";
import { notificator } from '../common_modules/notifications.js'
import {
  addNewPerson,
  getPersonById,
  updatePerson
} from "../common_modules/apiConsumer.js";

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
 * Referencia al elemento de imagen 1.
 * @type {Object}
 */
const img1 = document.querySelector('#img1');
/**
 * Referencia al elemento de imagen 2.
 * @type {Object}
 */
const img2 = document.querySelector('#img2');
/**
 * Referencia al elemento de imagen 3.
 * @type {Object}
 */
const img3 = document.querySelector('#img3');
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
 * Referencia al elemento de video.
 * @type {Object}
 * @default null
 */
let vidElem = null;

/**
 * Inicial el video, el controlador 
 * y manejadores de botones.
 */
async function init() {
  vidElem = await video.start()
  btnSubmit.addEventListener('click', prepareData);
  btnFoto.addEventListener('click', takeFoto);
  initButtonsController();
  btnCancel.addEventListener('click', cleanForm);
  urlHandler();
}

/**
 * Prepara los datos y los envía al servidor.
 */
async function prepareData() {
  const isFormValid = await validateForm();
  if (isFormValid) {
    const personData = await getFormData();
    if (personData) {
      sendData(personData);
    } else {
      notificator.notify('⚠️ No se pudieron procesar los datos', 'error');
      console.error('Error al procesar el formulario');
      return;
    }
  } else {
    notificator.notify('⚠️ Los datos ingresados no son válidos', 'error');
    console.error('Datos no válidos');
    return;
  }
}

/**
 * Envía los datos ingresados.
 */
async function sendData(person) {
  try {
    notificator.notify('⏳Enviando datos', 'info');
    activeAllButtons(false);
    let resp = null;
    if (!person.id) {                     //INFO: Si no hay id es para insertar
      resp = await addNewPerson(person);
    } else {
      resp = await updatePerson(person);
      const originalUrl = window.location.pathname    // HACK: restablece la url si tienen ?q
      window.history.replaceState(0, 0, originalUrl);
    }
    if (resp.ok) {
      notificator.notify(`✔️ Se guardaron los datos de ${resp.person.name}`, 'info')
      activeAllButtons(true)
      cleanForm();
    } else {
      notificator.notify(`⚠️ ${resp.msg}`, 'error')
      activeAllButtons(true);
      console.error(resp.msg);
      return;
    }
  } catch (error) {
    console.error(error);
    notificator.notify('⚠️ Ocurrió un error al procesar los datos', 'error')
    activeAllButtons(true);
    return;
  }
}

/**
 * Verifica la URL y si hay parámetros los recupera 
 * y los envía a prepareUpdate.
 */
function urlHandler() {
  const queryString = window.location.search;
  if (!queryString) {
    return;
  }
  const queryParams = new URLSearchParams(queryString);
  const param = queryParams.get('q');
  prepareUpdate(param);
}

/**
 * Envía una búsqueda por id de una persona y
 * recupera los resultados para cargarlos en el
 * formulario para ser actualizados.
 * @param id {string} Id de la persona
 */
async function prepareUpdate(id) {
  try {
    const res = await getPersonById(id);
    if (!res.ok) {
      notificator.notify(`⚠️ ${res.msg}`, 'error')
    }
    const { person: per } = res;
    document.querySelector('#id').value = per.id;
    inName.value = per.name;
    inDocument.value = per.document;
    activeAllButtons(true);
  } catch (error) {
    console.error(error);
    notificator.notify('⚠️ Ocurrió un error al procesar los datos', 'error')
    activeAllButtons(true);
    return;
  }
}

export { init }

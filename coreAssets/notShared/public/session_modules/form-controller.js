/**
 * Submódulo de sesiones encargado de controlar el envío de los datos.
 * @module Sesiones/ControladorFormulario
 */

import { activeAllButtons, initButtonsController } from "./buttonsController.js";
import { getFormData } from "./formDataGetter.js";
import { cleanForm } from "./form_cleaner.js";
import { validateForm } from "./validate_form.js";
import { notificator } from '../common_modules/notifications.js'
import { addNewSession } from "../common_modules/apiConsumer.js";
import { checkValidSession, registerNewSession } from "./sessionController.js";

/**
 * Referencia al campo descripción.
 * @type {Object}
 */
const inDesc = document.querySelector('#description');
/**
 * Referencia al campo fecha.
 * @type {Object}
 */
const inDate = document.querySelector('#date');
/**
 * Referencia al campo número de capturas.
 * @type {Array<Object>}
 */
const inNumCapt = document.querySelectorAll('input[type=radio]');
/**
 * Referencia al campo hora de inicio.
 * @type {Object}
 */
const inInitHour = document.querySelector('#initHour');
/**
 * Referencia al campo hora fin.
 * @type {Object}
 */
const inEndHour = document.querySelector('#endHour');
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
 * Inicial el video, el controlador 
 * y manejadores de botones.
 */
async function init() {
  cleanForm();
  btnSubmit.addEventListener('click', prepareData);
  initButtonsController();
  btnCancel.addEventListener('click', cleanForm);
  showCurrentSessionData(await checkValidSession());
}

/**
 * Prepara los datos y los envía al servidor.
 */
async function prepareData() {
  const isFormValid = await validateForm();
  if (isFormValid) {
    const sessionData = await getFormData();
    if (sessionData) {
      sendData(sessionData);
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
 * @param session {Object} Objeto sessión
 */
async function sendData(session) {
  try {
    notificator.notify('⏳Enviando datos', 'info');
    activeAllButtons(false);
    const resp = await addNewSession(session);
    if (resp.ok) {
      notificator.notify(`✔️ Se guardaron la sesión ${resp.session.description}`, 'info')
      registerNewSession(resp.session);
      showCurrentSessionData(await checkValidSession());
      cleanForm();
    } else {
      notificator.notify(`⚠️ ${resp.msg}`, 'error')
      activeAllButtons(true);
      console.error(resp.msg);
    }
  } catch (error) {
    console.error(error);
    notificator.notify('⚠️ Ocurrió un error al procesar los datos', 'error')
    activeAllButtons(true);
  }
}

/**
 * Activa o desactiva el formulario
 * @param {boolean} active true=activar false=desactivar
 */
function activeForm(active) {
  document.querySelectorAll('input').forEach(i => {
    if (i.name !== 'date') {
      i.disabled = active;
    }
  });
}

/**
 * Muestra los datos de la sesión actual registrada.
 * @param session {Object} Objeto sessión
 * @param show {boolean} Bandera para mostrar o no los datos
 * @default true
 * @description true = muestra datos de la sesión actual, false = no muestra los datos
 */
function showCurrentSessionData({ session = null, valid: show }) {
  const infContainer = document.querySelector('.info-container');
  if (session && show) {
    const { description, date, numCaptures, initHour, endHour, state } = session;
    infContainer.querySelector('#info-description').innerText = description;
    infContainer.querySelector('#info-numCaptures').innerText = numCaptures;
    infContainer.querySelector('#info-date').innerText = date;
    infContainer.querySelector('#info-initHour').innerText = initHour;
    infContainer.querySelector('#info-endHour').innerText = endHour;
    infContainer.querySelector('#info-state').innerText = state === 'ACT' ? 'Activo' : 'Completado';
    infContainer.style = 'display: block'
    activeForm(show);
    activeAllButtons(!show);
  } else {
    infContainer.style = 'display: none'
    activeForm(show);
    activeAllButtons(show)
  }
}

export { init, showCurrentSessionData };

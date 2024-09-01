/**
 * Submódulo de acceso encargado de controlar el envío de los datos.
 * @module Acceso/ControladorFormulario
 */
import { activeAllButtons, initButtonsController } from "./buttonsController.js";
import { getFormData } from "./formDataGetter.js";
import { cleanForm } from "./form_cleaner.js";
import { validateForm } from "./validate_form.js";
import { notificator } from '../common_modules/notifications.js'
import { sendUserDataToLogin } from "../common_modules/apiConsumer.js";

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
 * Inicia eventos de los botones submit, reset y submódulo de control de botones.
 */
async function init() {
  btnSubmit.addEventListener('click', prepareData);
  initButtonsController();
  btnCancel.addEventListener('click', cleanForm);
}

/**
 * Valida y prepara los datos y los envía al servidor.
 * @param ev {Object} Evento de botón
 */
async function prepareData(ev) {
  ev.preventDefault();
  const isFormValid = await validateForm();
  if (isFormValid) {
    const userData = await getFormData();
    if (userData) {
      sendData(userData);
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
 * Envía los datos ingresados ya validados.
 */
async function sendData(userData) {
  try {
    notificator.notify('⏳Enviando datos', 'info');
    activeAllButtons(false);
    const resp = await sendUserDataToLogin(userData);
    if (resp && !resp.ok) {
      notificator.notify(`⚠️ ${resp.msg}`, 'error')
      activeAllButtons(true);
      console.error(resp.msg);
      return;
    }
    return;
  } catch (error) {
    console.error(error);
    notificator.notify(`⚠️ Error al intentar acceder`, 'error')
    activeAllButtons(true);
    return;
  }
}

export { init }

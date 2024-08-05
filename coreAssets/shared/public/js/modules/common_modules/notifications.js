/**
 * Modulo encargado de emitir las notificaciones 
 * a los usuarios de la aplicación.
 * @module Común/Notificaciones
 */
import { startDetections } from "../attendance_modules/faceDetection.js";
import { hiddenSpinner, loadedError, loadedOk } from "../common_modules/spinner.js";

/**
 * Muestra las notificaciones en la pagina.
 * @param text {string} Texto que se mostrara
 * @param type {string} Indica el tipo de notificación, puede ser 'info|error'
 * @example 
 * notify('Un mensaje', 'info')
 */
function notify(text, type) {
  const elem = document.createElement('div');
  elem.setAttribute('class', `notifybar ${type}`);
  elem.innerText = text;
  const notifyContent = document.querySelector("#notify-content");
  notifyContent.append(elem);
  setTimeout(() => {
    elem.remove();
  }, 2900);
}

/**
 * Muestra los datos de la marcación actual en la página.
 * @param reqData {object} Datos recuperados del servidor.
 * @example
 * reqData = {
 *  ok: boolean,
 *  person: {
 *    name: string, 
 *    document: string, 
 *    date: string, 
 *    hour: string 
 *  }
 * }
 */
function showData(reqData) {
  const { ok } = reqData;
  if (ok) {
    const { person: per } = reqData;
    const temp = `<h3>Información registrada</h3>
      <p>
        <strong>Nombre: </strong> <span>${per.name}</span>
        <br/>
        <strong>Documento: </strong> <span>${per.document}</span>
        <br/>
        <strong>Fecha de entrada: </strong> <span class="fecha">${per.date}</span>
        <br/>
        <strong>Hora de entrada: </strong> <span class="hora">${per.hours}</span>
      </p>`;
    const div_data = document.querySelector('.data-container');
    div_data.innerHTML = temp;
    div_data.removeAttribute('hidden');
    loadedOk()
    setTimeout(() => {
      div_data.setAttribute('hidden', 'hidden');
      hiddenSpinner();
      setTimeout(startDetections, 2000)
    }, 5000);
  } else {
    const { msg } = reqData;
    const temp = `<h3>Algo salió mal</h3>
                  <p>${msg}</p>`;
    const div_data = document.querySelector('.data-container');
    div_data.innerHTML = temp;
    div_data.removeAttribute('hidden');
    loadedError()
    setTimeout(() => {
      div_data.setAttribute('hidden', 'hidden');
      hiddenSpinner();
      setTimeout(startDetections, 2000)
    }, 5000);

  }
}

/**
 * Objeto que contiene las funciones del módulo.
 * @type {Object}
 * @property {function} start
 * @property {function} showData
 */
const notificator = {
  notify, showData
}

export { notificator };

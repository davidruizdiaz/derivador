import { removeEmptyLines } from "../../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Modulo encargado de emitir las notificaciones 
 * a los usuarios de la aplicación.
 * @module Común/Notificaciones
 */
${vp[1]}
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
  elem.setAttribute('class', \`notifybar \${type}\`);
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
 *  ${vp[2]}
 * }
 */
function showData(reqData) {
  const { ok } = reqData;
  if (ok) {
    ${vp[3]}
    const div_data = document.querySelector('.data-container');
    div_data.innerHTML = temp;
    div_data.removeAttribute('hidden');
    loadedOk()
    setTimeout(() => {
      div_data.setAttribute('hidden', 'hidden');
      hiddenSpinner();
    ${vp[4]}
  } else {
    const { msg } = reqData;
    const temp = \`<h3>Algo salió mal</h3>
                  <p>\${msg}</p>\`;
    const div_data = document.querySelector('.data-container');
    div_data.innerHTML = temp;
    div_data.removeAttribute('hidden');
    loadedError()
    setTimeout(() => {
      div_data.setAttribute('hidden', 'hidden');
      hiddenSpinner();
    ${vp[5]}
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
`;
}
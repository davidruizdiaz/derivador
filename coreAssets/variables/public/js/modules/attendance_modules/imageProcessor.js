import { removeEmptyLines } from "../../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Submódulo de asistencia encargado del procesamiento de la imagen del rostro.
 * @module Asistencia/ProcesadorImagen
 */
import { sendFaceToAttendanceRegister } from "../common_modules/apiConsumer.js";
${vp[1]}
import { notificator } from "../common_modules/notifications.js";
import { showSpinner, loadedError } from "../common_modules/spinner.js";
${vp[2]}
/**
 * Extrae la imagen de un canvas y envia la imagen para ser procesada en el servidor.
 * @param canvas {Object} Objeto canvas de la vista
 */
const processImage = async (canvas) => {
  console.log('Imagen recibida ️🙌');
  notificator.notify('Enviando foto, aguarde un momento', 'info')
  ${vp[3]}
  canvas.toBlob(async blob => {
    ${vp[4]}
  }, 'image/jpeg', 1);
};
/**
 * Envía la imagen en formato blob al servidor.
 * @param blob {Object} Imagen convertida a blob
 * @returns {Promise<object>} Objeto de respuesta del servidor
 */
const sendBlobToServer = async (blob) => {
  console.log('Enviando al server ⏳');
  try {
    showSpinner();
    ${vp[5]}
  } catch (err) {
    loadedError()
    notificator.notify('Error enviar los datos', 'error')
    console.error(err);
  }
};
export { processImage };
`;
}
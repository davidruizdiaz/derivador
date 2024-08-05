/**
 * Submódulo de asistencia encargado del procesamiento de la imagen del rostro.
 * @module Asistencia/ProcesadorImagen
 */
import { sendFaceToAttendanceRegister } from "../common_modules/apiConsumer.js";
import { stopDetections } from "./faceDetection.js";
import { notificator } from "../common_modules/notifications.js";
import { showSpinner, loadedError } from "../common_modules/spinner.js";

/**
 * Extrae la imagen de un canvas y envia la imagen para ser procesada en el servidor.
 * @param canvas {Object} Objeto canvas de la vista
 */
const processImage = async (canvas) => {
  console.log('Imagen recibida ️🙌');
  notificator.notify('Enviando foto, aguarde un momento', 'info')
  stopDetections();
  canvas.toBlob(async blob => {
    await sendBlobToServer(blob);
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
    const data = await sendFaceToAttendanceRegister(blob);
    if (data.ok) {
      notificator.showData(data);
      notificator.notify('Persona identificada', 'info')
      return data;
    } else {
      notificator.showData(data);
      notificator.notify('No se pudo identificar a la persona', 'error')
      return data;
    }
  } catch (err) {
    loadedError()
    notificator.notify('Error enviar los datos', 'error')
    console.error(err);
  }
};

export { processImage };

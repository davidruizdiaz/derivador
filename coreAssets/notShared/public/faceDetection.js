/**
 * Submódulo de asistencia encargado de la detección de rostros.
 * @module Asistencia/DetecciónRostros
 */
import { video } from "../common_modules/cam.js";
import { processImage } from "./imageProcessor.js";
import { notificator } from "../common_modules/notifications.js";

/**
 * Path de los modelos de faceapi.
 * @type {string}
 */
const MODEL_URI = '../../../models/'
/**
 * Variable para guardar el objeto canvas de la vista.
 * @type {Object}
 * @default null
 */
let canvas = null;
/**
 * Bandera para saber si la imagen ya ha sido enviada o no.
 * @type {boolean}
 * @default false
 */
let isFaceSend = false;
/**
 * Para guardar el identificador de los intervalos creados.
 * @type {string}
 * @default null
 */
let timer = null;
/**
 * Contiene el objeto video de la vista.
 * @type {Object}
 * @default null
 */
let vidElem = null;
/**
 * Guarda los intervalos creados. Son creados intervalos entre cada detección de rostro.
 * @type {Array<Object>}
 */
let intervals = [];

/**
 * Carga los modelos y ejecuta el video.
 * @return {boolean} loaded=true, noLoaded=false
 */
async function loadFaceApi() {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URI);
    if (faceapi.nets.tinyFaceDetector.isLoaded) {
      vidElem = await video.start();
      return true;
    } else {
      throw new Error('Error en faceapi, no se pudo cargar el modelo')
    }
  } catch (err) {
    console.error(err);
    return false;
  }
}

/**
 * Inicia el proceso de detección de rostros.
 */
async function startDetections() {
  console.log('Iniciando detección 📷');
  notificator.notify('Iniciando detección 📷', 'info')
  //INFO: Se crean intervalos para permitir el procesamiento de faceapi
  const inter = setInterval(async () => {
    const isFaceDetected = await hasFace(vidElem);
    if (isFaceDetected && intervals.length !== 0) {
      if (!canvas) {
        canvas = faceapi.createCanvasFromMedia(vidElem);
      }

      if (!isFaceSend) {
        isFaceSend = true;
        timer = setTimeout(async () => {
          console.log('Intentando enviar 🤞');
          faceapi.matchDimensions(canvas, vidElem);
          canvas.getContext('2d').drawImage(vidElem, 0, 0, canvas.width, canvas.height);
          processImage(canvas);
        }, 1000);
      }
    } else {
      clearTimeout(timer);
      isFaceSend = false;
    }
  }, 100);
  intervals.push(inter);
}

/**
 * Verifica que haya un rostro en un multimedia.
 * @param media {Object} Elemento video o imagen de HTML
 * @returns {boolean} true=detectado false=no detectado
 */
async function hasFace(media) {
  // Valores comunes (debe ser divisible entre 32): 128 160 224 320 416 512 608
  // Para detectAllFaces recomendado: 512 608
  // Para detectSingleFace recomendado: 128 160
  // Por defecto: 416
  const inputSize = 320;
  const scoreThreshold = 0.5;
  const detection = await faceapi.detectSingleFace(
    media,
    new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
  );
  return (detection !== undefined) ? true : false;
}

/**
 * Detiene la detección de rostros.
 */
function stopDetections() {
  clearTimeout(timer);
  timer = null;
  intervals.forEach(inter => clearInterval(inter));
  intervals.length = 0;
  isFaceSend = false;
  console.log('Detección detenida ✋');
}

export { loadFaceApi, startDetections, hasFace, stopDetections };

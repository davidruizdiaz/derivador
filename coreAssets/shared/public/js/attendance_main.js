/**
 * Módulo principal de Asistencia.
 * @module Asistencia
 */

import { loadFaceApi, startDetections, stopDetections } from "./modules/attendance_modules/faceDetection.js";

/** Inicia el módulo y la aplicación */
async function init() {
  const isLoaded = await loadFaceApi();
  if (isLoaded) {
    startDetections();
  } else {
    console.error('Error');
  }
}


document.addEventListener('DOMContentLoaded', init);

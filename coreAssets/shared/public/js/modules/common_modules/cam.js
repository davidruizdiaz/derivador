/**
 * Modulo encargado de hacer funcionar la cámara.
 * @module Común/Cámara
 */

/**
 * Inicia la captura de la cámara.
 * @returns {Promise<object>} Referencia del elemento video de la vista.
 */
function start() {
  return new Promise((resolve, reject) => {
    const vidElem = document.querySelector("#video-cam");
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then(function(stream) {
        if (navigator.mozGetUserMedia) {
          vidElem.mozSrcObject = stream;
        } else {
          vidElem.srcObject = stream;
        }
        vidElem.play();
        resolve(vidElem);
      })
      .catch(function(err) {
        console.error(err);
        reject(err);
      });
  });
}

/**
 * Objeto que contiene la función para inicia la cámara.
 * @type {Object}
 * @property {function} start
 * @returns {Promise<Object>} Referencia del elemento video del HTML
 */
const video = {
  /**
   * @inner
   * @function
   * @returns {Promise<object>} Referencia del elemento video del HTML
   */
  start
}

export { video };

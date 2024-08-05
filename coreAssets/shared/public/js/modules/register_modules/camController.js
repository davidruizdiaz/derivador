/**
 * Submódulo de registro encargado de controlar la cámara
 * y tomar fotos.
 * @module Registro/ControladorCámara
 */

/**
 * Referencia al elemento video de la vista.
 * @type {Object}
 */
const video = document.querySelector('#video-cam');

/**
 * Bandera para contar la cantidad de cantidad
 * fotos que son tomadas.
 * @type {number}
 * @default 0
 */
let cantFotos = 0;

/**
 * Reinicia el contador de fotos.
 */
function reinitFotos() {
  cantFotos = 0;
}

/**
 * Procesa la captura de fotos.
 */
function takeFoto() {
  if (cantFotos >= 3) {
    return;
  }
  loadCanvas()
}

/**
 * Captura el video y los coloca en el canvas
 * correspondiente según el contador.
 */
function loadCanvas() {
  const canvas = document.querySelector(`#canvas${cantFotos + 1}`);
  const ctxt = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  // HACK: rota el canvas horizontalmente
  ctxt.translate(canvas.width, 0); // mueve el origen
  ctxt.scale(-1, 1);               // rota el canvas

  ctxt.drawImage(video, 0, 0, canvas.width, canvas.height);
  loadImage(canvas);
}

/**
 * Cargar las las imágenes según el canvas.
 * @param canvas {Object} Objeto canvas de la vista
 */
function loadImage(canvas) {
  const num = cantFotos + 1;
  const img = document.querySelector(`#img${num}`);
  const inf = document.querySelector(`#inf${num}`);
  if (num === 1) {
    img.classList.remove('face-left');
  } else if (num === 2) {
    img.classList.remove('face-center');
  } else if (num === 3) {
    img.classList.remove('face-right');
  }
  img.src = canvas.toDataURL();
  inf.textContent = '✔️ Listo';
  cantFotos += 1;
}


export { takeFoto, reinitFotos };

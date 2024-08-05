/**
 * Submódulo que sirve de interfaz con la faceapi.
 * @module frameworks
 */

const faceapi = require('face-api.js');
const { loadImage } = require('canvas');
const dayjs = require('dayjs');

// Para detectAllFaces recomendado: 512 608
// Para detectSingleFace recomendado: 128 160
// Por defecto: 416

const inputSize = 320;
const scoreThreshold = 0.5;

/**
 * Devuelve un JSON con los descriptores de todas las imágenes
 * pasadas como parámetro
 * @async
 * @param {Array<Blob>} faceBlobs Array con los blobs de los rostros
 * @return JSON descriptors
 */
async function getJsonDescriptorsFromFaceBlobs(faceBlobs) {
  try {
    const label = faceBlobs[0].originalname.split('_').slice(0, 2).join('_');
    let descriptors = [];
    for (const blob of faceBlobs) {
      const image = await loadImage(blob.buffer);
      const detection = await faceapi.detectSingleFace(
        image,
        new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
      ).withFaceLandmarks().withFaceDescriptor();
      if (!detection) {
        throw new Error('No se detectaron todos los rostro');
      }
      descriptors.push(detection.descriptor);
    }
    const labeledFaceDescriptor = new faceapi.LabeledFaceDescriptors(label, descriptors);
    const descriptorsJSON = labeledFaceDescriptor.toJSON();
    return descriptorsJSON;
  } catch (error) {
    console.error(error);
    throw new Error('Error al detectar los rostros');
  }
}

/**
 * Compara la imagen de una persona con los descriptores almacenados
 * en la base de datos para realizar el reconocimiento de la persona
 * @async
 * @param {Array<object>} personsDesciptors Array con los descriptores de la db
 * @example [{label: string, descriptors:[[...],...]}]
 * @param {Buffer} faceBlob Buffer de la imagen a comparar
 * @return string Documento de la persona reconocida
 */
async function matchFace(personsDesciptors, faceBlob) {
  try {
    const refImage = await loadImage(faceBlob);
    const refDetection = await faceapi.detectSingleFace(
      refImage,
      new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    ).withFaceLandmarks().withFaceDescriptor();
    let queryDescriptors = [];
    for (const descriptor of personsDesciptors) {
      queryDescriptors.push(faceapi.LabeledFaceDescriptors.fromJSON(descriptor));
    }
    const queryMatcher = new faceapi.FaceMatcher(queryDescriptors, scoreThreshold);
    const bestMatch = queryMatcher.findBestMatch(refDetection.descriptor);
    return bestMatch._label.split('_')[1];
  } catch (error) {
    console.error(error);
    throw new Error('Error al procesar el rostro');
  }
}

module.exports = {
  getJsonDescriptorsFromFaceBlobs,
  matchFace,
};

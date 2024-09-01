import { removeEmptyLines } from "../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
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

const inputSize = ${vp[1]};
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
 * ${vp[2]}
 * @async
 * @param {Array<object>} personsDesciptors Array con los descriptores de la db
 * @example [{label: string, descriptors:[[...],...]}]
 * @param {Buffer} faceBlob Buffer de la imagen a comparar
 * @return ${vp[3]}
 */
async function matchFace(personsDesciptors, faceBlob) {
  try {
    const refImage = await loadImage(faceBlob);
    ${vp[4]}
      refImage,
      new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
    ${vp[5]}
    let queryDescriptors = [];
    for (const descriptor of personsDesciptors) {
      queryDescriptors.push(faceapi.LabeledFaceDescriptors.fromJSON(descriptor));
    }
    const queryMatcher = new faceapi.FaceMatcher(queryDescriptors, scoreThreshold);
    ${vp[6]}
  } catch (error) {
    console.error(error);
    throw new Error('Error al procesar el rostro');
  }
}

module.exports = {
  getJsonDescriptorsFromFaceBlobs,
  matchFace,
};
`;
}
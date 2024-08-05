/**
 * Submódulo que sirve de interfaz con la faceapi.
 * @module frameworks
 */

const path = require('path');
const canvas = require('canvas')
const faceapi = require('face-api.js');

const {
  Canvas,
  Image,
  ImageData,
} = canvas;

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

/**
 * Carga los modelos de faceapi.
 * @function
 */
const initFaceapiModels = async () => {
  try {
    await faceapi.nets.tinyFaceDetector.loadFromDisk(path.resolve('./server/faceapi/faceapiModels'));
    await faceapi.nets.faceLandmark68Net.loadFromDisk(path.resolve('./server/faceapi/faceapiModels'));
    await faceapi.nets.faceRecognitionNet.loadFromDisk(path.resolve('./server/faceapi/faceapiModels'));
  } catch (error) {
    console.error(error)
  }
};

module.exports = { initFaceapiModels }



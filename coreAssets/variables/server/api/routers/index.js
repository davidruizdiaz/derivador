import { removeEmptyLines } from "../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
const { Router } = require('express');
const marcacionRouter = require('./marcacionRouter');
const personRouter = require('./personRouter');
const multer = require('multer');
const authRouter = require('./authRouter');
${vp[1]}

const router = Router();
router.use('/attendance', marcacionRouter);

// Se utiliza multer para manejar las peticiones de multipar/form-data
// que incluyen imágenes
router.use('/person', multer().array('faceBlobs', 3), personRouter);
${vp[2]}
router.use('/auth', multer().none(), authRouter);

module.exports = router
`;
}
const { Router } = require('express');
const marcacionRouter = require('./marcacionRouter');
const personRouter = require('./personRouter');
const multer = require('multer');
const authRouter = require('./authRouter');

const router = Router();
router.use('/attendance', marcacionRouter);

// Se utiliza multer para manejar las peticiones de multipar/form-data
// que incluyen imágenes
router.use('/person', multer().array('faceBlobs', 3), personRouter);

router.use('/auth', multer().none(), authRouter);

module.exports = router

/**
 * Submódulo que recibe las peticiones de para el registro de las asistencias.
 * @module api/enrutadores/marcación
 */

const { Router } = require('express');
const multer = require('multer');
const {
  registerAttendance,
  deletePersonAttendanceProcess,
  attendanceConsultProcess
} = require('../controllers/attendanceController');

const marcacionRouter = Router();
const upload = multer()

/**
 * Ruta para registrar la marcación de una persona.
 * @description POST /api/attendance/register
 */
marcacionRouter.post('/register', upload.single('clientFaceBlob'), async (req, res) => {
  try {
    const blob = req.file.buffer;
    const result = await registerAttendance(blob);
    const { ok } = result;
    if (ok) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: 'Error al procesar la petición'
    });
  }
});

/**
 * Ruta para eliminar las marcaciones de una persona.
 * @description POST /api/attendance/delete
 */
marcacionRouter.delete('/delete', upload.none(), async (req, res) => {
  try {
    const { personId } = req.body;
    const result = await deletePersonAttendanceProcess(personId);
    const { ok } = result;
    if (ok) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: 'Error al procesar la petición'
    });
  }
});

/**
 * Ruta para consultar marcaciones de una persona.
 * @description POST /api/attendance/consult
 */
marcacionRouter.post('/consult', upload.none(), async (req, res) => {
  try {
    const result = await attendanceConsultProcess(req.body);
    const { ok } = result;
    if (ok) {
      return res.status(200).json(result);
    } else {
      return res.status(400).json(result);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      ok: false,
      msg: 'Error al procesar la petición'
    });
  }
});

module.exports = marcacionRouter;

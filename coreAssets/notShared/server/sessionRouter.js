/**
 * Submódulo que recibe las peticiones de para el registro sesións.
 * @module api/enrutadores/sesión
 */

const { Router } = require('express');
const {
  addNewSessionProcess,
  updateStateProcess,
} = require('../controllers/sessionController');

const sessionRouter = Router();

/**
 * Endpoint para agregar nueva sesión.
 * @description POST /api/session/addNew
 */
sessionRouter.post('/addNew', async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      throw new Error('Error en el request');
    }
    const sessionData = {
      description: body.description, date: body.date,
      numCaptures: body.numCaptures, initHour: body.initHour, endHour: body.endHour
    };
    const result = await addNewSessionProcess(sessionData);
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
      msg: 'Error al procesar los datos'
    });
  }
});

/**
 * Endpoint para actualizar una sesión por su id.
 * @description POST /api/session/updateState
 */
sessionRouter.put('/updateState', async (req, res) => {
  try {
    const { body } = req;
    if (!body) {
      throw new Error('Error en el request');
    }
    const sessionData = {
      state: body.state,
      id: body.id,
    };
    const result = await updateStateProcess(sessionData);
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
      msg: 'Error al procesar los datos'
    });
  }
});

module.exports = sessionRouter;

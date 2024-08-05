/**
 * Submódulo que recibe las peticiones de para el registro personas.
 * @module api/enrutadores/persona
 */

const { Router } = require('express');
const {
  addNewPersonProcess,
  searchPersonByNameOrDocumentProcess,
  searchPersonByIdProcess,
  updatePersonProcess,
  deletePersonProcess
} = require('../controllers/personController');

const personRouter = Router();

/**
 * Endpoint para agregar nueva persona.
 * @description POST /api/person/addNew
 */
personRouter.post('/addNew', async (req, res) => {
  try {
    const { body, files } = req;
    if (!body || !files) {
      throw new Error('Error en el request');
    }
    const personData = { name: body.name, document: body.document, faceBlobs: files };
    const result = await addNewPersonProcess(personData);
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
 * Endpoint para actualizar los datos de una persona.
 * @description PUT /api/person/update
 */
personRouter.put('/update', async (req, res) => {
  try {
    const { body, files } = req;
    if (!body || !files) {
      throw new Error('Error en el request');
    }
    const personData = { id: body.id, name: body.name, document: body.document, faceBlobs: files };
    const result = await updatePersonProcess(personData);
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
 * Endpoint para eliminar una persona.
 * @description DELETE /api/person/delete
 */
personRouter.delete('/delete', async (req, res) => {
  try {
    console.log('>>>> router', req.body);
    const { id } = req.body;
    if (!id) {
      throw new Error('Error en el request');
    }
    const result = await deletePersonProcess(id);
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
 * Endpoint para realizar consultas por nombre o documento.
 * @description POST /api/person/searchByNameOrDocument
 */
personRouter.post('/searchByNameOrDocument', async (req, res) => {
  try {
    const { searchedParam } = req.body;
    const result = await searchPersonByNameOrDocumentProcess(searchedParam);
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
 * Endpoint para realizar la consulta de una persona por su id.
 * @description POST /api/person/searchPersonById
 */
personRouter.post('/searchPersonById', async (req, res) => {
  try {
    const { id } = req.body;
    const result = await searchPersonByIdProcess(id);
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

module.exports = personRouter;

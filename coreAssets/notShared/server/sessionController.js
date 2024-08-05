/**
 * Submódulo que direcciona las solicitudes hacia los servicios correspondientes.
 * @module api/controlador/sesión
 */

const SessionService = require("../../services/sessionServices")

/**
 * Procesa la petición para nueva sesión.
 * @param sessionData {Object} Datos de la sesión
 * @example
 * { description: string, date: string, numCaptures: string, initHour: string, endHour: string }
 * @return {Object} Lo mismos que en SessionService.addNewSessionServices
 */
async function addNewSessionProcess(sessionData) {
  const service = new SessionService()
  const result = await service.addNewSessionService(sessionData);
  return result;
}

/**
 * Procesa el cambio del estado de una sesión a través del id de la sesión.
 * @param session {object} Objeto con el id de la sesión y el estado a actualizar
 * @example
 * { id: string, state: string }
 * @returns {Object} Mensaje de confirmación
 * @example
 * { ok: boolean, msg: string }
 */
async function updateStateProcess(session) {
  const service = new SessionService()
  const result = await service.updateStateService(session);
  return result;
}

module.exports = {
  addNewSessionProcess,
  updateStateProcess,
}

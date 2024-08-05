/**
 * Submódulo de servicios.
 * @module servicios/sesiones
 */

const sessionRepositoryBehavior = require("../repository/behaviors/sessionRepositoryBehavior");


/**
 * Representa los servicios que se pueden realizar con Sesiones.
 * @class
 * @method addNewSessionService
 * @method updateStateService
 * @example
 * Modelo session
 * const session = {
 *   id: uuid,
 *   description: string,
 *   date: string,
 *   numCaptures: number,
 *   initHour: string,
 *   endHour: string,
 *   state: string['ACT', 'COM', 'INC']
 * }
 */
class SessionService {
  constructor() {
    this.sessionDb = new sessionRepositoryBehavior();
  }

  /**
   * Agrega una nueva sesión.
   * @async
   * @param sessionData {object} Datos de la sesión
   * @example
   * { description: string, date: string, numCaptures: string, initHour: string, endHour: string }
   * @return {Object} Datos de la sesión registrada.
   * @example
   * { ok: boolean, session: { 
   *    id: uuid, description: string, date: string,
   *    numCaptures: number, initHour: string, endHour: string, state: string
   * } | msg: string }
   */
  async addNewSessionService(sessionData) {
    try {
      const sess = await this.sessionDb.add(sessionData);
      return sess;
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Servicio que actualiza el estado de una sesión a través del id de la sesión.
   * @param session {object} Objeto con el id de la sesión y el estado a actualizar
   * @example
   * { id: string, state: string }
   * @returns {Object} Mensaje de confirmación
   * @example
   * { ok: boolean, msg: string }
   */
  async updateStateService(session) {
    try {
      return await this.sessionDb.updateState(session);
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }
}

module.exports = SessionService;

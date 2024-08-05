/**
 * Submódulo con funciones de la aplicación y consultas a db.
 * @module comportamiento/sesiones
 */

const { Op } = require('sequelize');
const db = require('../models')

/**
 * Clase que implementa las operaciones a base de datos para Session.
 * @class
 * @method add
 * @method delete
 * @method searchSessionBydescriptionOrDate
 */
class SessionRepositoryBehavior {
  constructor() {
    this.session = db.Session;
    this.db = db;
  }

  /**
   * Guarda los datos de una Sesión.
   * @async
   * @param session {Object} Datos de la Sesión
   * @example
   * { description: string, date: string, numCaptures: number,
   * initHour: string, endHour: string }
   * @return {Object} Nueva Sesión
   * @example
   * { ok: boolean, session: { 
   *    id: uuid, description: string, date: string,
   *    numCaptures: number, initHour: string, endHour: string, state: string
   * } | msg: string }
   */
  async add(session) {
    try {
      const sess = await this.session.create(session);
      return {
        ok: true,
        session: {
          id: sess.id,
          description: sess.description,
          date: sess.date,
          numCaptures: sess.numCaptures,
          initHour: sess.initHour,
          endHour: sess.endHour,
          state: sess.state,
        }
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Actualiza el estado de una sesión a través del id de la sesión.
   * @param session {object} Objeto con el id de la sesión y el estado a actualizar
   * @example
   * { id: string, state: string }
   * @returns {Object} Mensaje de confirmación
   * @example
   * { ok: boolean, msg: string }
   */
  async updateState(session) {
    try {
      const { id, state } = session;
      const res = await this.session.update(
        { state: state }, {
        fields: ['state'],
        where: { id: id },
      });
      if (!res[0]) {
        return {
          ok: false,
          msg: 'No se encontró la sesión a actualizar'
        };
      }
      return {
        ok: true,
        msg: 'Sesión actualizada'
      };
    } catch (error) {
      console.error(error.name)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

}

module.exports = SessionRepositoryBehavior;

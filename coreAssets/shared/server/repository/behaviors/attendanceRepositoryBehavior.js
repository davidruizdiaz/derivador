/**
 * Submódulo con funciones de la aplicación y consultas a db.
 * @module comportamiento/asistencia
 */

const { Op } = require('sequelize');
const db = require('../models');

/**
 * Clase que implementa las operaciones a base de datos para asistencias.
 * @class
 * @method add
 * @method delete
 * @method getAttendancesByPersonDocument
 */
class AttendanceRepositoryBehavior {
  constructor() {
    this.attendance = db.Attendance;
    this.db = db;
  }

  /**
   * Registra la asistencia de una persona.
   * @async
   * @param attendance {object} Objeto con datos de la asistencia
   * @example 
   * { personId: UUID, date: 'YYYY-MM-DD', hours: 'HH:mm:ss' }
   * @returns {Object} Registro de la asistencia
   * @example 
   * { ok: boolean, person: { name: string, date: 'YYYY-MM-DD', hours: 'HH:mm:ss' } | msg: string }
   */
  async add(attendance) {
    try {
      const att = await this.attendance.create(attendance);
      if (!att) {
        return { ok: false, msg: 'No se pudo registrar la asistencia' }
      } else {
        const per = await this.db.Person.findByPk(att.personId);
        return {
          ok: true,
          person: {
            name: per.name,
            document: per.document,
            date: att.date,
            hours: att.hours,
          },
        };
      }
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Elimina las asistencias de una persona.
   * @async
   * @param personId {uuid} Id de la persona
   * @returns {Object} Mensaje de confirmación
   * @example
   * { ok: boolean, msg: string }
   */
  async delete(personId) {
    try {
      const queryRes = await this.attendance.destroy({
        where: { personId: personId }
      });
      if (!queryRes) {
        return { ok: false, msg: 'No se pudieron eliminar las asistencias de la persona' };
      } else {
        return {
          ok: true,
          msg: `${queryRes} registros de asistencias eliminados`,
        };
      }
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

  /**
   * Recupera las asistencias de personas por su documento y un rango de fechas.
   * @async
   * @param queryObject {Object} Parámetros de consulta
   * @example { perDocument: string, dateFrom: string, dateUntil: string }
   * @returns {Object} Asistencias de la persona
   * @example
   * {
   *   ok: boolean,
   *   name: string,
   *   document: string,
   *   attendances: [{date: string, hours: string}, ...],
   *   | msg: string
   * }
   */
  async getAttendancesByPersonDocument(queryObject) {
    try {
      const { perDocument, dateFrom, dateUntil } = queryObject;
      const per = await this.db.Person.findOne({
        attributes: ['id', 'name', 'document'],
        where: { document: perDocument }
      });
      if (!per) {
        return { ok: false, msg: 'No se encontró ningúna persona con ese documento' };
      }
      const atts = await this.attendance.findAll({
        attributes: ['personId', 'date', 'hours'],
        where: {
          personId: per.id,
          date: { [Op.between]: [dateFrom, dateUntil] }
        }
      });
      return {
        ok: true,
        name: per.name,
        document: per.document,
        attendances: !atts ? [] : atts.map(at => ({ date: at.date, hours: at.hours })),
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

}

module.exports = AttendanceRepositoryBehavior;

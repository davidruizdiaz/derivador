import { removeEmptyLines } from "../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Submódulo con funciones de la aplicación y consultas a db.
 * @module comportamiento/asistencia
 */

const { ${vp[1]} } = require('sequelize');
const db = require('../models');
${vp[2]}

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
   * ${vp[3]}
   * @async
   * @param ${vp[4]}
   * @example 
   * ${vp[5]}
   * @returns ${vp[6]}
   * @example 
   * ${vp[7]}
   */
  async add(${vp[8]}) {
    try {
      const ${vp[9]} 
        return { ok: false, msg: 'No se pudo registrar la asistencia' }
      } else {
        ${vp[10]}
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
          msg: \`\${queryRes} registros de asistencias eliminados\`,
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
   *   attendances: [{date: string, hours: string${vp[11]}}, ...],
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
        attributes: ['personId', '${vp[12]}', 'hours'],
        where: {
          personId: per.id,
        ${vp[13]}
      });
      return {
        ok: true,
        name: per.name,
        document: per.document,
        ${vp[14]}
      };
    } catch (error) {
      console.error(error)
      return { ok: false, msg: 'Error: No se puedo completar la operación' };
    }
  }

}

module.exports = AttendanceRepositoryBehavior;
`;
}
import { removeEmptyLines } from "../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Submódulo de servicios.
 * @module frameworks
 */

const dayjs = require("dayjs");
const { matchFace } = require("../faceapi/faceapi_gateways");
const AttendanceRepositoryBehavior = require("../repository/behaviors/attendanceRepositoryBehavior");
const PersonService = require("./personServices");

/**
 * Representa los servicios que se pueden realizar con las asistencias.
 * @class
 * @method registerAttendanceService
 * @method deleteAttendancesService
 * @method attendancesConsultService
 * @example
 * {
 *   id: uuid, 
 *   personId: uuid, 
 *   date: string, 
 *   hours: string
 * }
 */
class AttendanceServices {

  constructor() {
    this.attendanceDb = new AttendanceRepositoryBehavior();
  }

  /**
   * ${vp[1]}
   * @async
   * ${vp[2]}
   * @returns {Object} Datos de la asistencia
   * @example
   * ${vp[3]}
   */
  async registerAttendanceService(${vp[4]}) {
    try {
      const personService = new PersonService();
      const queryResult = await personService.getAllPersonsDescriptorsService();
      if (!queryResult.ok) {
        throw new Error(queryResult.msg);
      }
      ${vp[5]}
      ${vp[6]}
      ${vp[7]}
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Eliminar asistencias de una persona.
   * @async
   * @param personId {uuid} Id de la persona
   * @returns {Object} Mensaje de confirmación
   * @example
   * { ok: boolean, msg: string }
   */
  async deleteAttendancesService(personId) {
    try {
      const queryAttRes = await this.attendanceDb.delete(personId);
      if (!queryAttRes.ok) {
        throw new Error(queryAttRes.msg)
      }
      return {
        ok: true,
        msg: queryAttRes.msg
      };
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Consulta las asistencias de una persona según
   * su documento y un rango de fechas.
   * @async
   * @param {object} queryObject Parámetros de consulta
   * @returns {Object} Registros de asistencia
   * @example
   * {
   *   ok: boolean,
   *   ${vp[8]}
   * }
   */
  async attendancesConsultService(queryObject) {
    try {
      const queryAttRes = await this.attendanceDb.getAttendancesByPersonDocument(queryObject);
      if (!queryAttRes.ok) {
        throw new Error(queryAttRes.msg)
      }
      return queryAttRes;
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }
}

module.exports = { AttendanceServices };
`;
}
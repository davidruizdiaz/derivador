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
   * Registra la asistencia de una persona.
   * @async
   * @param Blob {Object} Buffer de la imagen
   * @returns {Object} Datos de la asistencia
   * @example
   * { ok: boolean, person:{ name: string, document: string, date: string, hour: string, }|msg: string }
   */
  async registerAttendanceService(faceBlob) {
    try {
      const personService = new PersonService();
      const queryResult = await personService.getAllPersonsDescriptorsService();
      if (!queryResult.ok) {
        throw new Error(queryResult.msg);
      }
      const personMatchedDocument = await matchFace(queryResult.personsDescriptors, faceBlob);
      const personWithId = await personService.getPersonIdByDocumentService(personMatchedDocument);
      if (!personWithId.ok) {
        throw new Error(personWithId.msg);
      }
      const newAttendance = {
        personId: personWithId.personId,
        date: dayjs().format('YYYY-MM-DD'),
        hours: dayjs().format('HH:mm:ss')
      }
      const savedAttendance = await this.attendanceDb.add(newAttendance);
      return savedAttendance;
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
   *   result: {
   *     name: string,
   *     document: string,
   *     attendances: [{date: string, hours: string}, ...],
   *   } | msg: string
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

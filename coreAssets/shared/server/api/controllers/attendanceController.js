/**
 * Submódulo que direcciona las solicitudes hacia los servicios correspondientes.
 * @module api/controlador/asistencias
 */

const { AttendanceServices } = require("../../services/attendanceServices");

/**
 * Inicia el proceso de registro de asistencia.
 * @param Blob {Object} Buffer de la imagen
 * @return {Object} Objeto con los datos de respuesta
 * @example
 * { 
 *  ok: boolean,
 *  person: {
 *    name: string,
 *    document: string,
 *    date: string,
 *    hour: string,
 *  }|msg: string
 * }
 */
async function registerAttendance(blob) {
  const attendanceService = new AttendanceServices();
  const result = await attendanceService.registerAttendanceService(blob);
  return result;
}

/**
 * Inicia el proceso para eliminar asistencias de una persona.
 * @param personId {uuid} Id de la persona
 * @return {Object} Objeto con los datos de respuesta
 * @example return
 * { 
 *  ok: boolean,
 *  msg: toString
 * }
 */
async function deletePersonAttendanceProcess(personId) {
  const attendanceService = new AttendanceServices();
  const result = await attendanceService.deleteAttendancesService(personId);
  return result;
}

/**
 * Inicia el proceso para consultar asistencias de una persona.
 * @param queryObject {Object} Parametros de consulta
 * @example { perDocument: string, dateFrom: string, dateUntil: string }
 * @return {Object} Objeto con los datos de respuesta
 * {
 *   ok: boolean,
 *   result: {
 *     name: string,
 *     document: string,
 *     attendances: [{date: string, hours: string}, ...],
 *   } | msg: string
 * }
 */
async function attendanceConsultProcess(queryObject) {
  const attendanceService = new AttendanceServices();
  const result = await attendanceService.attendancesConsultService(queryObject);
  return result;
}

module.exports = {
  registerAttendance,
  deletePersonAttendanceProcess,
  attendanceConsultProcess,
}

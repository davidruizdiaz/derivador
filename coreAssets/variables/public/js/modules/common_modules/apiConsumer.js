import { removeEmptyLines } from "../../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Modulo encargado de hacer las consultas a la API.
 * @module Común/APIConsumer
 */
/**
 * URL de la API
 * @type {string}
 */
const APIURL = "http://localhost:2700/api"
/**
 * Envía imagen para comprobación de rostro.
 * @param blob {object} Blob de la imagen
 * @return {Object} JSON con los datos recuperados 
 * del servidor o un mensaje de error
 * @example
 * { 
 *   ok: boolean, 
 *   ${vp[1]}
 * }
 */
const sendFaceToAttendanceRegister = async ${vp[2]} => {
  if (!blob) {
    return new Error('No se pasó la imagen');
  }
  const formData = new FormData();
  ${vp[3]}
  const options = {
    method: 'POST',
    body: formData,
  }
  try {
    const resp = await fetch(APIURL + '/attendance/register', options);
    const data = await resp.json();
    return data
  } catch (err) {
    console.error(err);
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Envía datos de una persona al servidor para ser guardado.
 * @param person {Object} Datos de la persona
 * @example
 * { name: string, document: string, faceBlobs: Array }
 * @return {Object} JSON con los datos de la persona guardada 
 * o un mensaje de error
 * @example
 * { 
 *  ok: boolean, 
 *  person: { 
 *    name: string 
 *  } | msg: string 
 * }
 */
const addNewPerson = async person => {
  try {
    if (!person) {
      throw new Error('Falta el parámetro person');
    }
    const formData = new FormData();
    formData.append('name', person.name);
    formData.append('document', person.document);
    person.faceBlobs.forEach((blob, i) => {
      formData.append(
        'faceBlobs',
        blob,
        \`\${person.name.replaceAll(' ', '')}_\${person.document}_face\${i}.png\`
      );
    });
    const options = {
      method: 'POST',
      body: formData,
    }
    const resp = await fetch(APIURL + '/person/addNew', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Envía datos de una persona al servidor para actualizarlos.
 * @param person {Object} Datos de la persona
 * @example
 * { id: string, name: string, document: string, faceBlobs: Array }
 * @return {Object} JSON con los datos actualizados o un mensaje de error
 * @example
 * { 
 *  ok: boolean,
 *  person: {
 *    name: string 
 *  } | msg: string 
 * }
 */
const updatePerson = async person => {
  try {
    if (!person) {
      throw new Error('Falta el parámetro person');
    }
    const formData = new FormData();
    formData.append('id', person.id);
    formData.append('name', person.name);
    formData.append('document', person.document);
    person.faceBlobs.forEach((blob, i) => {
      formData.append(
        'faceBlobs',
        blob,
        \`\${person.name.replaceAll(' ', '')}_\${person.document}_face\${i}.png\`
      );
    });
    const options = {
      method: 'PUT',
      body: formData,
    }
    const resp = await fetch(APIURL + '/person/update', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Envía id para eliminar los datos de una persona.
 * @param id {uuid} Id de la persona
 * @return {Object} JSON de confirmación de acción
 * @example
 * { ok: boolean, msg: string }
 */
const deletePerson = async id => {
  try {
    if (!id) {
      throw new Error('Falta el parámetro id');
    }
    const formData = new FormData();
    formData.append('id', id);
    const options = {
      method: 'DELETE',
      body: formData,
    }
    const resp = await fetch(APIURL + '/person/delete', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Envía id para eliminar las marcaciones de una persona.
 * @param id {uuid} Id de la persona
 * @return {Object} JSON de confirmación de acción
 * @example
 * { ok: boolean, msg: string }
 */
const deletePersonAttendances = async personId => {
  try {
    if (!personId) {
      throw new Error('Falta el parámetro id');
    }
    const formData = new FormData();
    formData.append('personId', personId);
    const options = {
      method: 'DELETE',
      body: formData,
    }
    const resp = await fetch(APIURL + '/attendance/delete', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Envía datos al servidor para realizar el login.
 * @param userData {Object} Datos del usuario
 * @example
 * { user: string, pass: string }
 * @return redirect | object 
 * @description Si todo va bien recibe una redirección sino un objeto
 */
const sendUserDataToLogin = async userData => {
  try {
    if (!userData) {
      throw new Error('Falta el parámetro userData');
    }
    const formData = new FormData();
    formData.append('user', userData.user);
    formData.append('pass', userData.pass);
    const options = {
      method: 'POST',
      body: formData,
    }
    const resp = await fetch(APIURL + '/auth/login', options);
    if (resp.redirected) {                                        //HACK: redirección
      window.location.href = resp.url;
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Busca personas por nombre o documento.
 * @param param {string} Parámetro de búsqueda
 * @return {Object} JSON con datos de las coincidencias encontradas
 * @example
 * {
 *   ok: boolean,
 *   persons: [
 *    { id: uuid, name: string, document: string }, ...
 *   ] | msg: string
 * }
 */
const searchPersonByNameOrDocument = async param => {
  try {
    const formData = new FormData();
    formData.append('searchedParam', param);
    const options = {
      method: 'POST',
      body: formData,
    }
    const resp = await fetch(APIURL + '/person/searchByNameOrDocument', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Busca personas por id.
 * @param id {uuid} Id de la persona
 * @return {Object} JSON con datos de las coincidencias encontradas
 * @example
 * Ejemplo de retorno
 * {
 *   ok: boolean,
 *   persons: [
 *    { id: uuid, name: string, document: string }, ...
 *   ] | msg: string
 * }
 */
const getPersonById = async id => {
  try {
    const formData = new FormData();
    formData.append('id', id);
    const options = {
      method: 'POST',
      body: formData,
    }
    const resp = await fetch(APIURL + '/person/searchPersonById', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
/**
 * Consulta las asistencias de una persona.
 * @param queryObject {Object} Objeto con datos para consulta
 * @example
 * { perDocument: string, dateFrom: string, dateUntil: string }
 * @return {Object} JSON con la respuesta del servidor
 * @example
 * {
 *   ok: boolean,
 *   name: string,
 *   document: string,
 *   attendances: [{date: string, hours: string}, ...],
 *   | msg: string
 * }
 */
const attendanceConsult = async queryObject => {
  try {
    const { perDocument, dateFrom, dateUntil } = queryObject;
    const formData = new FormData();
    formData.append('perDocument', perDocument);
    formData.append('dateFrom', dateFrom);
    formData.append('dateUntil', dateUntil);
    const options = {
      method: 'POST',
      body: formData,
    }
    const resp = await fetch(APIURL + '/attendance/consult', options);
    const data = await resp.json();
    return data;
  } catch (error) {
    console.error(error)
    return { ok: false, msg: '⚠️ Error inesperado' };
  }
};
${vp[4]}
export {
  sendFaceToAttendanceRegister,
  addNewPerson,
  sendUserDataToLogin,
  searchPersonByNameOrDocument,
  getPersonById,
  updatePerson,
  deletePerson,
  deletePersonAttendances,
  attendanceConsult,
  ${vp[5]}
};
`;
}
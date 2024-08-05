/**
 * Submódulo de servicios.
 * @module frameworks
 */

const { getJsonDescriptorsFromFaceBlobs } = require("../faceapi/faceapi_gateways");
const PersonRepositoryBehavior = require("../repository/behaviors/personRepositoryBehavior");


/**
 * Representa los servicios que se pueden realizar con Personas.
 * @class
 * @method addNewPersonService
 * @method updatePersonService
 * @method deletePersonService
 * @method getPersonByIdService
 * @method getAllPersonsDescriptorsService
 * @method getPersonIdByDocumentService
 * @method searchPersonByNameOrDocumentService
 * @example
 * Modelo person
 * const person = { 
 *   id: uuid, 
 *   name: string, 
 *   document: string, 
 *   descriptor: Array<number>
 * }
 */
class PersonService {
  constructor() {
    this.personDb = new PersonRepositoryBehavior();
  }

  /**
   * Agrega una nueva persona.
   * @async
   * @param person {object} Datos de la persona
   * @example
   * { name: string, document: string, faceBlobs: array<Blob> }
   * @return {Object} Datos de la persona registrada.
   * @example
   * { ok: boolean, person: { id: uuid, name: string, document: string, } | msg: string }
   */
  async addNewPersonService(personData) {
    try {
      const person = { name: personData.name, document: personData.document, };
      person.descriptor = await getJsonDescriptorsFromFaceBlobs(personData.faceBlobs);
      return await this.personDb.add(person);
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Actualiza los datos de una persona.
   * @async
   * @param person {object} Datos de la persona
   * @example
   * { id: string, name: string, document: string, faceBlobs: array<Blob> }
   * @return {Object} Datos actualizados de la persona
   * @example
   * { ok: boolean, person: { id: uuid, name: string, document: string } | msg: string }
   */
  async updatePersonService(personData) {
    try {
      const person = {
        id: personData.id,
        name: personData.name,
        document: personData.document
      };
      person.descriptor = await getJsonDescriptorsFromFaceBlobs(personData.faceBlobs);
      return await this.personDb.update(person);
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Elimina una nueva persona.
   * @async
   * @param id {uuid} Id de la persona
   * @return {Object} Mensajes de confirmación
   * @example
   * { ok: boolean, msg: string }
   */
  async deletePersonService(id) {
    try {
      return await this.personDb.delete(id);
    } catch (error) {
      console.error(error);
      return { ok: false, msg: error.message };
    }
  }

  /**
   * Obtiene los datos de una persona por su id.
   * @async
   * @param {uuid} id Id de la persona
   * @return {Object} Datos de la persona
   * @example 
   * { ok: boolean, person: { id: uuid, name: string, document: string } | msg: string }
   */
  async getPersonByIdService(id) {
    return await this.personDb.getPersonById(id);
  }

  /**
   * Devuelve los descriptors de todas la personas registradas.
   * @async
   * @returns {Object} Datos de personas registradas
   * @example
   * {
   *   ok: boolean,
   *   personDescriptors: [
   *     {
   *       label: string, 
   *       descriptors: [[],...]},
   *     {...},...
   *   ] | msg: string
   * }
   */
  async getAllPersonsDescriptorsService() {
    return await this.personDb.getAllPersonsDescriptors();
  }

  /**
   * Obtiene el id de una persona por su documento.
   * @param document {string} Documento de la persona
   * @return {string} id de la persona
   */
  async getPersonIdByDocumentService(document) {
    return await this.personDb.getPersonIdByDocument(document);
  }

  /**
   * Obtiene resultados de búsqueda de personas a través
   * de su nombre o documento.
   * @param searchedParam {string} Parámetro de búsqueda
   * @return {Object} id de la persona
   * @example
   * {
   *   ok: boolean,
   *   persons: [
   *    { id: uuid, name: string, document: string }, ...
   *   ] | msg: string
   * }
   */
  async searchPersonByNameOrDocumentService(searchedPersonParams) {
    return await this.personDb.searchPersonByNameOrDocument(searchedPersonParams);
  }
}

module.exports = PersonService;

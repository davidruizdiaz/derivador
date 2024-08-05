/**
 * Submódulo que direcciona las solicitudes hacia los servicios correspondientes.
 * @module api/controlador/persona
 */

const PersonService = require("../../services/personServices")

/**
 * Procesa la peticion para nueva persona.
 * @param personData {Object} Datos de la persona
 * @example
 * {name: string, document: string, faceBlobs: Array<Blob>}
 * @return {Object} Lo mismos que en PersonService.addNewPersonServices
 */
async function addNewPersonProcess(personData) {
  const service = new PersonService()
  const result = await service.addNewPersonService(personData);
  return result;
}

/**
 * Procesa la petición para actualizar una persona
 * @param personData {Object} Datos de la persona
 * @example
 * {id: string, name: string, document: string, faceBlobs: Array<Blob>}
 * @return {Object} Lo mismos que en PersonService.updatePersonServices
 */
async function updatePersonProcess(personData) {
  const service = new PersonService()
  const result = await service.updatePersonService(personData);
  return result;
}

/**
 * Procesa la petición para eliminar una persona.
 * @param id {string} Id de la persona
 * @return {Object} Lo mismos que en PersonService.deletePersonServices
 */
async function deletePersonProcess(id) {
  const service = new PersonService()
  const result = await service.deletePersonService(id);
  return result;
}

/**
 * Pasa los parámetros para buscar personas al service respectivo.
 * @param searchedParam {string} Parámetro de búsqueda
 * @return {Object} Lo mismos que en PersonService.searchPersonByNameOrDocumentService
 */
async function searchPersonByNameOrDocumentProcess(searchedPersonParams) {
  const service = new PersonService()
  const result = await service.searchPersonByNameOrDocumentService(searchedPersonParams);
  return result;
}

/**
 * Pasa los parámetros para buscar personas por id al service respectivo.
 * @param id {string} Id de la persona
 * @return {Object} Lo mismos que en PersonService.searchPersonByIdService
 */
async function searchPersonByIdProcess(id) {
  const service = new PersonService()
  const result = await service.getPersonByIdService(id);
  return result;
}

module.exports = {
  addNewPersonProcess,
  searchPersonByNameOrDocumentProcess,
  searchPersonByIdProcess,
  updatePersonProcess,
  deletePersonProcess,
}

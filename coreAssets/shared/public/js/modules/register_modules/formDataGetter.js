/**
 * Submódulo de registro encargado recuperar los datos del formulario.
 * @module Registro/RecuperadorDatos
 */

/**
 * Recupera los datos del formulario y los agrupa en un objeto.
 * @return {Object} Objeto con datos de la persona
 * @example { name: string, document: string, faceBlobs: Array }
 */
async function getFormData() {
  let person = { ...getBasicPersonData() };
  person = { ...person, faceBlobs: await getPersonBlob() };
  return person;
}

/**
 * Obtiene los datos básicos de la persona.
 * @return {object} Datos de la persona
 * @example { name: string, document: string }
 */
function getBasicPersonData() {
  const inps = document.getElementsByTagName('input');
  const person = {};
  for (const inp of inps) {
    person[inp.name] = inp.value.trim();
  }
  if (!person.id || person.id.length <= 0) {
    delete person.id;
  }
  return person;
}

/**
 * Convierte los canvas a blob.
 * @return {Promise<Array<Blob>>} Promesa que devuelve un Array de blobs
 */
function getPersonBlob() {
  const cnvss = document.getElementsByTagName('canvas');
  let promises = [];

  for (const cnvs of cnvss) {
    const promise = new Promise((resolve, reject) => {
      cnvs.toBlob(blob => resolve(blob), 'image/png');
    });
    promises.push(promise);
  }
  return Promise.all(promises);
}

export { getFormData };

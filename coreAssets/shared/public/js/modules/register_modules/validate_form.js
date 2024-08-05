/**
 * Submódulo de registro encargado limpiar el formulario.
 * @module Registro/ReiniciadorFormulario
 */

/**
 * Referencia al input nombre.
 * @type {Object}
 */
const inName = document.querySelector('#name');
/**
 * Referencia al input documento.
 * @type {Object}
 */
const inDoc = document.querySelector('#document');
/**
 * Referencia al componente de error de nombre.
 * @type {Object}
 */
const nameErr = document.querySelector('.name-error');
/**
 * Referencia al componente de error de documento.
 * @type {Object}
 */
const docErr = document.querySelector('.doc-error');

/**
 * Llama a las demás funciones de validación.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateForm() {
  const isValid = [
    await validateName(),
    await validateDocument(),
  ];
  return !isValid.includes(false);
}

/**
 * Valida que el nombre no contenga números y
 * que tenga al menos 2 letras.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateName() {
  const text = inName.value
  const regex = new RegExp(/\d/);
  if (text.length < 2 || regex.test(text)) {
    nameErr.textContent = 'Nombre inválido';
    return false;
  } else {
    nameErr.textContent = '';
    return true;
  }
}

/**
 * Valida que el documento tenga al menos 7 letras.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateDocument() {
  const text = inDoc.value
  if (text.length < 7) {
    docErr.textContent = 'Documento inválido';
    return false;
  } else {
    docErr.textContent = '';
    return true;
  }
}

export { validateForm };

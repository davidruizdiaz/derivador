/**
 * Submódulo de acceso encargado validar los datos ingresados
 * en el formulario.
 * @module Acceso/ValidadorFormulario
 */

/**
 * Referencia al input nombre de usuario.
 * @type {Object}
 */
const inUser = document.querySelector('#user');
/**
 * Referencia al input password.
 * @type {Object}
 */
const inPass = document.querySelector('#pass');
/**
 * Referencia campo de error del nombre de usuario.
 * @type {Object}
 */
const nameErr = document.querySelector('.name-error');
/**
 * Referencia campo de error de password.
 * @type {Object}
 */
const docErr = document.querySelector('.doc-error');

/**
 * Llama a las demás funciones de validación.
 * @return {boolean} Bandera true=valido false=no valido
 */
async function validateForm() {
  const isValid = [
    await validateUser(),
    await validatePass(),
  ];
  return !isValid.includes(false);
}

/**
 * Valida que el campo nombre de usuario tenga al menos 3 letras.
 * @return {boolean} Bandera true=valido false=no valido
 */
async function validateUser() {
  const text = inUser.value
  if (text.length < 2) {
    nameErr.textContent = 'Nombre de usuario inválido';
    return false;
  } else {
    nameErr.textContent = '';
    return true;
  }
}

/**
 * Valida que el campo password tenga al menos 4 letras.
 * @return {boolean} Bandera true=valido false=no valido
 */
async function validatePass() {
  const text = inPass.value
  if (text.length < 3) {
    docErr.textContent = 'Contraseña inválida';
    return false;
  } else {
    docErr.textContent = '';
    return true;
  }
}

export { validateForm };

/**
 * Submódulo de registro encargado limpiar el formulario.
 * @module Sesiones/ValidaFormulario
 */

/**
 * Referencia al campo descripción.
 * @type {Object}
 */
const inDescription = document.querySelector('#description');
/**
 * Referencia al componente de error del campo descripción.
 * @type {Object}
 */
const descriptionErr = document.querySelector('.description-error');

/**
 * Referencia al campo hora de inicio.
 * @type {Object}
 */
const inInitHour = document.querySelector('#initHour');
/**
 * Referencia al componente de error del campo hora inicio.
 * @type {Object}
 */
const initHourErr = document.querySelector('.initHour-error');

/**
 * Referencia al campo hora fin.
 * @type {Object}
 */
const inEndHour = document.querySelector('#endHour');
/**
 * Referencia al componente de error del campo hora fin.
 * @type {Object}
 */
const endHourErr = document.querySelector('.endHour-error');

/**
 * Llama a las demás funciones de validación.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateForm() {
  const isValid = [
    await validateDescription(),
    await validateInitHour(),
    await validateEndHour(),
  ];
  return !isValid.includes(false);
}

/**
 * Valida que la descripción no contenga números al principio y
 * que tenga al menos 4 letras.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateDescription() {
  const text = inDescription.value;
  const regex = new RegExp(/^(\d+)/);
  if (text.length < 4 || regex.test(text)) {
    descriptionErr.textContent = 'Descripción inválida';
    return false;
  } else {
    descriptionErr.textContent = '';
    return true;
  }
}

/**
 * Valida que la hora de inicio sea válida.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateInitHour() {
  const text = inInitHour.value
  const regex = new RegExp(/^((?:(?:0|1)\d|2[0-3])):([0-5]\d)$/);
  if (!regex.test(text)) {
    initHourErr.textContent = 'Hora inválida';
    return false;
  } else {
    initHourErr.textContent = '';
    return true;
  }
}

/**
 * Valida que la hora fin sea válida y posterior a la de inicio.
 * @return {boolean} Bandera true=valido false=no validado
 */
async function validateEndHour() {
  const endText = inEndHour.value;
  const endHour = dayjs().hour(endText.split(':')[0]).minute(endText.split(':')[1]);
  const initText = inInitHour.value;
  const initHour = dayjs().hour(initText.split(':')[0]).minute(initText.split(':')[1]);
  const regex = new RegExp(/^((?:(?:0|1)\d|2[0-3])):([0-5]\d)$/);
  if (!regex.test(endText)) {
    endHourErr.textContent = 'Hora inválida';
    return false;
  } else if (endHour.isBefore(initHour)) {
    endHourErr.textContent = 'Debe ser posterior al inicio';
    return false;
  } else {
    endHourErr.textContent = '';
    return true;
  }
}

export { validateForm };

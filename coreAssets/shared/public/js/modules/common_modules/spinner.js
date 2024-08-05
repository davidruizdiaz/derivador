/**
 * Modulo para mostrar spinner de procesamiento.
 * @module Común/Spinner
 */

/**
 * Muestra el spinner.
 */
const showSpinner = () => {
  const spinnerContainer = document.querySelector('.spinner-container');
  const spinner = document.querySelector('.spinner');
  const result = document.querySelector('.result');
  result.classList.remove('check');
  result.classList.remove('cross');
  result.classList.add('hidden');
  spinner.classList.remove('loaded-ok');
  spinner.classList.remove('loaded-error');
  spinnerContainer.classList.remove('hidden');
};

/**
 * Muestra el check cuando sale todo bien.
 */
const loadedOk = () => {
  const spinner = document.querySelector('.spinner');
  const result = document.querySelector('.result');
  spinner.classList.remove('loaded-error');
  spinner.classList.add('loaded-ok');
  result.classList.add('check');
  result.classList.remove('hidden');
};

/**
 * Muestra la cruz cuando algo sale mal.
 */
const loadedError = () => {
  const spinner = document.querySelector('.spinner');
  const result = document.querySelector('.result');
  spinner.classList.remove('loaded-ok');
  spinner.classList.add('loaded-error');
  result.classList.add('cross');
  result.classList.remove('hidden');
};

/**
 * Oculta el spinner.
 */
const hiddenSpinner = () => {
  const spinnerContainer = document.querySelector('.spinner-container');
  const spinner = document.querySelector('.spinner');
  const result = document.querySelector('.result');
  result.classList.remove('check');
  result.classList.remove('cross');
  result.classList.add('hidden');
  spinner.classList.remove('loaded-ok');
  spinner.classList.remove('loaded-error');
  spinnerContainer.classList.add('hidden');
};



export { showSpinner, hiddenSpinner, loadedOk, loadedError }

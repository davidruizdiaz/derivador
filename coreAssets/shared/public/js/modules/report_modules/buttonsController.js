/**
 * Submódulo de reporte encargado de controlar los botones.
 * @module Reporte/ControladorBotones
 */
import { initTable } from "./reportController.js";

/**
 * Referencia al input documento.
 * @type {Object}
 */
const inDocument = document.querySelector('input[name="document"]');
/**
 * Referencia al input fecha desde.
 * @type {Object}
 */
const inDateFrom = document.querySelector('input[name="dateFrom"]');
/**
 * Referencia al input fecha fin.
 * @type {Object}
 */
const inDateUntil = document.querySelector('input[name="dateUntil"]');

/**
 * Referencia al botón consultar.
 * @type {Object}
 */
const btnConsult = document.querySelector('.btn-consult');
/**
 * Referencia al botón reiniciar.
 * @type {Object}
 */
const btnClean = document.querySelector('.btn-clean');
/**
 * Referencia al botón imprimir.
 * @type {Object}
 */
const btnPrint = document.querySelector('.btn-print');

/**
 * Referencia al elemento que muestra los datos.
 * @type {Object}
 */
const dataContainer = document.querySelector('.data-container');

/**
 * Referencia al id del timer
 * @type {number}
 * @default null
 */
let timerId = null;

/**
 * Inicia las funciones del formulario.
 * @param handlerConsult {callback} Función que realizará la consulta a la API
 */
function initButtonsController(handlerConsult) {
  disableBtnConsult();
  disableBtnPrint();
  disableBtnClean();
  clean();
  inDateFrom.addEventListener('change', handleChanges);
  inDateUntil.addEventListener('change', handleChanges);
  inDocument.addEventListener('input', () => {
    clearTimeout(timerId);
    timerId = setTimeout(() => { handleChanges() }, 400)  // El timer se reinicia cada 400ms
  });
  btnConsult.addEventListener('click', handlerConsult);
  btnClean.addEventListener('click', clean);

  // HACK: Observa los cambios en la tabla
  const mutationObserver = new MutationObserver(changeDom);
  const conf = { attributes: false, childList: true, characterData: false };
  mutationObserver.observe(dataContainer, conf)

  btnPrint.addEventListener('click', print)
}

/**
 * Verifica si cambió el DOM de la tabla.
 */
function changeDom(mutations) {
  const existsAttendences = document.querySelector('.attendance-detail') ? true : false
  if (existsAttendences) {
    enableBtnPrint();
  } else {
    disableBtnPrint();
  }
}

/**
 * Verifica las entregas de los inputs y activa los botones.
 */
function handleChanges() {
  const txtDoc = inDocument.value;
  if (txtDoc.length < 7 || !dateIsValid()) {
    disableBtnConsult();
    disableBtnPrint();
  }
  if (txtDoc.length <= 0 || dateIsValid()) {
    disableBtnClean();
  }
  if (txtDoc.length > 0 || !dateIsValid()) {
    enableBtnClean();
  }
  if (txtDoc.length >= 7 && dateIsValid()) {
    enableBtnConsult();
    enableBtnClean();
  }
}

/**
 * Valida las fechas.
 * @return {boolean} Bandera true=valido false=inválido
 */
function dateIsValid() {
  const dateFrom = dayjs(inDateFrom.value);
  const dateUntil = dayjs(inDateUntil.value);
  if (dateFrom.toString() === 'Invalid Date' || dateUntil.toString() === 'Invalid Date') {
    return false;
  } else if (dateFrom.isAfter(dateUntil, 'day')) {
    return false;
  } else {
    return true;
  }
}

/** Reinicia el formulario. */
function clean() {
  inDocument.value = '';
  inDateFrom.value = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
  inDateUntil.value = dayjs().format('YYYY-MM-DD');
  disableBtnConsult();
  disableBtnPrint();
  disableBtnClean();
  initTable();
}

/** Imprime el documento. */
function print() {
  window.print();
}

/** Activa el botón de consultar. */
function enableBtnConsult() {
  btnConsult.disabled = false;
}

/** Desactiva el botón de consultar. */
function disableBtnConsult() {
  btnConsult.disabled = true;
}

/** Activa el botón de reinicia. */
function enableBtnClean() {
  btnClean.disabled = false;
}

/** Desactiva el botón de reiniciar. */
function disableBtnClean() {
  btnClean.disabled = true;
}

/** Activa el botón de imprimir. */
function enableBtnPrint() {
  btnPrint.disabled = false;
}

/** Desactiva el botón de imprimir. */
function disableBtnPrint() {
  btnPrint.disabled = true;
}

export { initButtonsController };


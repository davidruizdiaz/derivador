import { removeEmptyLines } from "../../../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Submódulo de reporte encargado de controlar el funcionamiento
 * general del reporte.
 * @module Reporte/ControladorReporte
 */
import { attendanceConsult } from "../common_modules/apiConsumer.js";
import { notificator } from "../common_modules/notifications.js";
import { initButtonsController } from "./buttonsController.js";

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
 * Referencia al input fecha hasta.
 * @type {Object}
 */
const inDateUntil = document.querySelector('input[name="dateUntil"]');

/**
 * Inicia el controlador de botones y el controlador de la tabla.
 */
function init() {
  initButtonsController(handlerConsult, initTable);
  initTable();
}

/**
 * Realiza la consulta a la API.
 * Construye el objeto de consulta y lo enví al {@link attendanceConsult} 
 * de apiConsumer. Si recibe un error emite una notificación de error, 
 * sino envía los resultados a {@link loadData}.
 */
async function handlerConsult() {
  const queryObject = {
    perDocument: inDocument.value,
    dateFrom: inDateFrom.value,
    dateUntil: inDateUntil.value,
  };
  const res = await attendanceConsult(queryObject);
  if (!res.ok) {
    notificator.notify(\`⚠️ \${res.msg}\`, 'error');
    return;
  } else {
    loadData(res);
  }
}

/**
 * Inicializa la tabla.
 */
function initTable() {
  const temp = \`<div class="result">
                  <p class="attendance-empty">
                    ⚠️ Sin datos para mostrar. Ingrese una nueva consulta
                  </p>
                </div>\`;
  document.querySelector('.data-container').innerHTML = temp;
}

/**
 * Carga los datos recibidos de la consulta en la tabla.
 */
function loadData(data) {
  let temp = '';
  const { name, document: perDocument, attendances: atts } = data;
  if (atts.length > 0) {
    let subTemp = '';
    for (const att of atts) {
      subTemp += \`<p class="attendance-detail">
                    ${vp[1]}
                    <strong>Fecha: </strong><span>\${att.date}</span>
                    <strong>Hora: </strong><span>\${att.hours}</span>
                  </p>\`;
    }
    temp = \`<div class="result">
              <div class="personData">
                <h3 class="title center">Datos personales</h3>
                <p class="name-container center"><strong>Nombre: </strong><span>\${name}</span></p>
                <p class="document-container center"><strong>Documento: </strong><span>\${perDocument}</span></p>
              </div>
              <div class="attendanceData">
                <h3 class="title center">Asistencias</h3>
                \${subTemp}
              </div>
            </div>\`;
  } else {
    temp = \`<div class="result">
              <div class="personData">
                <h3 class="title center">Datos personales</h3>
                <p class="name-container center"><strong>Nombre: </strong><span>\${name}</span></p>
                <p class="document-container center"><strong>Documento: </strong><span>\${perDocument}</span></p>
              </div>
              <div class="attendanceData">
                <h3 class="title center">Asistencias</h3>
                <p class="attendance-empty">
                    ⚠️ No hay registros de asistencias en el rango de fecha ingresado
                </p>
              </div>
              </div>\`;
  }
  document.querySelector('.data-container').innerHTML = temp;
}
export { init, initTable };
`;
}
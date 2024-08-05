/**
 * Submódulo de asistencia encargado de la detección de rostros.
 * @module Asistencia/DetecciónRostros
 */

import { video } from "../common_modules/cam.js";
import { processImage } from "./imageProcessor.js";
import { notificator } from "../common_modules/notifications.js";
import { checkValidSession } from "../session_modules/sessionController.js";
import { StorageController } from "../common_modules/storageController.js";
import { updateSessionState } from "../common_modules/apiConsumer.js";
import { loadedOk } from "../common_modules/spinner.js";

/**
 * Titulo de la página.
 * @type {Object}
 */
const tit = document.querySelector('h1');

/**
 * Información de la próxima captura mostrada en la página.
 * @type {Object}
 */
const inf = document.querySelector('#capture-info');

/**
 * Variable para guardar el objeto canvas de la vista.
 * @type {Object}
 * @default null
 */
let canvas = null;

/**
 * Contiene el objeto video de la vista.
 * @type {Object}
 * @default null
 */
let vidElem = null;

/**
 * Inicia el controlador
 */
async function init() {
  // vidElem = await video.start();
  // document.querySelector('#btn-test').addEventListener('click', capturePhoto);
  const { session, valid } = await checkValidSession();
  if (!valid) {
    notificator.notify('⚠️ Debe crear una nueva sesión', 'error')
    return;
  }
  if (setTimers(session)) {
    vidElem = await video.start();
    tit.textContent += ` - ${session.description}`;
    inf.textContent = `Próxima captura: ${session.capturesTimes[
      session.captured === 0 ? 0 : session.captured
    ]}`;
  }
}

/**
 * Crea los temporizadores para las capturas de las fotos.
 * @param session {Object} Sesión almacenada en el cache
 * @return {boolean} true si todo va bien, false si hay error
 */
function setTimers(session) {
  try {
    const now = dayjs();
    const sessInitDate = dayjs(session.initDate)
    const initDiff = sessInitDate.diff(now, 'minute');
    // INFO: calcular desde hora inicio
    if (!initDiff > 0) {
      // const times = ["2024-07-26 11:58:00", "2024-07-26 11:58:10", "2024-07-26 11:58:20", "2024-07-26 11:58:30"];
      const times = session.capturesTimes;
      for (let t = 0; t < times.length; t++) {
        const time = dayjs(times[t]);
        const diff = time.diff(now);
        console.log('👌Creado timer', t + 1)
        setTimeout(() => {
          capturePhoto();
        }, diff);
      }
      return true;
    }
    // INFO: calcular desde hora actual
    const sessEndDate = dayjs(session.endDate)
    const endDiff = sessEndDate.diff(now);
    const restCaptures = session.numCaptures - session.captured
    const timeSegment = endDiff / ((session.captured > 0)
      ? restCaptures + 1
      : Number(session.numCaptures) + 1);
    let captureTimes = [];
    for (let t = 1; t <= restCaptures; t++) {
      const time = timeSegment * t;
      const timeAsDate = now.add(time, 'millisecond').format('YYYY-MM-DD HH:mm:ss').toString();
      captureTimes.push(timeAsDate);
      console.log('👌Creado timer', t, dayjs().millisecond(time).format('HH:mm:ss'))
      setTimeout(() => {
        capturePhoto();
      }, time);
    }
    session['capturesTimes'] = [...captureTimes];
    new StorageController().store(session);
    return true;
  } catch (error) {
    console.error(error)
    notificator.notify('Ocurrió un error al iniciar la cámara', 'error');
    return false;
  }
}

/**
 * Captura la foto para enviarla al servidor.
 */
async function capturePhoto() {
  try {
    console.log('Capturando foto 📷');
    notificator.notify('Capturando foto 📷', 'info')
    if (!canvas) {
      canvas = document.createElement('canvas');
      canvas.width = vidElem.videoWidth;
      canvas.height = vidElem.videoHeight;
    }
    const context = canvas.getContext('2d');
    context.drawImage(vidElem, 0, 0, canvas.width, canvas.height);
    processImage(canvas);
  } catch (error) {
    console.error(error)
    notificator.notify('Ocurrió un error al capturar la foto', 'error');
  }
}

/**
 * Procesa y muestra el resultado del registro en el servidor.
 * @param result {Object} Resultado devuelto por el servidor;
 */
async function resultProcess(result) {
  const storage = new StorageController();
  const session = storage.get();
  session.captured += 1;
  storage.store(session);
  if (result.ok) {
    if (session.numCaptures <= session.captured) {
      const res = await updateSessionState({ id: session.id, state: 'COM' });
      if (!res.ok) {
        notificator.notify('⚠️ ${res.msg}', 'error');
        return;
      }
      inf.textContent = `Sesión terminada!`;
      vidElem.pause();
      vidElem.currentTime = 0;
      loadedOk();
      notificator.showData({ ...result, description: session.description });
      notificator.notify('✔️ Sessión terminada!', 'info')
      notificator.notify('⚠️ Debe crear una nueva sesión', 'error')
      storage.del();
      return;
    }
    inf.textContent = `Próxima captura: ${session.capturesTimes[
      session.captured === 0 ? 0 : session.captured
    ]}`;
    notificator.showData({ ...result, description: session.description });
    notificator.notify('✔️ Registro correcto!', 'info');
  } else {
    notificator.showData(result);
    notificator.notify('No se pudo identificar a ninguna persona', 'error')
    if (session.numCaptures <= session.captured) {
      const res = await updateSessionState({ id: session.id, state: 'COM' });
      if (!res.ok) {
        notificator.notify('⚠️ ${res.msg}', 'error');
        return;
      }
      inf.textContent = `Sesión terminada!`;
      vidElem.pause();
      vidElem.currentTime = 0;
      loadedOk();
      notificator.notify('✔️ Sessión terminada!', 'info')
      notificator.notify('⚠️ Debe crear una nueva sesión', 'error')
      storage.del();
      return;
    }
  }
}

export { init, resultProcess };

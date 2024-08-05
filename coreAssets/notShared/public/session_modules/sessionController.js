/**
 * Submódulo encargado de controlar la sesión actual.
 * @module Sesiones/ControladorSesión
 */

import { updateSessionState } from "../common_modules/apiConsumer.js";
import { notificator } from "../common_modules/notifications.js";
import { StorageController } from "../common_modules/storageController.js";

/**
 * Verifica la validez de la sesión actual.
 * @return {Object} Resultado de la verificación. Contienen la sesión y una bandera
 * @example { valid: boolean, session: {...} | null }
 */
async function checkValidSession() {
  const session = new StorageController().get();
  if (session) {
    const now = dayjs();
    const sessInitDate = dayjs(session.initDate)
    const initDiff = sessInitDate.diff(now, 'minute');
    if (initDiff > 0) {
      return { session, valid: true }
    }

    const sessEndDate = dayjs(session.endDate)
    const endDiff = sessEndDate.diff(now, 'minute');
    // INFO: Establece los minutos antes del endHour que se pueden tolerar
    if (endDiff < 5) {
      const asignState = (session.captured < session.numCaptures) ? 'INC' : 'COM';
      const res = await updateSessionState({ id: session.id, state: asignState })
      if (!res.ok) {
        notificator.notify(`⚠️ ${res.msg}`, 'error')
        return { valid: false };
      }
      new StorageController().del();
      return { valid: false };
    } else {
      return { session, valid: true };
    }
  } else {
    return { valid: false };
  }
}

/**
 * Registra una nueva sesión en el cache.
 * Realiza los cálculos de tiempo para estimar los intervalos 
 * en los que se debe capturar las fotos y los almacena en
 * el localStorage.
 * @example
 * {
 *    initDate: string, initHour: string, numCaptures: string, state: string,
 *    capturesTimes: Arran<string>, date: string, description: string, endDate: string,
 *    endHour: string, id: string, captured: number
 * }
 * @param session {Object} Datos de la sesión
 */
function registerNewSession(session) {
  const { initHour, endHour, date, numCaptures } = session;
  const sessionInitDate = dayjs(date).hour(initHour.split(':')[0]).minute(initHour.split(':')[1]);
  const sessionEndDate = dayjs(date).hour(endHour.split(':')[0]).minute(endHour.split(':')[1]);
  const sessionInterval = sessionEndDate.diff(sessionInitDate);

  const sessionSegment = sessionInterval / (Number(numCaptures) + 1);

  let capturesTimes = [];

  for (let i = 1; i <= numCaptures; i++) {
    const duration = sessionSegment * i;
    const durationAsDate = sessionInitDate.add(duration, 'millisecond').format('YYYY-MM-DD HH:mm:ss').toString();
    capturesTimes.push(durationAsDate);
  }

  session['capturesTimes'] = [...capturesTimes];
  session['initDate'] = sessionInitDate.format('YYYY-MM-DD HH:mm:ss').toString();
  session['endDate'] = sessionEndDate.format('YYYY-MM-DD HH:mm:ss').toString();
  session['captured'] = 0;

  new StorageController().store(session);
}

/**
 * Ajusta los valores de la sesión actual.
 * Realiza los cálculos de tiempo para estimar los intervalos 
 * en los que se debe capturar las fotos a partir de la hora actual 
 * y los almacena en el localStorage.
 * @example
 * {
 *    initDate: string, initHour: string, numCaptures: string, state: string,
 *    capturesTimes: Arran<string>, date: string, description: string, endDate: string,
 *    endHour: string, id: string, captured: number
 * }
 * @param session {Object} Datos de la sesión almacenada en cache
 */
function adjustSessionTimers(session) {
  const { endDate, numCaptures, captured } = session;
  const sessionInitDate = dayjs();
  const sessionEndDate = dayjs(endDate);
  const sessionInterval = sessionEndDate.diff(sessionInitDate);

  const sessionSegment = sessionInterval / (Number(numCaptures) + 1);

  const quanCaptures = numCaptures - captured;
  let capturesTimes = [];

  for (let i = 1; i <= quanCaptures; i++) {
    const duration = sessionSegment * i;
    const durationAsDate = sessionInitDate.add(duration, 'millisecond').format('YYYY-MM-DD HH:mm:ss').toString();
    capturesTimes.push(durationAsDate);
  }

  session['capturesTimes'] = [...capturesTimes];
  session['initDate'] = sessionInitDate.format('YYYY-MM-DD HH:mm:ss').toString();
  session['endDate'] = sessionEndDate.format('YYYY-MM-DD HH:mm:ss').toString();

  new StorageController().store(session);
  return session;
}


export {
  checkValidSession,
  registerNewSession,
  adjustSessionTimers,
};

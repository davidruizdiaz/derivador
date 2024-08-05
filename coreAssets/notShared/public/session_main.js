/**
 * Módulo de registro de sesiones.
 * @module Sesiones
 */
import { init } from './modules/session_modules/form-controller.js'

/** Inicia los submódulos luego de que la vista haya sido cargada */
document.addEventListener('DOMContentLoaded', init);

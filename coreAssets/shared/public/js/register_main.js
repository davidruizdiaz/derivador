/**
 * Módulo de registro de personal.
 * @module Registro
 */
import { init } from './modules/register_modules/form-controller.js'

/** Inicia los submódulos luego de que la vista haya sido cargada */
document.addEventListener('DOMContentLoaded', init);

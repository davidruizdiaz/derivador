/**
 * Módulo de acceso a la aplicación.
 * @module Acceso
 */
import { init } from "./modules/login_modules/form-controller.js";

/** Inicia los submódulos luego de que la vista haya sido cargada */
document.addEventListener('DOMContentLoaded', init);

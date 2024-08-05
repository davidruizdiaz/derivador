/**
 * Modulo principal de consultas
 * @module Consultas
 */
import { init } from "./modules/consult_modules/consultController.js";

/** Inicia los submódulos luego de que la vista haya sido cargada */
document.addEventListener('DOMContentLoaded', init);

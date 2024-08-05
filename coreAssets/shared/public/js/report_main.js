/**
 * Módulo de reportes.
 * @module Reporte
 */
import { init } from "./modules/report_modules/reportController.js";

/** Inicia los submódulos luego de que la vista haya sido cargada */
document.addEventListener('DOMContentLoaded', init);

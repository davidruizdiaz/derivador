import { removeEmptyLines } from "../../auxi.js";

export function genResource(variabilityPoints) {
  const vp = { ...variabilityPoints };
  return removeEmptyLines`
/**
 * Módulo principal de asistencia.
 * @module Asistencia
 */
${vp[1]}
${vp[2]}
document.addEventListener('DOMContentLoaded', init);
`;
}
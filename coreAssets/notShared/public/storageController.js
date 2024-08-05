/**
 * Modulo encargado de manejar el localStorage para las sesiones
 * @module Sesiones/ControladorStorage
 */

/**
 * Contiene los métodos para almacenar la sesión en el localStorage.
 *
 */
class StorageController {
  constructor() {
    this.db = window.localStorage;
  }

  /**
   * Recupera la sesión.
   * @return {Object} Sesión almacenada
   */
  get() {
    const sess = JSON.parse(this.db.getItem('session')) || false;
    return sess;
  }

  /**
   * Guarda una sesión.
   * @param session {Object} Sesión 
   */
  store(session) {
    this.db.setItem('session', JSON.stringify(session));
  }

  /**
   * Borra la sesión.
   */
  del() {
    this.db.removeItem('session');
  }
}

export { StorageController };

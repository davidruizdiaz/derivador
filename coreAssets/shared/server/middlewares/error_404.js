/**
 * Submódulo middleware de errores.
 * @module middleware/errores
 */

const path = require('path');

const error404 = (req, res, next) => {
  res.status(404).redirect(
    '/error404.html'
  );
};

module.exports = error404;

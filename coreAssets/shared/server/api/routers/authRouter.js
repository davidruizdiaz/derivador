/**
 * Submódulo que recibe las peticiones de acceso privilegiado del cliente.
 * @module api/enrutadores/acceso
 */

const { Router } = require('express');
const { checkAccess } = require('../../middlewares');

const authRouter = Router();

/**
 * Endpoint hacer login.
 * @description POST /login
 */
authRouter.post('/login', checkAccess, (req, res) => {
  res.cookie('user', 'root');
  res.redirect('/register.html');
});

module.exports = authRouter;


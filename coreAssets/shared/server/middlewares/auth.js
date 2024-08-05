/**
 * Submódulo middleware de acceso.
 * @module middleware/acceso
 */

/**
 * Verifica el usuario y la contraseña para realizar 
 * la autenticación.
 * @function
 */
const checkAccess = (req, res, next) => {
  try {
    const { user, pass } = req.body;
    if (user === 'root' && pass === 't0o7') {
      next()
    } else {
      res.status(401).json({ ok: false, msg: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ ok: false, msg: 'Error en la autenticación' });
  }
};

/**
 * Verifica que el usuario esté autenticado.
 * @function
 */
const authenticated = (req, res, next) => {
  try {
    const userCookie = req.cookies.user;
    if (userCookie === 'root') {
      next();
    } else {
      res.status(401).redirect('/login.html');
    }
  } catch (error) {
    console.error(error);
    res.status(401).redirect('/login.html');
  }
};

module.exports = {
  checkAccess,
  authenticated,
};

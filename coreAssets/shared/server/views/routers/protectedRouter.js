const path = require('path');
const { Router } = require('express');
const { authenticated } = require('../../middlewares');

const registerRouter = Router();

/**
 * Protege a register
 * @description GET /register.html
 */
registerRouter.get('/register.html', authenticated, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../../public/register.html'));
});

/**
 * Protege a consult
 * @description GET /consult.html
 */
registerRouter.get('/consult.html', authenticated, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../../public/consult.html'));
});

/**
 * Protege a report
 * @description GET /report.html
 */
registerRouter.get('/report.html', authenticated, (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../../../public/report.html'));
});

module.exports = registerRouter;


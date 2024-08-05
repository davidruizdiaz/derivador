const { Router } = require('express');
const registerRouter = require('./protectedRouter');

const router = Router();
router.use(registerRouter);

module.exports = router

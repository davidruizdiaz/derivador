const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const error404 = require('./middlewares/error_404');
const router = require('./api/routers');
const viewsRouter = require('./views/routers');
const { initFaceapiModels } = require('./faceapi/faceapi_init');
const cookieParser = require('cookie-parser');

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(cookieParser());
server.use('/api', router);
server.use(viewsRouter);
server.use(express.static('public'));
server.use(error404);

const PORT = 2700;

server.listen(PORT, () => {
  console.log('Server running in the port ' + PORT);
  initFaceapiModels();
});

module.exports = () => server;

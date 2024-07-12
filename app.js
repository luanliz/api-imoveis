const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const residenceRoutes = require('./api/residence/residence.routes');
// const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./database');

const app = new Koa();

// Conectar ao banco de dados
connectDB();

// Middleware de logging
app.use(logger());

// Middleware
app.use(bodyParser());
// app.use(errorHandler);

// Rotas
app.use(residenceRoutes.routes()).use(residenceRoutes.allowedMethods());

module.exports = app;

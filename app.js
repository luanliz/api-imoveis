require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const jwt = require('koa-jwt');
const residenceRoutes = require('./api/residence/residence.routes');
const authRoutes = require('./api/auth/auth.routes');
const connectDB = require('./database');

const app = new Koa();

// Conectar ao banco de dados
connectDB();

// Middleware de logging
app.use(logger());

// Middleware
app.use(bodyParser());
// app.use(errorHandler);

// Middleware de autenticação
app.use(jwt({ secret: process.env.JWT_SECRET }).unless({ path: [/^\/auth/, /^\/register/, /^\/login/] }));

// Rotas de autenticação
app.use(authRoutes.routes()).use(authRoutes.allowedMethods());

// Rotas
app.use(residenceRoutes.routes()).use(residenceRoutes.allowedMethods());

module.exports = app;

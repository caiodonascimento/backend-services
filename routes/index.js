'use strict';

var express      = require('express');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var Keycloak     = require('keycloak-connect');
var fs           = require('fs');
var path         = require('path');
var basename     = path.basename(__filename);
var config       = require(__dirname + '/../config/config.json').others;
var models       = require('../models');

var app = express();

var memoryStore = new session.MemoryStore();

app.use(session({
  secret: config.sessionSecret || process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: false,
  store: memoryStore
}));

var keycloak = new Keycloak({
  store: memoryStore
}, 'sso/keycloak.json');

var keycloakFront = new Keycloak({
  store: memoryStore
}, 'sso/keycloak-frontend.json');

app.use(keycloak.middleware({
  logout: config.logoutUri
}));
app.use(logger(config.logModel));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename)
      && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var routeName = file.split('.')[0];
    console.log('Declare ', routeName, ' route.')
    app.use(
      '/api/' + routeName,
      require('./' + routeName)(express, keycloak, models, keycloakFront)
    );
  });

app.get('/health', (req, res) => {
  models.sequelize
    .authenticate()
    .then(() => {
      res.send('1');
    })
    .catch(err => {
      res.send('0');
    });
});

app.get('/', (req, res) => {
  console.log(req);
  res.send('Gracias por utilizar la API de Happy Foot')
});

module.exports = app;

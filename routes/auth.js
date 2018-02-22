'use strict';
module.exports = (express, keycloak, models, keycloakFront) => {
  let router = express.Router();
  var adminClient = require('keycloak-admin-client');
  var config = require(__dirname + '/../config/config.json').others;
  router.post('/login', (req, res) => {
    keycloakFront.grantManager.obtainDirectly(
      req.body.email,
      req.body.password
    ).then(grant => {
      keycloakFront.storeGrant(grant, req, res);
      let result = keycloakFront.stores[1].get(req);
      let tokens = typeof result === 'string' ?
        JSON.parse(result) : result;
      res.status(200).json({
        result: tokens
      });
    }, error => {
      if (error == '401:Unauthorized') {
        res.status(401).json({
          message: 'Unauthorized'
        });
      } else {
        res.status(500).json({
          message: error
        });
      }
    });
  });
  router.post('/reset-password/:id', keycloak.protect(), (req, res) => {
    adminClient(config.keycloakSettings)
    .then(client => {
      client.users.resetPassword(
        config.keycloakRealm,
        req.params.id,
        {
          temporary: false,
          type: 'password',
          value: req.body.password
        }
      ).then(usuario => {
        res.status(200).json(usuario);
      }, err => {
        res.status(404).send({
          'message': 'No Result Found'
        });
      });
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  return router;
}

'use strict';
module.exports = (express, keycloak, models) => {
  let router = express.Router();
  var adminClient = require('keycloak-admin-client');
  var getToken = require('keycloak-request-token');
  var request = require('request');
  var config = require(__dirname + '/../config/config.json').others;
  router.get('/', keycloak.protect('administrador'), (req, res) => {
    adminClient(config.keycloakSettings)
    .then(client => {
      client.users.find(config.keycloakRealm)
      .then(usuarios => {
        if (usuarios.length != 0) {
          res.status(200).json(usuarios);
        } else {
          res.status(404).send({
            'message': 'No Results Found'
          })
        }
      }, err => {
        res.status(500).send(err);
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/:id', keycloak.protect(), (req, res) => {
    adminClient(config.keycloakSettings)
    .then(client => {
      client.users.find(
        config.keycloakRealm,
        { userId: req.params.id })
      .then(usuario => {
        res.status(200).json(usuario);
      }, err => {
        res.status(404).send({
          'message': 'No Result Found'
        });
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });
  router.post('/', keycloak.protect(), (req, res) => {
    if (req.body.rut == null || req.body.rut == undefined
      || req.body.username == null || req.body.username == undefined
      || req.body.nombres == null || req.body.nombres == undefined
      || req.body.apellidos == null || req.body.apellidos == undefined
    ) {
      res.status(400).json({
        'message': 'Bad request'
      });
    } else {
      adminClient(config.keycloakSettings)
      .then(client => {
        client.users.create(
          config.keycloakRealm,
          {
            'username': req.body.username,
            'firstName': req.body.nombres,
            'lastName': req.body.apellidos,
            'email': req.body.email,
            'attributes': {
              'rut': [req.body.rut],
              'celular': [req.body.celular]
            },
            'enabled': true
          }
        ).then(usuario => {
          res.status(200).json(usuario);
        }, err => {
          res.status(404).send({
            'message': 'No Result Found'
          });
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    }
  });
  router.post('/password/:id', keycloak.protect(), (req, res) => {
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
  router.put('/', keycloak.protect(), (req, res) => {
    if (req.body.rut == null || req.body.rut == undefined
      || req.body.username == null || req.body.username == undefined
      || req.body.nombres == null || req.body.nombres == undefined
      || req.body.apellidos == null || req.body.apellidos == undefined
    ) {
      res.status(400).json({
        'message': 'Bad request'
      });
    } else {
      adminClient(config.keycloakSettings)
      .then(client => {
        client.users.update(
          config.keycloakRealm,
          req.body
        ).then(usuarios => {
          res.status(200).json(usuarios);
        }, err => {
          res.status(404).send({
            'message': 'No Result Found'
          });
        });
      })
      .catch(err => {
        res.status(500).send(err);
      });
    }
  });
  router.delete('/:id', keycloak.protect(), (req, res) => {
    adminClient(config.keycloakSettings)
    .then(client => {
      client.users.find(
        config.keycloakRealm,
        { userId: req.params.id })
      .then(usuarios => {
        usuarios.enabled = false;
        client.users.update(
          config.keycloakRealm,
          usuarios
        ).then(usuarios => {
          res.status(200).json(usuarios);
        }, err => {
          res.status(500).send({
            'message': 'No Result Found'
          });
        });
        res.status(200).json(usuarios);
      }, err => {
        res.status(404).send({
          'message': 'No Result Found'
        });
      });
    })
    .catch(err => {
      res.status(500).send(err);
    });
  });
  return router;
}

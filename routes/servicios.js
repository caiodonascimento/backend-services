'use strict';
module.exports = (express, keycloak, models) => {
  let router = express.Router();
  const Op = models.sequelize.Op;
  router.get('/', keycloak.protect(), (req, res) => {
    models.servicios.findAll()
    .then(servicios => {
      if (servicios.length != 0) {
        res.json(servicios);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/:id', keycloak.protect(), (req, res) => {
    models.servicios.findById(req.params.id)
    .then(servicio => {
      if (servicio != null || servicio != undefined) {
        res.json(servicio);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.post('/', keycloak.protect(), (req, res) => {
    models.servicios.create(req.body)
    .then(servicio => {
      res.json(servicio);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.put('/', keycloak.protect(), (req, res) => {
    models.servicios.update(req.body, {
      where: {
        id: { [Op.eq]: req.body.id }
      }
    })
    .then(ids => {
      res.json(ids);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  return router;
}

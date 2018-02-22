'use strict';
module.exports = (express, keycloak, models) => {
  let router = express.Router();
  const Op = models.sequelize.Op;
  router.get('/', keycloak.protect(), (req, res) => {
    models.profesionals.findAll()
    .then(profesionales => {
      if (profesionales.length != 0) {
        res.json(profesionales);
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
    models.profesionals.findById(req.params.id)
    .then(profesional => {
      if (profesional != null || profesional != undefined) {
        res.json(profesional);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/:id/servicios', keycloak.protect(), (req, res) => {
    models.entregaServicios.findAll({
      where: {
        profesionaleId: { [Op.eq]: req.params.id }
      },
      attributes: [ 'id', 'tipoEntrega', 'valor', 'estatus' ],
      include: [{
        model: models.servicios,
        attributes: [ 'glosa', 'valorBase', 'estatus' ],
        include: [{
          model: models.categorias,
          attributes: [ 'glosa', 'estatus' ]
        }]
      }]
    })
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
  router.get('/usuario/:userId', keycloak.protect(), (req, res) => {
    models.profesionals.findAll({
      where: {
        userId: { [Op.eq]: req.params.userId }
      }
    })
    .then(profesional => {
      if (profesional.length != 0) {
        res.json(profesional[0]);
      } else {
        res.status(404).json({
          'message': 'No Result Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.post('/', keycloak.protect(), (req, res) => {
    models.profesionals.create(req.body)
    .then(profesional => {
      res.json(profesional);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.post('/:id/servicios/:sid', keycloak.protect(), (req, res) => {
    req.body.profesionaleId = req.params.id;
    req.body.servicioId = req.params.sid;
    models.entregaServicios.create(req.body)
    .then(entrega => {
      res.json(entrega);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.put('/', keycloak.protect(), (req, res) => {
    models.profesionals.update(req.body,
    {
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
  router.put('/:id/servicios/:sid', keycloak.protect(), (req, res) => {
    req.body.profesionaleId = req.params.id;
    req.body.servicioId = req.params.sid;
    models.entregaServicios.update(req.body, {
      where: {
        id: { [Op.eq]: req.body.id }
      }
    })
    .then(entrega => {
      res.json(entrega);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  return router;
}

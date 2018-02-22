'use strict';
module.exports = (express, keycloak, models) => {
  let router = express.Router();
  const Op = models.sequelize.Op;
  router.get('/', keycloak.protect(), function(req, res) {
    models.direccions.findAll({
      attributes: [ 'id', 'direccion1', 'direccion2', 'estatus' ],
      include: [{
        model: models.comunas,
        as: 'comunas',
        attributes: [ 'id', 'glosa', 'estatus' ],
        include: [{
          model: models.regions,
          as: 'regions',
          attributes: [ 'id', 'glosa', 'estatus' ],
          include: [{
            model: models.pais,
            as: 'pais',
            attributes: [ 'id', 'glosa', 'estatus' ]
          }]
        }]
      }]
    })
    .then(direcciones => {
      if (direcciones.length != 0) {
        res.json(direcciones);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/paises', keycloak.protect(), function(req, res) {
    models.pais.findAll()
    .then(paises => {
      if (paises.length != 0) {
        res.json(paises);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/regiones/:paisId', keycloak.protect(), function(req, res) {
    models.regions.findAll({
      where: {
        paisId: { [Op.eq]: req.params.paisId }
      }
    })
    .then(regiones => {
      if (regiones.length != 0) {
        res.json(regiones);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/comunas/:regionId', keycloak.protect(), function(req, res) {
    models.comunas.findAll({
      where: {
        regId: { [Op.eq]: req.params.regionId }
      }
    })
    .then(comunas => {
      if (comunas.length != 0) {
        res.json(comunas);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/:id', keycloak.protect(), function(req, res) {
    models.direccions.findById(req.params.id, {
      attributes: [ 'id', 'direccion1', 'direccion2', 'estatus' ],
      include: [{
        model: models.comunas,
        as: 'comunas',
        attributes: [ 'id', 'glosa', 'estatus' ],
        include: [{
          model: models.regions,
          as: 'regions',
          attributes: [ 'id', 'glosa', 'estatus' ],
          include: [{
            model: models.pais,
            as: 'pais',
            attributes: [ 'id', 'glosa', 'estatus' ]
          }]
        }]
      }]
    })
    .then(direccion => {
      if (direccion != null || direccion != undefined) {
        res.json(direccion);
      } else {
        res.status(404).json({
          'message': 'No Results Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.get('/usuario/:userId', keycloak.protect(), function(req, res) {
    models.direccions.findAll({
      where: {
        userId: { [Op.eq]: req.params.userId }
      },
      attributes: [ 'id', 'direccion1', 'direccion2', 'estatus' ],
      include: [{
        model: models.comunas,
        as: 'comunas',
        attributes: [ 'id', 'glosa', 'estatus' ],
        include: [{
          model: models.regions,
          as: 'regions',
          attributes: [ 'id', 'glosa', 'estatus' ],
          include: [{
            model: models.pais,
            as: 'pais',
            attributes: [ 'id', 'glosa', 'estatus' ]
          }]
        }]
      }]
    })
    .then(direcciones => {
      if (direcciones.length != 0) {
        res.json(direcciones);
      } else {
        res.status(404).json({
          'message': 'No Result Found'
        });
      }
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.post('/', keycloak.protect(), function(req, res) {
    models.direccions.create(req.body)
    .then(direccion => {
      res.json(direccion);
    }).catch(err => {
      res.status(500).send(err);
    });
  });
  router.put('/', keycloak.protect(), function(req, res) {
    console.log(req.body);
    models.direccions.update(req.body, {
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

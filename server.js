'use strict';

var app = require('./routes');
var models = require('./models')
var http = require('http');
var config = require(__dirname + '/config/config.json').others;

var Server = function() {
  var self = this;

  self.port = config.port || process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
  self.ipaddr = config.ip || process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

  if (typeof self.ipaddr === "undefined") {
    console.warn('No OPENSHIFT_NODEJS_IP environment variable');
  };

  self.instance = http.createServer(app);

  //starting the nodejs server with express
  self.startServer = function() {
    self.instance.listen(self.port, self.ipaddr, function() {
      console.log(
        '%s: Node server started on %s:%d ...',
        Date(Date.now()),
        self.ipaddr,
        self.port
      );
    });
  }

  // Destructors
  self.terminator = function(sig) {
    if (typeof sig === "string") {
      console.log(
        '%s: Received %s - terminating Node server ...',
        Date(Date.now()),
        sig
      );
      process.exit(1);
    };
    console.log('%s: Node server stopped.', Date(Date.now()) );
  };

  process.on('exit', function() { self.terminator(); });
}

var server = new Server();

models.sequelize.sync().then(function() {
  server.startServer();
});

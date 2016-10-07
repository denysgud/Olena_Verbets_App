var express = require('express');
var morgan = require('morgan');
var path = require('path');

module.exports = function() {
  var app = express();

  app.use(morgan('dev'));

  app.use(express.static(path.join(__dirname, '/../../client')));

  require('../app/routes/index.js')(app);

  return app;
};
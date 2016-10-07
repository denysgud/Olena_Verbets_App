process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 8080;

var express = require('./config/express');
var app = express();

app.listen(process.env.PORT);

console.log('Server running at http://localhost:' + process.env.PORT + '/');

module.exports = app;
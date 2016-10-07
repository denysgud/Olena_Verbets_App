module.exports = function(app) {
  var index = require('../controllers/index');
  app.get('/', function(req, res) {
    res.sendFile('index.html');
  });
};
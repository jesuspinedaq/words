var http = require('http');
var app = require('./app');

var port = 3000;
var server = http.createServer(app);
server.listen(port, function(){
  console.log("Server listening in port:", port);
});

module.exports = server;
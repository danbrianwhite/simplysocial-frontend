var http = require('http');
var express = require('express');

process.on('uncaughtException', function(err) {
  console.log(err);
});

var server = express();

server.use(express.static(__dirname+'/dist'));

var port = 3000;
server.listen(port, function() { 
    console.log('listening on port ' + port);     
});
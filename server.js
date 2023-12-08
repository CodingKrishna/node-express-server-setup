
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require("fs");
var app = express();

// all environments
app.set('port', process.env.PORT || 4300);
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


let users = [{ id: 1, name: "ravi"}, {id: 2, name: "siva" }]
app.get('/index.html', function (req, res) {
  res.sendFile(__dirname + "/" + "index.html");
})

app.post('/createUser', function (req, res) {
  // Prepare output in JSON format
  let user = {
    id: req.body.id,
    name: req.body.name
  }
  users.push(user);
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));
})

app.get('/listUsers', function (req, res) {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
})

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

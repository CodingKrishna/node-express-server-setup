
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var fs = require("fs");
var app = express();
var bodyParser = require('body-parser');

// all environments
app.set('port', process.env.PORT || 4300);
app.use(express.logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


let users = [{ id: 1, name: "ravi"}, {id: 2, name: "siva" }];


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

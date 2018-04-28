var express = require('express');
var bodyParser = require('body-parser');
var router = require('./controllers/index');
var mongoose = require('mongoose');

var app = express();

var dbConnection = 'mongodb://localhost/word';

mongoose.connect(dbConnection, function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database!');
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res){
  res.send('Hello');
});

app.use(router);

module.exports = app;
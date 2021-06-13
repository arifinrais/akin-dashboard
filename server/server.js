//server/server.js
var express = require('express');
var router = require('./routes/routes.js')
var path = require('path');
var app = express();
//var url = "mongodb://localhost:27017/";
var mongoose = require('mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));
app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));

mongoose.connect('mongodb://mongo:admin@localhost:27017/akin', { useUnifiedTopology: true, useNewUrlParser: true });

app.use('/', router);

module.exports=app;
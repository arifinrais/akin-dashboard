//server/server.js
var express = require('express');
var router = require('./routes/main.js');
var api = require('./routes/api.js');
var path = require('path');
var app = express();
var mongoose = require('mongoose')

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../client'));

app.use(express.static(path.join(__dirname, '../client')));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: false}));
app.use('/', router);
app.use('/api/', api);

mongoose.connect('mongodb://mongo:admin@localhost:27017/akin', { useUnifiedTopology: true, useNewUrlParser: true })
    .then(() => console.log('connected to akin database'))
    .catch(err => console.log(err));

module.exports=app;
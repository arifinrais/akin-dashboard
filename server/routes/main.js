//server/routes/routes.js
var express = require('express');
var router = express.Router();
var controller = require('../providers/controllerProvider');

//homepage
router.get('/', function(req, res){
  res.render('index')
});

module.exports = router;
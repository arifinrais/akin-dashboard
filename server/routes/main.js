//server/routes/routes.js
var express = require('express');
var router = express.Router();
var controller = require('../providers/controllerProvider');

//homepage
router.get('/', function(req, res){
  res.render('index')
});

//explore
router.get('/explore', function(req, res){
  res.render('explore')
});

router.get('/rankings', function(req, res){
  res.render('rankings')
});

module.exports = router;
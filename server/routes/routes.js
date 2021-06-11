//server/routes/routes.js
var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

//homepage
router.get('/', function(req, res){
  res.render('index')
});

//explore
router.get('/explore', function(req) {
  
});



module.exports = router;
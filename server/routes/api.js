//server/routes/routes.js
var express = require('express');
var router = express.Router();
var controller = require('../providers/controllerProvider');
var dataAPI = 'http://localhost:5000/api/';

//explore
router.get('/explore',function(req, res) {
  req.query.focus = req.query.focus? req.query.focus : 'reg';
  req.query.regdim = req.query.regdim? req.query.regdim : 'city';
  req.query.iprdim = req.query.iprdim? req.query.iprdim : 'ptn';
  req.query.code = req.query.code? req.query.code : '180';
  req.query.year = req.query.year? req.query.year : '2018';
  req.query.hide = req.query.hide? String(req.query.hide).split(',') : '';
  req.query.vtype = req.query.vtype? req.query.vtype : 'tmv';

  iprdim = req.query.iprdim == 'ptn'? 'patent' : req.query.iprdim == 'trd'? 'trademark' : req.query.iprdim == 'pub' ? 'publication' : '';
  req.url_base = dataAPI+'visualization?ipr_dim='+iprdim+'&year=';
  //_controller = req.query.iprdim == 'ptn'? controller.PatentController : req.query.iprdim == 'trd'?
  //  controller.TrademarkController : req.query.iprdim == 'pub' ? controller.PublicationController : null;

  _controller = controller.PatentController
  if (req.query.vtype == 'nsv') { //specified case
    _controller.nationalshare(req,res)
    return;
  } else if (req.query.vtype == 'otv') { //specified case
    _controller.overtime(req,res)
    return;
  } else if (req.query.vtype == 'tmv') { //specified case
    _controller.treemap(req,res)
    return;
  } else if (req.query.vtype == 'gmv') { //specified case
    _controller.geomap(req,res)
    return;
  } else {
    throw 'Unrecognized Visualization Type'; 
  }   
});

router.get('/rankings',function(req, res) {
  req.query.regdim = req.query.regdim? req.query.regdim : 'city';
  req.query.iprdim = req.query.iprdim? req.query.iprdim : 'ptn';
  req.query.year = req.query.year? req.query.year : '2018';

  iprdim = req.query.iprdim == 'ptn'? 'patent' : req.query.iprdim == 'trd'? 'trademark' : req.query.iprdim == 'pub' ? 'publication' : '';
  req.url_base = dataAPI+'analysis?ipr_dim='+iprdim+'&year=';

  controller.RankingController.rankings(req,res);
});

module.exports = router;
//server/routes/routes.js
var express = require('express');
var axios = require('axios');
var router = express.Router();
var controller = require('../providers/controllerProvider');
var dataAPI = 'http://localhost:5000/api/';

async function getData(url, res) {
  try {
     let result = await axios({
          url: url,
          method: 'GET',
          timeout: 8000,
          headers: {
              'Content-Type': 'application/json',
          }
      })
      /*if(result.status == 200){
          // test for status you want, etc
          console.log(result.status)
      }    */
      // Don't forget to return something   
      return result.data
  }
  catch (err) {
      res.send(err)
  }
}

//explore
router.get('/explore',function(req, res) {
  req.query.focus = req.query.focus? req.query.focus : 'reg';
  req.query.regdim = req.query.regdim? req.query.regdim : 'city';
  req.query.iprdim = req.query.iprdim? req.query.iprdim : 'ptn';
  req.query.code = req.query.code? req.query.code : '180';
  req.query.year = req.query.year !== 'null'? req.query.year : '2018';
  req.query.hide = req.query.hide? String(req.query.hide).split(',') : '';
  req.query.vtype = req.query.vtype? req.query.vtype : 'tmv';
    
  iprdim = req.query.iprdim == 'ptn'? 'patent' : req.query.iprdim == 'trd'? 'trademark' : req.query.iprdim == 'pub' ? 'publication' : '';
  year = req.query.year? req.query.year : '2018';
  var dataurl = dataAPI+'visualization?ipr_dim='+iprdim+'&year='+year;

  console.log(req.query.code)
  getData(dataurl).then(result => {
    req.data=result;
    if (req.query.vtype == 'nsv') { //specified case
      controller.PatentController.nationalshare(req,res)
      return;
    } else if (req.query.vtype == 'otv') { //specified case
      controller.PatentController.overtime(req,res)
      return;
    } else if (req.query.vtype == 'tmv') { //specified case
      controller.PatentController.treemap(req,res)
      return;
    } else if (req.query.vtype == 'gmv') { //specified case
      controller.PatentController.geomap(req,res)
      return;
    }
  })    
});

module.exports = router;
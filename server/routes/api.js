//server/routes/routes.js
var express = require('express');
var axios = require('axios');
var router = express.Router();
var controller = require('../providers/controllerProvider');
var dataAPI = 'http://localhost:5000/api/';

async function getData(url) {
  try {
     let res = await axios({
          url: url,
          method: 'GET',
          timeout: 8000,
          headers: {
              'Content-Type': 'application/json',
          }
      })
      if(res.status == 200){
          // test for status you want, etc
          console.log(res.status)
      }    
      // Don't forget to return something   
      return res.data
  }
  catch (err) {
      console.error(err);
  }
}

//explore
router.get('/explore',function(req, res) {
    var focusRec = req.query.focus? req.query.focus : 'reg';
    var regdimRec = req.query.regdim? req.query.regdim : 'city';
    var iprdimRec = req.query.iprdim? req.query.iprdim : 'ptn';
    var codeRec = req.query.code? req.query.code : '181';
    var yearRec = req.query.year !== 'null'? req.query.year : '2018';
    var hideRec = req.query.hide? String(req.query.hide).split(',') : '';
    var vtypeRec = req.query.vtype? req.query.vtype : 'tmv';
    
    iprdim = iprdimRec == 'ptn'? 'patent' : iprdimRec == 'trd'? 'trademark' : iprdimRec == 'pub' ? 'publication' : '';
    year = yearRec? yearRec : '2018';
    var dataurl = dataAPI+'visualization?ipr_dim='+iprdim+'&year='+year;

    getData(dataurl).then(result => {
      req.data=result;
      if (vtypeRec == 'nsv') { //specified case
        controller.PatentController.nationalshare(req,res)
        return;
      } else if (vtypeRec == 'otv') { //specified case
        controller.PatentController.overtime(req,res)
        return;
      } else if (vtypeRec == 'tmv') { //specified case
        controller.PatentController.treemap(req,res)
        return;
      } else if (vtypeRec == 'gmv') { //specified case
        controller.PatentController.geomap(req,res)
        return;
      }
    })    
});

module.exports = router;
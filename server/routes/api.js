//server/routes/routes.js
var express = require('express');
var router = express.Router();
var controller = require('../providers/controllerProvider');

//explore
router.get('/explore',function(req, res) {
    var focusRec = req.query.focus;
    var regdimRec = req.query.regDim;
    var iprdimRec = req.query.iprDim;
    var codeRec = req.query.code;
    var vtypeRec = req.query.vtype;
    var yearRec = req.query.year;
    //default_case
    if(focusRec == null || regdimRec == null || iprdimRec == null || codeRec == null || vtypeRec == null || yearRec == null){
      controller.PatentController.default(req,res)
    } else if (focusRec = 'reg') {
      if (vtype = 'nsv') { //specified case
        controller.PatentController.nationalshare(req,res)
      } else if (vtype = 'otv') { //specified case
        controller.PatentController.overtime(req,res)
      } else if (vtype = 'tmv') { //specified case
        controller.PatentController.treemap(req,res)
      } else {
        controller.PatentController.default(req, res)
      }
    } else if (focusRec = 'ipr') {
      if (vtype = 'nsv') { //specified case
        controller.PatentController.geomap(req,res)
      } else if (vtype = 'otv') { //specified case
        controller.PatentController.overtime(req,res)
      } else if (vtype = 'tmv') { //specified case
        controller.PatentController.treemap(req,res)
      } else {
        controller.PatentController.default(req, res)
      }
    }
});

module.exports = router;
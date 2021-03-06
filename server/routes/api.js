//server/routes/routes.js
var express = require('express');
var router = express.Router();
var controller = require('../providers/controllerProvider');

//explore
router.get('/explore',function(req, res) {
    var focusRec = req.query.focus;
    var regdimRec = req.query.regdim;
    var iprdimRec = req.query.iprdim;
    var codeRec = req.query.code;
    var vtypeRec = req.query.vtype;
    
    if(focusRec == null || regdimRec == null || iprdimRec == null || codeRec == null || vtypeRec == null){
      controller.PatentController.default(req,res);
      return;
    }
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
    } else {
      controller.PatentController.default(req, res)
      return;
    }
});

module.exports = router;
const axios = require('axios');
var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');

function getPatent(code) {
  return resources.PatentCode[code];
}

function getColor(code) {
  return resources.ColorCode[code];
}

exports.default = (req,res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regDim;
  var iprdimRec = req.query.iprDim;
  var codeRec = req.query.code;
  var vtypeRec = req.query.vtype;
  var yearRec = req.query.year;
    //if req.query.focus == ipr
    // default ipr
    //else default region
  if (focusRec == 'ipr') {
    //ambil database  
    //transform ke model Treemap
    //res json
  } else {
    //ambil database
    model.Patent.find({year: 2018}, function(err, patent){
      if(err)
        res.send(err)
      let defReg = new model.TreeMap();
      let defRec = patent[0];
      defReg.id = "default-regional-treemap";
      defReg.label = "default-regional-treemap";
      defReg.children = [];
      //console.log(defRec.provinces[12]);
      for(let ctg in defRec.provinces[12]) {
        let totalProv = defRec.provinces[12]["total_prov"];
        //console.log(typeof ctg);
        //console.log(ctg);
        if (ctg.length == 1) {
          console.log(ctg);
          let ptClass = getPatent(ctg);
          let ptColor = getColor(ctg);
          console.log(ptClass);
          console.log(ptColor);
          var child = {}
          if (ptClass instanceof String && ptColor instanceof String) {
            child["id"]=ptClass;
            child["label"]=ptClass;
            child["fill"]=ptColor;
            child["children"]=[];
          } else {
            res.send(ptClass)
          }
          for(let subctg in defRec.provinces[12][ctg]){ //[ctg]??
            if (subctg.length == 3 && subctg != '_id') {
              let subptClass = getPatentClass(subctg);
              var grandchild = {}
              if (subptClass instanceof String) {
                grandchild["id"]=subptClass;
                grandchild["label"]=subptClass;
                grandchild["tooltipContent"]=subptClass;
                grandchild["size"]=parseFloat(defRec.provinces[12][ctg][subctg]/totalProv).toFixed(2);
              }
              child["children"].push(grandchild);
            }
          }
          defReg.children.push(child);
        }
      }
      res.json(defReg);
    });
  }
}

exports.nationalshare = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regDim;
  var iprdimRec = req.query.iprDim;
  var codeRec = req.query.code;
  var vtypeRec = req.query.vtype;
  var yearRec = req.query.year;
}

exports.overtime = (req, res) => {

}

exports.treemap = (req, res) => {

}

exports.geomap = (req, res) => {
  
}
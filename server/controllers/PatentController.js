//const axios = require('axios');
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
    //if req.query.focus == ipr
    // default ipr
    //else default region
  if (focusRec == 'ipr') {
    //ambil database  
    //transform ke model Treemap
    //res json
  } else {
    //ambil database
    //BISA DIABSTRAKSI lagi buat dimasukin ke treemap aja pake parameter 2018, 12,
    model.Patent.find({year: 2018}, function(err, patent){
      if(err)
        res.send(err)
      let defReg = new model.TreeMap();
      let defRec = patent[0];
      defReg.id = "dfr";
      defReg.label = "dfr";
      defReg.children = [];
      for(let ctg in defRec.provinces[12]) {
        let totalProv = defRec.provinces[12]["total_prov"];
        if (ctg.length == 1 && defRec.provinces[12][ctg]!=null) {
          let ptClass = getPatent(ctg);
          let ptColor = getColor(ctg);
          var child = {}
          if (typeof ptClass === "string" && typeof ptColor === "string") {
            child["id"]=ptClass;
            child["label"]=ptClass;
            child["fill"]=ptColor;
            child["children"]=[];
          }
          for(let subctg in defRec.provinces[12][ctg]){
            if (subctg.length == 3 && subctg != '_id' && defRec.provinces[12][ctg][subctg]!=null) {
              let subptClass = getPatent(subctg);
              var grandchild = {}
              if (typeof subptClass === "string") {
                grandchild["id"]=subptClass;
                grandchild["label"]=subptClass;
                grandchild["tooltipContent"]=subptClass;
                grandchild["size"]=parseFloat(defRec.provinces[12][ctg][subctg]*100/totalProv).toFixed(2);
                child["children"].push(grandchild);
              }
            }
          }
          //console.log(child);
          defReg.children.push(child);
        }
      }
      //console.log(defReg)
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
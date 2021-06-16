var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');

function getPatent(code) {
  return resources.PatentCode[code];
}

function getColor(code) {
  return resources.ColorCode[code];
}

function buildTreemap(fc, yr, rDim, iDim, cd, res) {
  if (fc === 'reg') {
    model.Patent.find({year: yr}, function(err, patent){
      if(err) {
        res.send(err)
        return;
      }
      let code = parseInt(cd);
      let defReg = new model.TreeMap();
      let defRec = rDim=='prov'? patent[0].provinces : patent[0].cities;
      defReg.id = "dfr";
      defReg.label = "dfr";
      defReg.children = [];
      for(let ctg in defRec[code]) {
        let totalProv = rDim=='prov'? defRec[code]["total_prov"]:defRec[code]["total_city"];
        if (ctg.length == 1 && defRec[code][ctg]!=null) {
          let ptClass = getPatent(ctg);
          let ptColor = getColor(ctg);
          var child = {}
          if (typeof ptClass === "string" && typeof ptColor === "string") {
            child["id"]=ptClass;
            child["label"]=ptClass;
            child["fill"]=ptColor;
            child["children"]=[];
          }
          for(let subctg in defRec[code][ctg]){
            if (subctg.length == 3 && subctg != '_id' && defRec[code][ctg][subctg]!=null) {
              let subptClass = getPatent(subctg);
              var grandchild = {}
              if (typeof subptClass === "string") {
                grandchild["id"]=subptClass;
                grandchild["label"]=subptClass;
                grandchild["tooltipContent"]=subptClass;
                grandchild["size"]=parseFloat(defRec[code][ctg][subctg]*100/totalProv).toFixed(2);
                child["children"].push(grandchild);
              }
            }
          }
          defReg.children.push(child);
        }
      }
      res.json(defReg);
      return;  
    });
  } else if (fc === 'ipr') {
    //bikin model ipr duls, ada geomap inget
  }
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
    buildTreemap('reg', 2018, 'prov', 'ptn', '12', res);
    return;
  }
}

exports.nationalshare = (req, res) => {
  
}

exports.overtime = (req, res) => {

}

exports.treemap = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var codeRec = req.query.code;
  var yearRec = req.query.year;
  /*console.log(focusRec);
  console.log(regdimRec);
  console.log(iprdimRec);
  console.log(codeRec);
  console.log(yearRec);*/
  buildTreemap(focusRec, yearRec, regdimRec, iprdimRec, codeRec, res);
  return;
}

exports.geomap = (req, res) => {
  
}
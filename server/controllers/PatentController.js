var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');

function getPatent(code) {
  return resources.PatentCode[code];
}

function getColor(code) {
  return resources.ColorCode[code];
}

function buildTreemap(fc, yr, rDim, iDim, cd, hid, res) {
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
      if (!defRec[code]) {
        res.send(err);
        return;
      }
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
      if (hid.length >= 1 && !hid.includes('')) {
        for (var x of hid) {
          defReg.children = defReg.children.filter((item) => item.fill != getColor(x));
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
    buildTreemap('reg', 2018, 'prov', 'ptn', '12', [], res);
    return;
  }
}
const data: LineChartDatum[] = [
  {
    coords: [
      {x: 2005, y: 5},
      {x: 2006, y: 6},
      {x: 2007, y: 8},
      {x: 2008, y: 6},
      {x: 2009, y: 5},
      {x: 2010, y: 9},
      {x: 2011, y: 8},
      {x: 2012, y: 7},
      {x: 2013, y: 6},
      {x: 2014, y: 5},
      {x: 2015, y: 5},
      {x: 2016, y: 8},
    ],
    animationDuration: 0,
    label: 'Green',
    color: 'forestgreen',
    labelColor: 'purple',
    width: 3,
    labelPosition: LabelPosition.Top,
    labelAnchor: LabelAnchor.Middle,
  }, {
    coords: [
      {x: 2005, y: 2},
      {x: 2006, y: 4},
      {x: 2007, y: 5},
      {x: 2008, y: 3},
      {x: 2009, y: 6},
      {x: 2010, y: 5},
      {x: 2011, y: 4},
      {x: 2012, y: 3},
      {x: 2013, y: 3},
      {x: 2014, y: 4},
      {x: 2015, y: 6},
      {x: 2016, y: 7},
    ],
    animationDuration: 1000,
    label: 'Salmon',
    color: 'darksalmon',
    labelColor: 'purple',
    width: 3,
    labelPosition: LabelPosition.Center,
    labelAnchor: LabelAnchor.Left,
  }
];

exports.nationalshare = (req, res) => {
  var rDim = req.query.regdim;
  //var iDim = req.query.iprdim;
  var cd = req.query.code;
  var yr = req.query.year;
  var hid = String(req.query.hide).split(',');

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
    if (!defRec[code]) {
      res.send(err);
      return;
    }
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
    if (hid.length >= 1 && !hid.includes('')) {
      for (var x of hid) {
        defReg.children = defReg.children.filter((item) => item.fill != getColor(x));
      }
    }
    res.json(defReg);
    return;  
  });
}

exports.overtime = (req, res) => {

}

exports.treemap = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var codeRec = req.query.code;
  var yearRec = req.query.year;
  var hideRec = String(req.query.hide).split(',');
  buildTreemap(focusRec, yearRec, regdimRec, iprdimRec, codeRec, hideRec, res);
  return;
}

exports.geomap = (req, res) => {
  
}
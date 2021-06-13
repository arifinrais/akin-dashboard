var model = require('../providers/modelProvider');

/*
var dbURI = 'mongodb://mongo:admin@localhost:27017';

async function run() {
  const MongoClient = new require('mongodb').MongoClient;
  const client = new MongoClient(dbURI, { useUnifiedTopology: true, useNewUrlParser: true });
  console.log("tes1")
  try {
    console.log("tes2")
    await client.connect();
    const coll = client.db('akin-dashboard').collection('viz_patent')
    const cursor = coll.find({year:2001})
    await cursor.forEach(console.dir);
    console.log("tes2b")
  } finally {
    await client.close();
    console.log("tes3")
  }
}
*/
//run().catch(console.dir); //dimasukin ke exports dibawah

function getPatentClass(code) {
  model.PatentCode.find({dim: "ipc"}, function(err, pCode) {
    if (err)
      return(err);
    return pCode.toObject().item[code];
  });
}

function getColorCode(code) {
  model.ColorCode.find({dim: "color"}, function(err, cCode) {
    if (err)
      return(err);
    return cCode.toObject().item[code];
  });
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
      let defReg = new model.TreeMap();
      let defRec = patent.toObject();
      defReg.id = "default-regional-treemap";
      defReg.label = "default-regional-treemap";
      defReg.children = [];
      for(let ctg in defRec.provinces[12]) {
        let totalProv = defRev.provinces[12]["total_prov"];
        if (ctg.length == 1) {
          let ptClass = getPatentClass(ctg);
          let ptColor = getColorCode(ctg);
          var child = {}
          if (ptClass instanceof String && ptColor instanceof String) {
            child["id"]=ptClass;
            child["label"]=ptClass;
            child["fill"]=ptColor;
            child["children"]=[];
          }
          for(let subctg in defRec.provinces[12][ctg]){ //[ctg]??
            if (subctg.length == 3) {
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
    //res.json
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
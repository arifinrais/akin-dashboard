var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');
var axios = require('axios');

const iprBases = {
  'ptn' : ["A", "B", "C", "D", "E", "F", "G", "H"]
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

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
    }*/
    return result.data
  }
  catch (err) {
    console.log(err)
    res.send(err)
  }
}

function getPatent(code) {
  return resources.PatentCode[code];
}

function getColor(code) {
  return resources.ColorCode[code];
}

function isCodeExists(code, obj, dim) {
  identifier = dim=='prov'? 'id_province' : dim=='city' ? 'id_city' : '';

  for (const item of obj) {
    if (item[identifier]==code) return item;
  }
  return false
}

function getIPRBase(iDim) {
  return iDim=='ptn'? 'ipc_base': iDim=='trd'? 'ncl_base' : iDim=='pub'? 'kri_base' : '';
}
function getIPRChild(iDim) {
  return iDim=='ptn'? 'ipc_class2': iDim=='trd'? 'ncl_class1' : iDim=='pub'? 'kri_class2' : '';
}
/*
function buildOvertime(fc, rDim, iDim, cd, hid, data, res) {
  if (fc === 'reg') {

  }
  var rDim = req.query.regdim;
  //var iDim = req.query.iprdim;
  var cd = parseInt(req.query.code);
  var hid = String(req.query.hide).split(',');
  var yr = String(req.query.year).split(',');

  //if ipr then different
  let patentCd = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let tempStacks = [];
  

  for (let i=2000; i<2019; i++) {
    await model.Patent.find({year: i}, function(err, patent){
      let tempStack = {};
      for (const ptCd of patentCd) {
        tempStack[ptCd]=0.0;
      }
      if(err) {
      } else {
        let defRec = rDim=='prov'? patent[0].provinces : patent[0].cities;
        if (defRec[cd]) {
          for (const ptCd of patentCd) {
            if (defRec[cd][ptCd]) {
              tempStack[ptCd]=parseFloat(defRec[cd][ptCd]["total_ctg"]).toFixed(2);
            } else {
              tempStack[ptCd]=0.0;
            }
          }
        }
      }
      tempStack["year"]=i;
      tempStacks.push(tempStack);
    }); 
    if (i==2018) await sleep(1); //to stop 18/19 fethed items problems
  }
  let defReg = new model.OverTime();
  tempConfig = {primaryKey: 'year', groups: []};

  //ini udah bener, tapi kenapa inputnya berubah2 ke default 2000-2018 yak
  tempStacks = tempStacks.filter((x) => x["year"]>=parseInt(yr[0]) && x["year"]<=parseInt(yr[1]));
  for (const ptCd of patentCd) {
    if (hid.includes(ptCd)) {
      for (let i=0; i<tempStacks.length; i++) {
        tempStacks[i][ptCd]=0;
      }
    }
    tempConf={
      key: ptCd,
      label: getPatent(ptCd),
      fill: getColor(ptCd)
    }
    tempConfig.groups.push(tempConf);
  }
  defReg.config = tempConfig;
  defReg.stacksReg = tempStacks;
  defReg["vtype"]='otv';
  res.json(defReg)
  return;
}
*/
function buildTreemap(fc, rDim, iDim, cd, hid, data, res) {
  if (fc === 'reg') {
    //set up variables
    let defRec = rDim=='prov'? data['province'] : data['city'];
    let region = isCodeExists(cd, defRec, rDim)
    if (!region) {res.json({vtype: 'err'});return;}
    let iprBase = getIPRBase(iDim)
    let iprChild = getIPRChild(iDim)
    let total = region['total'];
    //set up treemap
    let defReg = new model.TreeMap();
    defReg.id = "dfr";
    defReg.label = "dfr";
    defReg.children = [];
    //populate treemap
    for(const _class of region['class']) {
      let classBase = getPatent(_class[iprBase])
      let color = getColor(_class[iprBase])
      var child = {}        
      child["id"]=classBase;
      child["label"]=classBase;
      child["fill"]=color;
      child["children"]=[];
      for(const _childClass of _class['class2']) {
        let classChild = getPatent(_childClass[iprChild]);
        var grandchild = {}
        grandchild["id"]=classChild;
        grandchild["label"]=classChild;
        grandchild["tooltipContent"]=classChild;
        grandchild["size"]=parseFloat(_childClass['total']*100/total).toFixed(2);
        child["children"].push(grandchild);
      }  
      defReg.children.push(child);
    }
    //filter treemap by hide
    if (hid.length >= 1 && !hid.includes('')) {
      for (var x of hid) {
        defReg.children = defReg.children.filter((item) => item.fill != getColor(x));
        for (const _class of region['class']) {
          if (_class[iprBase]==x) {
            total-=_class['total'];
            break;
          }
        }
      }
    }
    defReg["vtype"]='tmv';
    defReg["total_shown"]=total;
    res.json(defReg);
    return;  
  } else if (fc === 'ipr') {
    //bikin model ipr duls, ada geomap inget
  }
}

exports.nationalshare = async(req, res) => {
  var rDim = req.query.regdim;
  //var iDim = req.query.iprdim;
  var cd = parseInt(req.query.code);
  var hid = String(req.query.hide).split(',');

  let patentCd = ["A", "B", "C", "D", "E", "F", "G", "H"];
  let tempCoords = {};
  for (const ptCd of patentCd) {
    tempCoords[ptCd]=[];
  }

  for (let i=2000; i<2019; i++) {
    await model.Patent.find({year: i}, function(err, patent){
      if(err) {
        //res.send(err)
        //return;
        //if it's assumed not yet assigned
        for (let ptCd in patentCd) {
          tempCoords[ptCd].push({x: i, y: 0});
        }
      } else {
        let defRec = rDim=='prov'? patent[0].provinces : patent[0].cities;
        let totalNat = patent[0].total_nation;
        if (!defRec[cd]) {
          for (const ptCd of patentCd) {
            tempCoords[ptCd].push({x: i, y: 0});
          }
        } else {
          for (const ptCd of patentCd) {
            if (defRec[cd][ptCd]) {
              tempCoords[ptCd].push({x: i, 
                y: parseFloat(defRec[cd][ptCd]["total_ctg"]*100/totalNat[ptCd]).toFixed(2)});
            } else {
              tempCoords[ptCd].push({x: i, y: 0});
            }
          }
        }
      } 
    });
    if (i==2018) await sleep(1); //to stop 18/19 fethed items problems
  }

  let defReg = new model.NationalShare();
  defReg.lines = []
  for (let ptCd in tempCoords) {
    if (!hid.includes(ptCd)) {
      defReg.lines.push(
        {
          coords: tempCoords[ptCd],
          animationDuration: 0,
          //label: getPatent(ptCd),
          color: getColor(ptCd),
          labelColor: getColor(ptCd),
          width: 3,
          labelPosition:"center",
          labelAnchor:"start"
        }
      )
    }
  }
  defReg["vtype"]='nsv';
  res.json(defReg)
  return;
}

exports.overtime = async(req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var yearRec = String(req.query.year).split(',');;
  var codeRec = req.query.code;
  var hideRec = String(req.query.hide).split(',');

  let iprBase = getIPRBase(iprdimRec)
  var tempStacks = []
  if (focusRec = 'reg') {
    let baseCode = iprBases[iprdimRec]
    for (let i=2007; i<2019; i++) { //HARUSNYA dari 2000
      await getData(req.url_base+i, res).then(data => {
        let defRec = regdimRec=='prov'? data['province'] : data['city'];
        let region = isCodeExists(codeRec, defRec, regdimRec)
        let tempStack = {};
        for (const code of baseCode) tempStack[code]=0.0;
        if (region) {
          for (const _class of region['class']) {
            tempStack[_class[iprBase]]+=parseFloat(_class['total']).toFixed(2);
          }
        }
        tempStack["year"]=i;
        tempStacks.push(tempStack);
      });
      if (i==2018) await sleep(1); //to stop 18/19 fetched items problems
    }
  }
  console.log(tempStacks)
  let defReg = new model.OverTime();
  tempConfig = {primaryKey: 'year', groups: []};

  //ini udah bener, tapi kenapa inputnya berubah2 ke default 2000-2018 yak
  tempStacks = tempStacks.filter((x) => x["year"]>=parseInt(yearRec[0]) && x["year"]<=parseInt(yearRec[1]));
  for (const code of iprBase) {
    if (hideRec.includes(code)) {
      for (let i=0; i<tempStacks.length; i++) {
        tempStacks[i][code]=0;
      }
    }
    tempConf={
      key: code,
      label: getPatent(code),
      fill: getColor(code)
    }
    tempConfig.groups.push(tempConf);
  }
  defReg.config = tempConfig;
  defReg.stacksReg = tempStacks;
  defReg["vtype"]='otv';
  console.log(defReg)
  res.json(defReg)
  return;
}

exports.treemap = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var yearRec = req.query.year;
  var codeRec = req.query.code;
  var hideRec = String(req.query.hide).split(',');
  getData(req.url_base+yearRec, res).then(data => {
    buildTreemap(focusRec, regdimRec, iprdimRec, codeRec, hideRec, data, res);
  })
  return;
}

exports.geomap = (req, res) => {
  
}
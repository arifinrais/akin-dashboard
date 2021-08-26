var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');
var axios = require('axios');

const iprBases = {
  'ptn' : ["A", "B", "C", "D", "E", "F", "G", "H"]
}

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function getData(url) {
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
    throw err
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

async function buildOvertime(url_base, fc, rDim, iDim, yr, cd, hid, res) {
  if (fc = 'reg') {
    let iprBase = getIPRBase(iDim)
    var tempStacks = []
    let baseCode = iprBases[iDim]
    for (let i=2000; i<2019; i++) { //HARUSNYA dari 2000
      await getData(url_base+i).then((data, err) => {
        let tempStack = {};
        for (const code of baseCode) tempStack[code]=0.0;
        if (!err) {
          let defRec = rDim=='prov'? data['province'] : data['city'];
          let region = isCodeExists(cd, defRec, rDim)
          if (region) {
            for (const _class of region['class']) tempStack[_class[iprBase]]+=parseFloat(_class['total']).toFixed(2);
          }
        }
        tempStack["year"]=i;
        tempStacks.push(tempStack);
      });
      if (i==2018) await sleep(1); //to stop 18/19 fetched items problems
    }
    let defReg = new model.OverTime();
    tempConfig = {primaryKey: 'year', groups: []};

    //ini udah bener, tapi kenapa inputnya berubah2 ke default 2000-2018 yak
    tempStacks = tempStacks.filter((x) => x["year"]>=parseInt(yr[0]) && x["year"]<=parseInt(yr[1]));
    for (const code of baseCode) {
      if (hid.includes(code)) {
        for (let i=0; i<tempStacks.length; i++) tempStacks[i][code]=0;
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
    res.json(defReg)
    return;
  } else if (fc === 'ipr') {
    //bikin model ipr duls, ada geomap inget
  }
}

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

async function buildNationalshare(url_base, rDim, iDim, cd, hid, res) {
  let iprBase = getIPRBase(iDim)
  let baseCode = iprBases[iDim]
  let tempCoords = {};
  for (const code of baseCode) tempCoords[code]=[];
  for (let i=2000; i<2019; i++) {
    await getData(url_base+i).then((data, err) => {
      if (err) {
        for (const code of baseCode) tempCoords[code].push({x: i, y: 0});
      } else {
        let defRec = rDim=='prov'? data['province'] : data['city'];
        let natTotal = data['national'];
        let region = isCodeExists(cd, defRec, rDim);
        if (!region) {
          for (const code of baseCode) tempCoords[code].push({x: i, y: 0});
        } else {
          for (const code of baseCode) {
            found=false
            for (const _class of region['class']) {
              if (_class[iprBase]==code) {
                for (const _natclass of natTotal) {
                  if (_natclass[iprBase]==code) {
                    tempCoords[code].push({x: i, y: parseFloat(_class['total']*100/_natclass['total']).toFixed(2)});
                    found=true
                    break;
                  }
                }
                break;
              }
            }
            if (!found) tempCoords[code].push({x: i, y: 0});
          }
        }
      }

    });
    if (i==2018) await sleep(1); //to stop 18/19 fetched items problems
  }
  let defReg = new model.NationalShare();
  defReg.lines = []
  for (let code in tempCoords) {
    if (!hid.includes(code)) {
      defReg.lines.push(
        {
          coords: tempCoords[code],
          animationDuration: 0,
          //label: getPatent(ptCd),
          color: getColor(code),
          labelColor: getColor(code),
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

exports.nationalshare = (req, res) => {
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var codeRec = req.query.code;
  var hideRec = String(req.query.hide).split(',');
  var url_base = req.url_base;
  buildNationalshare(url_base, regdimRec, iprdimRec, codeRec, hideRec, res);
  return;
}

exports.overtime = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var yearRec = String(req.query.year).split(',');
  var codeRec = req.query.code;
  var hideRec = String(req.query.hide).split(',');
  var url_base = req.url_base;
  buildOvertime(url_base, focusRec, regdimRec, iprdimRec, yearRec, codeRec, hideRec, res);
  return;
}

exports.treemap = (req, res) => {
  var focusRec = req.query.focus;
  var regdimRec = req.query.regdim;
  var iprdimRec = req.query.iprdim;
  var yearRec = req.query.year;
  var codeRec = req.query.code;
  var hideRec = String(req.query.hide).split(',');
  getData(req.url_base+yearRec).then((data, err) => {
    buildTreemap(focusRec, regdimRec, iprdimRec, codeRec, hideRec, data, res);
  })
  return;
}

exports.geomap = (req, res) => {
  
}
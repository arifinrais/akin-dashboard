var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');
var axios = require('axios');
const { unstable_createPortal } = require('react-dom');
const { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } = require('react-dom/cjs/react-dom.development');

const iprBases = {
  'ptn' : ["A", "B", "C", "D", "E", "F", "G", "H"],
  'trd' : ["Goods", "Services"]
}

const regBases = {
  'island' : ["0", "1", "2", "3", "4", "5", "6"]
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

function getIPR(code, iDim) {
  return iDim=='ptn'? resources.PatentCode[code] : iDim=='trd'? resources.TrademarkCode[code]: iDim=='pub'? resources.PublicationCode[code]: '';
}

function getColor(code, iDim) {
  return iDim=='ptn'? resources.PatentColorCode[code] : iDim=='trd'? resources.TrademarkColorCode[code]: iDim=='pub'? resources.PublicationColorCode[code]: '';
}

function getRegionColor(code) {
  return resources.RegionColorCode[code];
}

function getIsland(code) {
  return resources.IslandCode[code];
}

function getIslandId(code, rDim) {
  var _code = code
  if (rDim=='city') {
    for (const _city of resources.Dictionary['city']) {
      
      if (_code==_city['id']) {
        _code = _city['parent_id'];
        break;
      }
    }
  }
  for (const _province of resources.Dictionary['province']) {
    if (_code==_province['id']) {
      return _province['island_id'];
    }
  }
}

function isCodeExists(code, obj, dim) {
  identifier = getRegionKey(dim)
  for (const item of obj) {
    if (item[identifier]==code) return item;
  }
  return false
}

function isIPRExists(code, obj, dim) {
  identifier = getIPRBase(dim)
  for (const item of obj) {
    if (item[identifier]==code) {
      return item['total'];
    }
  }
  return -1;
}

function getIPRBase(iDim) {
  return iDim=='ptn'? 'ipc_base': iDim=='trd'? 'ncl_base' : iDim=='pub'? 'kri_base' : '';
}

function getIPRChild(iDim) {
  return iDim=='ptn'? 'ipc_class2': iDim=='trd'? 'ncl_class1' : iDim=='pub'? 'kri_class2' : '';
}

function getRegion(code, rDim) {
  return rDim=='prov'? resources.ProvinceCode[code] : rDim=='city'? resources.CityCode[code] : '';
}

function getRegionKey(rDim) {
  return rDim=='prov'? 'id_province' : rDim=='city'? 'id_city' : '';
}

async function buildOvertime(url_base, fc, rDim, iDim, yr, cd, hid, res) {
  if (fc == 'reg') {
    let iprBase = getIPRBase(iDim)
    var tempStacks = []
    let baseCode = iprBases[iDim]
    for (let i=2000; i<2019; i++) {
      await getData(url_base+i).then((data) => {
        let tempStack = {};
        for (const code of baseCode) tempStack[code]=0.0;
        let defRec = rDim=='prov'? data['province'] : data['city'];
        let region = isCodeExists(cd, defRec, rDim);

        if (region) {
          for (const _class of region['class'])

            tempStack[_class[iprBase]]+=parseFloat(_class['total']).toFixed(2);
        }
        console.log(tempStack)
        tempStack["year"]=i;
        tempStacks.push(tempStack);
      }).catch(err => {
          let tempStack = {};
          for (const code of baseCode) tempStack[code]=0.0;
          tempStack["year"]=i;
          tempStacks.push(tempStack);
      });
      if (i==2018) await sleep(1); //to stop 18/19 fetched items problems
    }
    let defReg = new model.OverTime();
    tempConfig = {primaryKey: 'year', groups: []};
    tempStacks = tempStacks.filter((x) => x["year"]>=parseInt(yr[0]) && x["year"]<=parseInt(yr[1]));
    for (const code of baseCode) {
      if (hid.includes(code)) {
        for (let i=0; i<tempStacks.length; i++) tempStacks[i][code]=0;
      }
      tempConf={
        key: code,
        label: iDim=='trd'? code : getIPR(code, iDim),
        fill: getColor(code,iDim)
      }
      tempConfig.groups.push(tempConf);
    }
    defReg.config = tempConfig;
    defReg.stacksReg = tempStacks;
    defReg["vtype"]='otv';
    res.json(defReg)
    return;
  } else if (fc == 'ipr') {
    var tempStacks = [];
    let baseCode = regBases['island'];
    for (let i=2000; i<2019; i++) {
      await getData(url_base+i).then((data, err) => {
        let tempStack = {};
        for (const code of baseCode) tempStack[code]=0.0;
        if (!err) {
          let defRec = data['island'];
          for (const _island of defRec) {
            total = isIPRExists(cd, _island['class'], iDim);
            if (total>0) tempStack[_island['id_island']]+=parseFloat(total).toFixed(2);
          }
        }
        tempStack["year"]=i;
        tempStacks.push(tempStack);
      }).catch(err => {
        let tempStack = {};
        for (const code of baseCode) tempStack[code]=0.0;
        tempStack["year"]=i;
        tempStacks.push(tempStack);
      });
      if (i==2018) await sleep(1); //to stop 18/19 fetched items problems
    }
    let defReg = new model.OverTime();
    tempConfig = {primaryKey: 'year', groups: []};
    tempStacks = tempStacks.filter((x) => x["year"]>=parseInt(yr[0]) && x["year"]<=parseInt(yr[1]));
    for (const code of baseCode) {
      if (hid.includes(code)) {
        for (let i=0; i<tempStacks.length; i++) tempStacks[i][code]=0;
      }
      tempConf={
        key: code,
        label: getIsland(code),
        fill: getRegionColor(code)
      }
      tempConfig.groups.push(tempConf);
    }
    defReg.config = tempConfig;
    defReg.stacksIpr = tempStacks;
    defReg["vtype"]='otv';
    res.json(defReg)
    return;
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
      let classBase = getIPR(_class[iprBase], iDim)
      let color = getColor(_class[iprBase], iDim)
      var child = {}        
      child["id"]=classBase;
      child["label"]=classBase;
      child["fill"]=color;
      child["children"]=[];
      for(const _childClass of _class['class2']) {
        let classChild = getIPR(_childClass[iprChild], iDim);
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
        defReg.children = defReg.children.filter((item) => item.fill != getColor(x, iDim));
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
    //set up variables
    let defRec = rDim=='prov'? data['province'] : data['city'];
    let rKey = getRegionKey(rDim);
    let defReg = new model.TreeMap();
    defReg.id = "dfr";
    defReg.label = "dfr";
    defReg.children = [];
    var total = 0;
    for (const _region of defRec) {
      let _total = isIPRExists(cd, _region['class'], iDim);
      if (_total>0) {
        total+=_total;
        let island_id = getIslandId(_region[rKey], rDim)
        let grandchild = {}
        let region = getRegion(_region[rKey], rDim)
        grandchild["id"]=region;
        grandchild["label"]=region;
        grandchild["tooltipContent"]=region;
        grandchild["size"]=_total*100;
        if (defReg.children.length==0) {
          let child = {}
          let island = getIsland(island_id);
          child['id'] = island;
          child["label"] = island;
          child["fill"] = getRegionColor(island_id)
          child["children"]=[];
          child["children"].push(grandchild);
          defReg.children.push(child);
        } else {
          let found = false;
          index = defReg.children.findIndex(x => x.id==getIsland(island_id));
          if (index>=0) {
            defReg.children[index]['children'].push(grandchild);
          } else {
            let child = {}
            let island = getIsland(island_id);
            child['id'] = island;
            child["label"] = island;
            child["fill"] = getRegionColor(island_id)
            child["children"]=[];
            child["children"].push(grandchild);
            defReg.children.push(child);
          }
        }
      }
    }
    for (const _child of defReg.children) {
      for (const _grandchild of _child['children']) {
        _grandchild["size"]=parseFloat( _grandchild["size"]/total).toFixed(2);
      }
    }
    //filter treemap by hide
    let iprBase = getIPRBase(iDim)
    if (hid.length >= 1 && !hid.includes('')) {
      for (var x of hid) {
        defReg.children = defReg.children.filter((item) => item.fill != getRegionColor(x));
        for (const _island of data['island']) {
          if (x==_island['id_island'].toString()) {
            index = _island['class'].findIndex(z => z[iprBase]==cd);
            if (index>=0) total-=_island.class[index]['total'];
          }
        }
      }
    }
    defReg["vtype"]='tmv';
    defReg["total_shown"]=total.toFixed(2);
    res.json(defReg);
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
          //label: getIPR(ptCd, iDim),
          color: getColor(code,iDim),
          labelColor: getColor(code,iDim),
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
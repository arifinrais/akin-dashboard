var resources = require('../providers/resourceProvider');
var model = require('../providers/modelProvider');
var axios = require('axios');

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

function getCity(code) {
    return resources.CityCode[code];
}

function getProvince(code) {
    return resources.ProvinceCode[code];
}

function getPatent(code) {
    return resources.PatentCode[code];
}

function getGradient(colors, range, end) {
    let numOfPoints = colors.length-1;
    let step = range/numOfPoints;
    let start = end-range
    var gradient = []
    for (const color of colors) {
        var rgb = hexToRgb(color)
        gradient.push([start, rgb]);
        start+=step;
    }
    return gradient;
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function getColorBetween(color1, color2, weight) {
    w1 = 1-weight;
    w2 = weight;
    return rgbToHex(Math.round(color1.r * w1 + color2.r * w2), Math.round(color1.g * w1 + color2.g * w2), Math.round(color1.b * w1 + color2.b * w2));
}
  
function getColor(gradient, value) {
    for (let i = 0; i < gradient.length-1; i++) {
        if (value==gradient[i][0]) return rgbToHex(gradient[i][1].r, gradient[i][1].g, gradient[i][1].b);
        if (value==gradient[i+1][0]) return rgbToHex(gradient[i+1][1].r, gradient[i+1][1].g, gradient[i+1][1].b);

        if (value>gradient[i][0] && value < gradient[i+1][0]) {
            let diff = value-gradient[i][0];
            let step = gradient[i+1][0]-gradient[i][0];
            return getColorBetween(gradient[i][1], gradient[i+1][1], diff/step);
        } 
    }
}

function getIPRChild(iDim) {
    return iDim=='ptn'? 'ipc_class2': iDim=='trd'? 'ncl_class1' : iDim=='pub'? 'kri_class2' : '';
}

function buildRankings(rDim, iDim, yr, data, prevData, res) {
    prevData.sort(function(a, b) {
        var keyA = a.value, keyB = b.value;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    data['kci'].sort(function(a, b) {
        var keyA = a.value, keyB = b.value;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    var i=1, identifier = rDim=='prov'? 'id_province' : rDim=='city' ? 'id_city' : '';
    let defReg = new model.Rankings();
    let range = data['kci'][0]['value']-data['kci'][data['kci'].length-1]['value']
    let gradient = getGradient(resources.ColorRange, range, data['kci'][0]['value'])
    let getRegion = rDim=='prov'? getProvince : rDim=='city' ? getCity : null;
    for (const region of data['kci']) {
        rank = {};
        let prevRanking = prevData.findIndex(x => x[identifier]==region[identifier])+1;
        rank['color']=getColor(gradient, region['value']);
        rank['rank']=i;
        rank['name']=getRegion(region[identifier]);
        rank['index']=region['value'];
        rank['growth']=prevRanking>0? i-prevRanking: null;
        defReg.regList.push(rank);
        i+=1;
    }
    data['ipci'].sort(function(a, b) {
        var keyA = a.value, keyB = b.value;
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
    });
    i=1, identifier = getIPRChild(iDim);
    range = data['ipci'][0]['value']-data['ipci'][data['ipci'].length-1]['value']
    gradient = getGradient(resources.ColorRange, range, data['ipci'][0]['value'])
    getIPR = iDim=='ptn'? getPatent : null; //tar tambahin yang laen
    for (const _class of data['ipci']) {
        rank = {};
        rank['color']=getColor(gradient, _class['value']);
        rank['rank']=i;
        rank['code']=_class[identifier]
        rank['name']=getPatent(_class[identifier]);
        rank['index']=_class['value'];
        defReg.iprList.push(rank);
        i+=1;
    }
    console.log(defReg)
}

exports.rankings = (req, res) => {
    var regdimRec = req.query.regdim;
    var iprdimRec = req.query.iprdim;
    var yearRec = req.query.year;

    var previousData = {};//set to be 5 years earlier
    if (parseInt(yearRec)>2004) {
        getData(req.url_base+(yearRec-5)).then((data, err) => {
            previousData = regdimRec=='prov'? data['province']['kci'] : data['city']['kci'];
        })
    }
    getData(req.url_base+yearRec).then((data, err) => {
        newData = regdimRec=='prov'? data['province'] : data['city'];
        buildRankings(regdimRec, iprdimRec, yearRec, newData, previousData, res)
    })
    return;
}
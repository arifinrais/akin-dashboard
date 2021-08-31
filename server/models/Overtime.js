var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const group = new Schema({
    key: String,
    label: String,
    fill: String
});

const config = new Schema({
    primaryKey: String,
    groups: [group]
});

const datumFocusReg = new Schema({
    year: Number,
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
    F: Number,
    G: Number,
    H: Number,
    Goods: Number,
    Services: Number,
    "100" : Number,
    "140" : Number,
    "200" : Number,
    "260" : Number,
    "340" : Number,
    "410" : Number,
    "500" : Number,
    "550" : Number,
    "580" : Number,
    "630" : Number,
    "660" : Number,
    "710" : Number
});

const datumFocusIpr = new Schema({
    year: Number,
    '0': Number,
    '1': Number,
    '2': Number,
    '3': Number,
    '4': Number,
    '5': Number,
    '6': Number,
});

const stackChartSchema = new Schema({
    stacksReg: [datumFocusReg],
    stacksIpr: [datumFocusIpr],
    config: config,
    vtype: String
});

module.exports = mongoose.model('stackChartSchema', stackChartSchema);
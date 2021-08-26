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
    H: Number
});

const datumFocusIpr = new Schema({
    year: Number,
    A: Number,
    B: Number,
    C: Number,
    D: Number
});

const stackChartSchema = new Schema({
    stacksReg: [datumFocusReg],
    stacksIpr: [datumFocusIpr],
    config: config,
    vtype: String
});

module.exports = mongoose.model('stackChartSchema', stackChartSchema);
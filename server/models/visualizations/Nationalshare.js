var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const point = new Schema({
    x: Number,
    y: Number
});

const line = new Schema({
    coords: [point],
    animationDuration: Number,
    label: String,
    color: String,
    labelColor: String,
    width: Number,
    labelPosition: Object,
    labelAnchor: Object
});

const lineChartSchema = new Schema({
    lines: [line]
});

module.exports = mongoose.model('Linechart', lineChartSchema);
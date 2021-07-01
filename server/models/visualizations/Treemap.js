var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const grandchildSchema = new Schema({
    id: String,
    label: String,
    tooltipContent: String,
    size: Number
});

const childSchema = new Schema({
    id: String,
    label: String,
    fill: String,
    children: [grandchildSchema]
});

const rootSchema = new Schema({
    vtype: String,
    id: String,
    label: String,
    children: [childSchema]
});

module.exports = mongoose.model('Treemap', rootSchema);
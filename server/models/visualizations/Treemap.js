var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const grandchildSchema = new Schema({
    id: String,
    label: String,
    tooltipContent: String,
    children: Number
});

const childSchema = new Schema({
    id: String,
    label: String,
    fill: String,
    children: [grandchildSchema]
});

const rootSchema = new Schema({
    id: String,
    label: String,
    children: [childSchema]
});

module.exports = mongoose.model('Treemap', rootSchema);
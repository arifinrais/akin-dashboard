var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const subccategoryTMVSchema = new Schema({
    id: String,
    label: String,
    tooltipContent: String,
    children: Number
});

const categoryTMVSchema = new Schema({
    id: String,
    label: String,
    fill: String,
    children: [subccategoryTMVSchema]
});

const patentTMVSchema = new Schema({
    id: String,
    label: String,
    children: [categoryTMVSchema]
});

module.exports = mongoose.model('PatentTMV', patentTMVSchema);
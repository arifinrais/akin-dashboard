var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const colorSchema = new Schema({
    A: String,
    B: String,
    C: String,
    D: String,
    E: String,
    F: String,
    G: String,
    H: String
});

const ColorCodeSchema = new Schema({
    dim: String,
    item: [colorSchema]
});

module.exports = mongoose.model('ColorCode', ColorCodeSchema, 'standards');


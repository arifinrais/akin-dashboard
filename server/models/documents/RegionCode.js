var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const regionCodeSchema = new Schema({
    dim: String,
    item: [String]
});

module.exports = mongoose.model('RegionCode', regionCodeSchema, 'standards');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const regRecord = new Schema({
    color: String,
    rank: Number,
    name: String,
    c_index: Number,
    growth: Number
});

const iprRecord = new Schema({
    color: String,
    rank: Number,
    code: String,
    name: String,
    c_index: Number
});

const ListSchema = new Schema({
    regList: [regRecord],
    iprList: [iprRecord]
});

module.exports = mongoose.model('listSchema', ListSchema);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const ctgASchema = new Schema({
    A01: Number,
    A21: Number,
    A22: Number,
    A23: Number,
    A24: Number,
    A41: Number,
    A42: Number,
    A43: Number,
    A44: Number,
    A45: Number,
    A46: Number,
    A47: Number,
    A61: Number,
    A62: Number,
    A63: Number,
    A99: Number,
    total_ctg: Number
});

const ctgBSchema = new Schema({
    B01: Number,
    B02: Number,
    B03: Number,
    B04: Number,
    B05: Number,
    B06: Number,
    B07: Number,
    B08: Number,
    B09: Number,
    B21: Number,
    B22: Number,
    B23: Number,
    B24: Number,
    B25: Number,
    B26: Number,
    B27: Number,
    B28: Number,
    B29: Number,
    B30: Number,
    B31: Number,
    B32: Number,
    B33: Number,
    B41: Number,
    B42: Number,
    B43: Number,
    B44: Number,
    B60: Number,
    B61: Number,
    B62: Number,
    B63: Number,
    B64: Number,
    B65: Number,
    B66: Number,
    B67: Number,
    B68: Number,
    B81: Number,
    B82: Number,
    B99: Number,
    total_ctg: Number
});

const ctgCSchema = new Schema({
	C01: Number,
	C02: Number,
	C03: Number,
	C04: Number,
	C05: Number,
	C06: Number,
	C07: Number,
	C08: Number,
	C09: Number,
	C10: Number,
	C11: Number,
	C12: Number,
	C13: Number,
	C14: Number,
	C21: Number,
	C22: Number,
	C23: Number,
	C25: Number,
	C30: Number,
	C40: Number,
	C99: Number,
    total_ctg: Number
});

const ctgDSchema = new Schema({
	D01: Number,
	D02: Number,
	D03: Number,
	D04: Number,
	D05: Number,
	D06: Number,
	D07: Number,
	D21: Number,
	D99: Number,
    total_ctg: Number
});

const ctgESchema = new Schema({
	E01: Number,
	E02: Number,
	E03: Number,
	E04: Number,
	E05: Number,
	E06: Number,
	E21: Number,
	E99: Number,
    total_ctg: Number
});

const ctgFSchema = new Schema({
	F01: Number,
	F02: Number,
	F03: Number,
	F04: Number,
	F15: Number,
	F16: Number,
	F17: Number,
	F21: Number,
	F22: Number,
	F23: Number,
	F24: Number,
	F25: Number,
	F26: Number,
	F27: Number,
	F28: Number,
	F41: Number,
	F42: Number,
	F99: Number,
    total_ctg: Number
});

const ctgGSchema = new Schema({
	G01: Number,
	G02: Number,
	G03: Number,
	G04: Number,
	G05: Number,
	G06: Number,
	G07: Number,
	G08: Number,
	G09: Number,
	G10: Number,
	G11: Number,
	G12: Number,
	G16: Number,
	G21: Number,
	G99: Number,
    total_ctg: Number
});

const ctgHSchema = new Schema({
	H01: Number,
	H02: Number,
	H03: Number,
	H04: Number,
	H05: Number,
	H99: Number,
    total_ctg: Number
});

const provinceSchema = new Schema({
    A: ctgASchema,
    B: ctgBSchema,
    C: ctgCSchema,
    D: ctgDSchema,
    E: ctgESchema,
    F: ctgFSchema,
    G: ctgGSchema,
    H: ctgHSchema,
    total_prov: Number
});

const citySchema = new Schema({
    A: ctgASchema,
    B: ctgBSchema,
    C: ctgCSchema,
    D: ctgDSchema,
    E: ctgESchema,
    F: ctgFSchema,
    G: ctgGSchema,
    H: ctgHSchema,
    total_city: Number
});

const totalNatSchema = new Schema({
    A: Number,
    B: Number,
    C: Number,
    D: Number,
    E: Number,
    F: Number,
    G: Number,
    H: Number
});

const patentSchema = new Schema({
    year: Number,
    provinces: [provinceSchema],
    cities: [citySchema],
    total_nation: totalNatSchema
});

module.exports = mongoose.model('Patent', patentSchema, 'viz_patent');
const main = {};

main.Patent = require("../models/documents/Patent");
main.PatentNSV = require("../models/visualizations/Nationalshare");
main.PatentOTV = require("../models/visualizations/Overtime");
main.PatentTMV = require("../models/visualizations/Treemap");

module.exports = main;
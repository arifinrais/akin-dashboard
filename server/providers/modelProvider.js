const main = {};

main.Patent = require("../models/documents/Patent");
main.RegionCode = require("../models/documents/RegionCode");
main.PatentCode = require("../models/documents/PatentCode");
main.ColorCode = require("../models/documents/ColorCode");
main.NationalShare = require("../models/visualizations/Nationalshare");
main.OverTime = require("../models/visualizations/Overtime");
main.TreeMap = require("../models/visualizations/Treemap");

module.exports = main;
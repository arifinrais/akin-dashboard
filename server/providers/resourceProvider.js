const main = {};

main.Dictionary = require("../res/dictionary.json");
main.IslandCode = require("../res/stdIsld.json");
main.DevMainCode = require("../res/stdDevm.json");
main.DevEconCode = require("../res/stdDeve.json");
main.ProvinceCode = require("../res/stdProv.json");
main.CityCode = require("../res/stdCity.json");
main.PatentCode = require("../res/stdIpc.json");
main.TrademarkCode = require("../res/stdNcl.json");
main.PublicationCode = require("../res/stdKri.json");
main.ColorRange = require("../res/stdColorRange.json")

main.PatentChooser = require("../res/stdIpcChooser.json");
main.PublicationChooser = require("../res/stdKriChooser.json");
main.TrademarkChooser = require("../res/stdNclChooser.json");
main.RegionColorCode = require("../res/stdRegColor");
main.PatentColorCode = require("../res/stdPtnColor.json");
main.TrademarkColorCode = require("../res/stdTrdColor.json");
main.PublicationColorCode = require("../res/stdPubColor.json");

module.exports = main;
var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var FundBasicInfo = new Schema({
    id: ObjectId,
    dwjz: String, //单位净值
    gszzl: String, //涨跌幅（百分比）
    time: Date //时间
});

var Fund = new Schema({
    id: ObjectId,
    fundcode: String,
    dwjz: String, //单位净值
    gsz: String, //当前值
    gszzl: String, //涨跌幅（百分比）
    gztime: Date, //时间
    historyRecord: [FundBasicInfo]
});

var FundModel = new Fund("FundModel", Fund);
module.export = FundModel;
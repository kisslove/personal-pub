var http = require('http');
var mongoose = require('mongoose');
var FundModel = require('./model');
mongoose.connect('mongodb://localhost/fund');








module.exports = {
    read: function(id) {

    },
    update: function(model) {

    },
    delete: function(id) {

    },
    create: function(model) {
        return new Promise(function(resolve, reject) {
            var fund = new FundModel(model);
            fund.save(function(err, fund) {
                if (err) reject(err);
                resolve(fund);
            });
        });
    }
};
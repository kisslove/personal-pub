var express = require('express');
var router = express.Router();
var http = require('http');
router.get('/get', function(req, res, next) {
    if (!req.query.code) {
        res.json({
            data: '',
            message: '参数无效',
            state: 0
        });
    }
    getRemoteFund(req.query.code).then(function(d) {
        res.json({
            data: d,
            message: '获取成功',
            state: 1
        })
    }, function(err) {
        res.json({
            data: '',
            message: err,
            state: 0
        });
    });
});

router.get('/gethistory', function(req, res, next) {
    if (!req.query.code) {
        res.json({
            data: '',
            message: '参数无效',
            state: 0
        });
    }
    getFundHistory(req.query.code).then(function(d) {
        // console.log(d);
        // res.json({
        //     data: d,
        //     message: '获取成功',
        //     state: 1
        // })
    }, function(err) {
        res.json({
            data: '',
            message: err,
            state: 0
        });
    });
});

function getFundHistory(code, page, per, sdate, edate) {
    page = page || 1, per = per || 20;
    return new Promise(function(resolve, reject) {
        http.get(`http://fund.eastmoney.com/f10/F10DataApi.aspx?type=lsjz&code=${code}&page=${page}&per=${per}&sdate=${sdate}&edate=${edate}`, (res) => {
            const statusCode = res.statusCode;
            let error;
            if (statusCode !== 200) {
                error = new Error(`请求失败。\n` +
                    `状态码: ${statusCode}`);
            }
            if (error) {
                res.resume();
                reject(error);
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                console.log(chunk.replace(/(^\s*)|(\s*$)/g, ""));
                //resolve(apidata);
                // eval(chunk);
            });

        }).on('error', (e) => {
            reject(`错误: ${e.message}`);
        });
    })
}

function getRemoteFund(code) {
    return new Promise(function(resolve, reject) {
        http.get(`http://fundgz.1234567.com.cn/js/${code}.js?t=` + Date.now(), (res) => {
            const statusCode = res.statusCode;
            let error;
            if (statusCode !== 200) {
                error = new Error(`请求失败。\n` +
                    `状态码: ${statusCode}`);
            }
            if (error) {
                res.resume();
                reject(error);
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => {
                function jsonpgz(data) {
                    resolve(data);
                }
                eval(chunk);
            });

        }).on('error', (e) => {
            reject(`错误: ${e.message}`);
        });
    })
}

module.exports = router;
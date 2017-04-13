var express = require('express');
var router = express.Router();
var http = require('http');
router.get('/get', function(req, res, next) {
    console.log(req.query.code);
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
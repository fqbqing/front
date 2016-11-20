exports.port = 8868;
exports.directoryIndexes = true;
exports.documentRoot = __dirname;

// exports.proxyMap = {
//     '127.0.0.1:8848': '172.17.xxx.xxx:8080'
// };

var mockup = require('bat-ria-tool/mockup');
var upload = require('bat-ria-tool/upload');
var cors = require('bat-ria-tool/cors');
var page = require('bat-ria-tool/page');

// var DEV_SERVER = 'adminwzg.babamaiche.com';
var DEV_SERVER = 'admintest.babamaiche.com:8888';
// var DEV_SERVER = 'malllsy.babamaiche.com:8866';
exports.proxyMap = {
    'admin.chedamai.com:8868': DEV_SERVER
};
exports.overrideProxyRequestHeader = function (header) {
    header.host = DEV_SERVER;
};

exports.getLocations = function () {
    return [
        {
            location: function(request) {
                return /\/$/.test(request.pathname);
            },
            handler: home('index.html')
        },
        {
            location: /^\/redirect-local/,
            handler: redirect('redirect-target', false)
        },
        {
            location: /^\/redirect-remote/,
            handler: redirect('http://www.baidu.com', false)
        },
        {
            location: /^\/redirect-target/,
            handler: content('redirectd!')
        },
        {
            location: '/empty',
            handler: empty()
        },
        {
            location: /\.css($|\?)/,
            handler: [
                autocss()
            ]
        },
        {
            location: /\.less($|\?)/,
            handler: [
                file(),
                less()
            ]
        },
        {
            location: /\.styl($|\?)/,
            handler: [
                file(),
                stylus()
            ]
        },
        {
            location: upload.getLocation(),
            handler: upload.getHandlers()
        },
        {
            location: mockup.getLocation(),
            handler: mockup.getHandlers()
        },
        {
            location: cors.getLocation(),
            handler: cors.getHandlers()
        },
        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};

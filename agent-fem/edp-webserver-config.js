/**
 * @file WebServer 配置
 * @author edpx-mobile
 */

// 端口
exports.port = 8850;

// 网站根目录
exports.documentRoot = process.cwd();

// 当路径为目录时，是否显示文件夹内文件列表
exports.directoryIndexes = false;

var vueify = require('edp-webserver-vue');

var LessPluginAutoPrefix = require('less-plugin-autoprefix');
var autoprefixPlugin = new LessPluginAutoPrefix({
    browsers: [
        'ios >= 6',
        'android >= 4.0'
    ]
});

var mockup = require('bat-ria-tool/mockup');
var upload = require('bat-ria-tool/upload');
var cors = require('bat-ria-tool/cors');

//var babel = require('vueify/lib/compilers/babel');

var DEV_SERVER = 'agent-ybl.babamaiche.com';

exports.proxyMap = {
    //'dev.yijiamaiche.com:8850': DEV_SERVER
    '192.168.30.110:8850': DEV_SERVER,
    'localhost:8850': DEV_SERVER
};
exports.overrideProxyRequestHeader = function (header) {
    header.host = DEV_SERVER;
};

/* handlers
 * 支持expressjs的path的写法，可以通过request.parameters来获取url中的参数
 * 如:
 *  {
 *      location: '/lib/:filename',
 *      handler: function(context) {
 *          console.log(context.request.parameters);
 *      }
 *  }
 *
 * 如果访问http://127.0.0.1:8848/lib/config.js
 *  handler将打印出{"filename": "config.js"}
 */
var fs = require('fs');
var path = require('path');
exports.getLocations = function () {
    return [
        {
            location: function (request) {
                var path = request.pathname;
                return !/\./.test(path) && !/^\/api/.test(path);
            },
            handler: [
                //home('index.html'),
                function (context) {
                    // context.request.pathname = '/index.html';
                    var f = path.join(exports.documentRoot, '/index.html');
                    var content = fs.readFileSync(f, 'utf-8');
                    content = content.replace(/\[__CDN__\]/g, '');
                    context.content = content;
                    context.start();
                },
                //file(),
                // 推荐使用 Chrome 开发者工具调试页面
                // 如需单独调试 Android 4.4- 设备，可启用 Weinre 相关配置
                //weinre({port: 8889}),
                livereload()
            ]
        },
        //{
        //    location: /^[^\?]+?\.css($|\?)/,
        //    handler: [
        //        autostylus({
        //            stylus: epr.stylus,
        //            use: epr.stylusPlugin
        //        })
        //    ]
        //},
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
                less({
                    plugins: [autoprefixPlugin]
                })
            ]
        },
        {
            location: /^\/src\/[^\?]+?\.tpl\.html\.js($|\?)/,
            handler: [
                html2js()
            ]
        },
        {
            location: /^\/src\/[^\?]+?\.vue\.js($|\?)/,
            handler: [
                vueify()
            ]
        },
        /*
        {
            location: /\.js($|\?)/,
            handler: [
                function (context) {
                    if (!/\.es6\.js/g.test(context.request.pathname)) {
                        var f = path.join(exports.documentRoot, context.request.pathname);
                        var content = fs.readFileSync(f, 'utf-8');
                        context.content = content;
                        context.start();
                    }
                    else {
                        var pathname = context.request.pathname.replace(/\.js/, '');
                        var f = path.join(exports.documentRoot, pathname);
                        var content = fs.readFileSync(f, 'utf-8');
                        babel(content, function (error, code) {
                            if (!error) {
                                context.header['content-type'] = 'text/javascript; charset=utf-8';
                                code += '\nmodule.exports = module.exports.default;';
                                context.content = 'define(function(require, exports, module){\n' + code + '\n});';
                                context.start();
                            }
                        })
                    }
                }
            ]
        },
        */
        {
            location: /\.md($|\?)/,
            handler: [
                markdown()
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
                // weinre({port: 8889}),
                livereload(),
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

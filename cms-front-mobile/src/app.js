/**
 * @file app
 * @author ()
 */

define(function (require) {


    var Vue = require('vue');
    var Resolver = require('saber-promise');
    var firework = require('saber-firework');
    var loading = require('ui/loading');
    var $ = require('zepto');

    // 提前预加载,方便自动合并到app.js中
    var api = require('common/config').api;

    var constants = require('common/constants');

    /**
     * Basic Console Compatibility
     */
    window.console = window.console || {};
    console.log = console.log || function () {};
    console.debug = console.debug || function () {};
    console.info = console.info || function () {};
    console.warn = console.warn || function () {};
    console.error = console.error || function () {};

    // Get a regular interval for drawing to the screen
    window.requestAnimFrame = (function (callback) {
        return window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimaitonFrame ||
            function (callback) {
                window.setTimeout(callback, 1000/60);
            };
    })();

    require( [ 'saber-matchmedia' ], function( matchMedia ) {
        var mql = matchMedia( 'screen and (orientation: landscape)' );

        function orientationHandler(matches) {
            //document.body.style.background = matches ? 'red' : 'blue';
            if (matches) {
                $('body').addClass('orientation-landscape');
            }
            else {
                $('body').removeClass('orientation-landscape');
            }
        }
        mql.addListener(function(res) {
            orientationHandler(res.matches);
        });
        orientationHandler(mql.matches);
    });

    // 对ajax的二次封装， api自动转换
    var ajax = require('common/hook/ajax');
    // 对Model进行扩展
    require('common/patch/mvc');
    // 针对etpl添加变量调节器
    require('common/hook/etpl');
    // 添加路由过滤器
    require('common/hook/filter');
    // Vue扩展，提供全局过滤器、方法等
    require('common/hook/xvue');

    // 提前加载模板加载器
    require('./tpl');

    require('saber-viewport/transition/fadeInOut');

    // 预加载Vue组件
    require('common/vue/component');

    var user = require('common/user');

    var router = require('saber-router');
    router.controller(require('saber-router/controller/popstate'));

    if (constants.RUN_ENV === 'dev') {
        // Only For Debug
        // 关闭Promise的异常捕获，方便调试
        Resolver.disableExceptionCapture();
        Vue.config.debug = true;
    }

    // saber-firework全局配置信息
    var config = {
        // 配置index文件名称
        index: 'index',
        // 根路径
        //root: '/m',
        // 公共模板
        template: require('common/common.tpl.html'),
        viewport: {
            resetScroll: true,
            duration: 0.3,
            transition: 'fadeInOut'
        },
        router: router
    };

    // 加载路由配置
    firework.load(require('./config'));

    firework.on('afterload', function (cur, prev) {
        var action = cur.action;
        // 关闭HUD指示层
        //loading.hide();
    });

    firework.on('beforeload', function (cur, prev) {
        var action = cur.action;
        // 打开HUD指示层
        //loading.show();
        // 支持通过action.config的title字段修改页面title
        firework.emit('documenttitlechange', action);
        window.scrollTo(0, 0);
    });

    ajax.on('beforeRequestSend', function (opt) {
        if (opt.loading) {
            loading.show();
        }
    });

    ajax.on('afterRequestSend', function (opt) {
        if (opt.loading) {
            loading.hide();
        }
    });

    /**
     * 全局手动触发修改document.title
     */
    firework.on('documenttitlechange', function (action) {
        if (action.title) {
            document.title = action.title;
        }
        else {
            document.title = '车大卖';
        }
        refreshWeixinTitle();
    });

    // hack of weixin browser for `document.title`
    function refreshWeixinTitle() {
        var ifr = document.createElement('iframe');
        ifr.src = require.toUrl('common/images/blank.png');
        ifr.width = 0;
        ifr.height = 0;

        ifr.addEventListener('load', function () {
            setTimeout(function () {
                document.body.removeChild(ifr);
            }, 0);
        }, false);

        document.body.appendChild(ifr);
    }

    // 启用统计功能
    var track = require('saber-track').create();
    track.includeAll();
    if (/^chedamai\.babamaiche\.com$/.test(location.host) || /^s\.chedamai\.cn/.test(location.host)) {
        // 使用百度统计
        track.use('baidu').setAccount('331ad1b276d2b89183e16fdcb19db4ad');
    }
    else {
        // 使用`console`输出
        track.use('console');
    }
    track.start();

    function extend(target, src) {
        for (var key in src) {
            if (src.hasOwnProperty(key)) {
                target[key] = src[key];
            }
        }
    }

    return {
        init: function (opt) {
            opt = opt || {};
            extend(config, opt);
            if (window.gSession) {
                user.init(window.gSession);
            }
            // 启动应用
            api.constants().then(function (data) {
                extend(constants, data);
                firework.start('viewport', config);
            });
            //api.user({}, {
            //    loading: false
            //}).then(function (info) {
            //    user.init(info);
            //    return user;
            //}).always(function () {
            //    // 启动应用
            //    firework.start('viewport', config);
            //});
        }
    };
});

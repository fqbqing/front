/**
 * Created by lifayu on 16/1/20.
 */
define(function (require) {

    var Vue = require('vue');
    var u = require('underscore');

    var env = require('saber-env');

    var constants = require('../constants');

    var $ = require('zepto');

    /**
     * 当变量不存在时指定默认值
     */
    Vue.filter('dft', function (value, dft) {
        return value || dft;
    });

    Vue.filter('static', function (path) {
        return require.toUrl(path);
    });

    Vue.filter('date', function (value, formatrer) {
        var fmt = formatrer || 'YYYY-MM-DD HH:mm:ss';
        value = +value;
        if (value < 1000000000000) {
            value *= 1000;
        }
        if (value > 2000000000000) {
            return '';
        }
        if (isNaN(value)) {
            return '';
        }
        var date = new Date(value);
        var o = {
            "M+": date.getMonth() + 1,               //月份
            "D+": date.getDate(),                    //日
            "H+": date.getHours(),                   //小时
            "m+": date.getMinutes(),                 //分
            "s+": date.getSeconds(),                 //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds()             //毫秒
        };
        if (/(Y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    });

    /**
     * CDN域名拼接，如果是图片服务，需要指定`style`参数
     */
    Vue.filter('cdn', function (value, style) {
        var url = '';
        if (/^http[s]*:\/\//g.test(value)) {
            url = value;
        }
        else {
            url = constants.CDN_URL + value;
        }
        if (style) {
            url += style;
        }
        return url;
    });

    Vue.transition('stagger', {
        stagger: function (index) {
            // 每个过渡项目增加 50ms 延时
            // 但是最大延时限制为 300ms
            return Math.min(300, index * 50);
        }
    });

    Vue.transition('fade', {
        css: false,
        enter: function (el, done) {
            // 元素已被插入 DOM
            // 在动画结束后调用 done
            $(el)
                .css('opacity', 0)
                .animate({ opacity: 1 }, 500, done);
        },
        enterCancelled: function (el) {
            $(el).stop();
        },
        leave: function (el, done) {
            // 与 enter 相同
            $(el).animate({ opacity: 0 }, 500, done);
        },
        leaveCancelled: function (el) {
            $(el).stop();
        }
    });

    // 混合注入
    Vue.mixin({
        data: function () {
            return {
                env: env
            };
        },
        methods: {
            redirect: function (url, query, options) {
                if (this.context) {
                    this.context.redirect(url, query, options);
                }
            },
            resetRouter: function (url, query, options) {
                if (this.$view) {
                    this.$view.router.reset(url, query, options);
                }
            },
            back: function () {
                window.history.back(-1);  //根据需要可使用history.go(-1);
            },
            href: function (url) {
                window.location.href = url;
            }
        },
        components: {
        }
    });

    return {};
});
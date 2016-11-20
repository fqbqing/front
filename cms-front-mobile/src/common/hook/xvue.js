/**
 * Created by lifayu on 16/1/20.
 */
define(function (require) {

    var consts = require('../constants');
    var Vue = require('vue');
    var u = require('underscore');

    var env = require('saber-env');
    var utils = require('../utils');

    function prepareStatusMap(array) {
        var map = {};
        u.each(array, function (item) {
            var arr = item.value.split('|');
            u.each(arr, function (it) {
                map[it] = item.text;
            });
        });
        return map;
    }

    Vue.filter('order-status-text', function (value) {
        var item = u.find(consts.ORDER_STATUS, function (item) {
            return item.value == value;
        });
        return item ? item.text : '待支付';
    });

    Vue.filter('tuan-order-status-text', function (value) {
        var map = prepareStatusMap(consts.TUAN_STATUS);
        return map[value] || '未知';
    });

    Vue.filter('voucher-order-status-text', function (value) {
        var map = prepareStatusMap(consts.VOUCHER_ORDER_STATUS);
        return map[value] || '未知';
    });

    Vue.filter('voucher-payment-text', function (value) {
        var item = u.find(consts.VOUCHER_PAYMENTS, function (item) {
            return item.value == value;
        });
        return item ? item.text : '未选择支付方式';
    });

    Vue.filter('payment-text', function (value) {
        var item = u.find(consts.PAYMENTS, function (item) {
            return item.value == value;
        });
        return item ? item.text : '未选择支付方式';
    });

    Vue.filter('currency', function (value, bit) {
        bit = bit || 0;
        value = +value;
        if (isNaN(value)) {
            return '无';
        }
        return '￥' + (+value / 100).toFixed(bit);
    });

    Vue.filter('money', function (num) {
        var strOutput = '';
        var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';
        num += '00';
        var intPos = num.indexOf('.');
        if (intPos >= 0) {
            num = num.substring(0, intPos) + num.substr(intPos + 1, 2);
        }
        strUnit = strUnit.substr(strUnit.length - num.length);
        for (var i=0; i < num.length; i++) {
            strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);
        }
        return strOutput.replace(/零角零分$/, '整')
            .replace(/零[仟佰拾]/g, '零')
            .replace(/零{2,}/g, '零')
            .replace(/零([亿|万])/g, '$1')
            .replace(/零+元/, '元')
            .replace(/亿零{0,3}万/, '亿')
            .replace(/^元/, '零元');
    });

    /**
     * 当变量不存在时指定默认值
     */
    Vue.filter('dft', function (value, dft) {
        return value || dft;
    });

    Vue.filter('timeago', function (time) {
        time = +time;
        if (time < 1000000000000) {
            time *= 1000;
        }
        return utils.timeago(time);
    });

    /**
     * 增加`全部选项`
     */
    Vue.filter('support-all-option', function (value) {
        if (Array.isArray(value)) {
            value = [{
                text: '全部',
                value: ''
            }].concat(value);
        }
        return value;
    });

    Vue.filter('rating-class', function (value) {
        if (value) {
            return 'customer-rating-' + value.toLowerCase();
        }
        return 'customer-rating-none';
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

    Vue.filter('activity-types-text', function (value) {
        var item = u.find(consts.ACTIVITY_TYPE, function (item) {
            return item.type == value;
        });
        return item ? item.name : '未知活动';
    });

    Vue.filter('exhibition-order-status-text', function (value) {
        var map = prepareStatusMap(consts.EXHIBITION_STATUS);
        return map[value] || '未知';
    });

    Vue.filter('car-buying-way', function (key) {
        return consts.CAR_BUYING_WAY[key] || '未确定';
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
                if (this.$view) {
                    this.$view.redirect(url, query, options);
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
            },
            /**
             * 用户是否具有某个功能权限
             * @param {string} name 权限名称
             * @return {boolean}
             */
            isUserAllow: function (name) {
                return require('common/user').isAllow(name);
            },
            /**
             * 店是否开通某项功能
             * @param {string} name 权限名称
             * @return {boolean}
             */
            isLevelAllow: function (name) {
                return require('common/level').isAllow(name);
            }
        },
        components: {
            // 非高频组件，不用写到这里了，哪里需要，哪里单独写入
            //'circular': require('../vue/CircularView'),
            //'chartline': require('../vue/ChartLine')
        }
    });

    return {};
});
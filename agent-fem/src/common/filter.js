/**
 * Created by lifayu on 16/7/12.
 */
define(function (require) {

    var consts = require('./constants');
    var Vue = require('vue');

    /**
     * 时间格式化
     * @param {number} value 时间戳
     * @param {*string} formatter 格式化模板
     */
    Vue.filter('date', function (value, formatter) {
        var fmt = formatter || 'YYYY-MM-DD HH:mm:ss';
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
     * 对图片url进行处理,支持CDN
     */
    Vue.filter('image-cdn', function (url, rule) {
        if (!/^(http|https):\/\//.test(url)) {
            url = consts.CDN_URL + url;
        }
        if (rule) {
            return url + '@' + rule;
        }
        return url;
    });

    Vue.filter('customer-domain', function (url) {
        if (!/^(http|https):\/\//.test(url)) {
            return consts.CUSTOMER_URL + url;
        }
        return url;
    });

    /**
     * 判断给定的时间戳是否已经过期
     */
    Vue.filter('is-expired', function (time) {
        time = +time;
        if (time < 1000000000000) {
            time *= 1000;
        }
        return time < (new Date()).getTime();
    });

    /**
     * 将文本中的`\n`换行符替换为`<br>`标签
     * @param {String} text 待处理文本内容
     */
    Vue.filter('nl2br', function (text) {
        return text.replace(/<[^>]+>/g, '').replace(/\n/g, '<br>');
    });

    /**
     * 将优惠券订单状态转换为文字描述
     */
    Vue.filter('voucher-order-status-text', function (status) {
        var str = '<label class="voucher-order-status voucher-order-status-' + status + '">';
        switch (status) {
            case consts.VOUCHER_ORDER_UNUSED:
                str += '未使用';
                break;
            case consts.VOUCHER_ORDER_NOT_PAID:
                str += '未支付';
                break;
            case consts.VOUCHER_ORDER_USED:
                str += '已使用';
                break;
            case consts.VOUCHER_ORDER_SYSTEM_CANCELED:
                str += '系统取消';
                break;
            case consts.VOUCHER_ORDER_USER_CANCELED:
                str += '用户取消';
                break;
            case consts.VOUCHER_ORDER_APPLY_REFUND:
                str += '申请退款';
                break;
            case consts.VOUCHER_ORDER_REFUNDED:
                str += '已退款';
                break;
            default:
                str += '其他';
        }
        str += '</label>';
        return str;
    });

    return {};
});
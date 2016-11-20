/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var $ = require('zepto');
    var u = require('underscore');

    var exports = {};

    /**
     * 判断手机号是否合法
     *
     * @param {string} phone 手机号
     * @return {boolean}
     */
    exports.isPhoneValidate = function (phone) {
        var phoneRegex = /^1[3|4|5|7|8]\d{9}$/;
        return phoneRegex.test(phone);
    };

    exports.isAmountValidate = function (number) {
        return /^\d+(\.\d{1,2})?$/.test(number);
    };

    return exports;
});
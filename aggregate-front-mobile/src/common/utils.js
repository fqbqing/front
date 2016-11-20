/**
 * @file 工具类
 * @author lifayu@babamaiche.com
 * @since 2016-04-12
 */
define(function (require) {
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

    return exports;
});
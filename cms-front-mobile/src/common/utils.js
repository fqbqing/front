/**
 * @file 工具类
 * @author lifayu@babamaiche.com
 * @since 2016-04-12
 */
define(function (require) {
    var exports = {};

    var $ = require('zepto');
    var consts = require('common/constants');

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

    var timeago = function(timestamp) {
        if (timestamp instanceof Date) {
            return inWords(timestamp);
        } else if (typeof timestamp === "string") {
            return inWords(timeago.parse(timestamp));
        } else if (typeof timestamp === "number") {
            return inWords(new Date(timestamp));
        } else {
            return inWords(timeago.datetime(timestamp));
        }
    };
    function inWords(date) {
        return timeago.inWords(distance(date));
    }

    function distance(date) {
        return (new Date().getTime() - date.getTime());
    }
    $.extend(timeago, {
        settings: {
            refreshMillis: 60000,
            allowPast: true,
            allowFuture: false,
            localeTitle: false,
            cutoff: 0,
            autoDispose: true,
            strings: {
                prefixAgo: null,
                prefixFromNow: '从现在开始',
                suffixAgo: '之前',
                suffixFromNow: null,
                seconds: '不到1分钟',
                minute: '大约1分钟',
                minutes: '%d分钟',
                hour: '大约1小时',
                hours: '大约%d小时',
                day: '1天',
                days: '%d天',
                month: '大约1个月',
                months: '%d月',
                year: '大约1年',
                years: '%d年',
                wordSeparator: '',
                numbers: []
            }
        },

        inWords: function(distanceMillis) {
            if (!this.settings.allowPast && ! this.settings.allowFuture) {
                throw 'timeago allowPast and allowFuture settings can not both be set to false.';
            }

            var $l = this.settings.strings;
            var prefix = $l.prefixAgo;
            var suffix = $l.suffixAgo;
            if (this.settings.allowFuture) {
                if (distanceMillis < 0) {
                    prefix = $l.prefixFromNow;
                    suffix = $l.suffixFromNow;
                }
            }

            if (!this.settings.allowPast && distanceMillis >= 0) {
                return this.settings.strings.inPast;
            }

            var seconds = Math.abs(distanceMillis) / 1000;
            var minutes = seconds / 60;
            var hours = minutes / 60;
            var days = hours / 24;
            var years = days / 365;

            function substitute(stringOrFunction, number) {
                var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
                var value = ($l.numbers && $l.numbers[number]) || number;
                return string.replace(/%d/i, value);
            }

            var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
                seconds < 90 && substitute($l.minute, 1) ||
                minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
                minutes < 90 && substitute($l.hour, 1) ||
                hours < 24 && substitute($l.hours, Math.round(hours)) ||
                hours < 42 && substitute($l.day, 1) ||
                days < 30 && substitute($l.days, Math.round(days)) ||
                days < 45 && substitute($l.month, 1) ||
                days < 365 && substitute($l.months, Math.round(days / 30)) ||
                years < 1.5 && substitute($l.year, 1) ||
                substitute($l.years, Math.round(years));

            var separator = $l.wordSeparator || "";
            if ($l.wordSeparator === undefined) { separator = " "; }
            return $.trim([prefix, words, suffix].join(separator));
        },

        parse: function(iso8601) {
            var s = $.trim(iso8601);
            s = s.replace(/\.\d+/,""); // remove milliseconds
            s = s.replace(/-/,"/").replace(/-/,"/");
            s = s.replace(/T/," ").replace(/Z/," UTC");
            s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
            s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
            return new Date(s);
        },
        datetime: function(elem) {
            var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
            return $t.parse(iso8601);
        },
        isTime: function(elem) {
            // jQuery's `is()` doesn't play well with HTML5 in IE
            return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
        }
    });

    exports.timeago = timeago;

    /**
     * 静态资源部署在CDN
     *
     * @param {string} path 资源路径
     * @return {string}
     */
    exports.linkCDN = function (path) {
        return consts.CDN_URL + path;
    };
    return exports;
});
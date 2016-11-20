/**
 * @author lifayu
 * @since 16/7/18
 */
define(function (require) {
    var $ = require('zepto');
    var u = require('underscore');

    var exports = {
        onauthfailed: function () {
            window.location.href = '#!/login';
        }
    };

    var constants = require('./constants');
    var ERROR_CODE = constants.ERROR_CODE;

    function request(url, options) {
        options.url = url;
        var deferred = $.Deferred();
        if (options.silent !== true) {
            $.showPreloader();
        }
        $.ajax(options).then(function (json) {
            if (!json) {
                deferred.reject('服务器未返回任何数据');
            }
            else if (json.success) {
                //if (json.page && json.page.result) {
                //    json.page.data = json.page.result;
                //    delete json.page.result;
                //}
                var data = json.data || json.result || json.page;
                deferred.resolve(data);
                return data;
            }
            else {
                if (json.message && json.message.redirect) {
                    deferred.reject({
                        errorCode: ERROR_CODE.ERROR_NOT_LOGINED,
                        message: json.message
                    });
                }
                else {
                    deferred.reject({
                        errorCode: json.errorCode || ERROR_CODE.ERROR_UNKNOWN,
                        message: json.message
                    });
                }
            }
        }, function (xhr) {
            var status = xhr.status;
            var error = '未知错误';
            if (status === 0) {
                error = '网络请求被拒绝，请检查网络连接';
            }
            else if (status < 200 || (status >= 300 && status !== 304)) { // 服务器没有正常返回
                error = '发送网络请求失败';
            }
            else {
                error = '数据解析失败';
            }
            deferred.reject({
                errorCode: ERROR_CODE.ERROR_UNKNOWN,
                message: error
            });
        }).always(function () {
            if (options.silent !== true) {
                $.hidePreloader();
            }
        });

        deferred.fail(function (result) {
            if (result.errorCode === ERROR_CODE.ERROR_NOT_LOGINED) {
                if (typeof exports.onauthfailed === 'function') {
                    exports.onauthfailed();
                }
                else {
                    $.toast('用户未登录');
                }
            }
            else {
                if (typeof result.message === 'string') {
                    $.toast(result.message);
                }
            }
        });
        return deferred.promise();
    }

    function createRequest(config) {
        var api = {};
        u.each(config, function (url, key) {
            function customRequest(data, options) {
                options = u.extend({
                    type: 'POST',
                    data: data,
                    dataType: 'json'
                }, options || {});
                return request(url, options);
            }
            customRequest.url = url;
            customRequest.get = function (data, options) {
                options = u.extend({
                    type: 'GET',
                    data: data,
                    dataType: 'json'
                }, options || {});
                return request(url, options);
            };
            api[key] = customRequest;
        });
        return api;
    }

    exports.createRequest = createRequest;

    return exports;
});
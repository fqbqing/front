/**
 * @file hook ajax
 * @author jianling(zhaochengyang@baidu.com)
 */

define(function (require) {
    var ajax = require('er/ajax');
//    var util = require('er/util');
    var sio = require('bat-ria/io/serverIO');
    var $ = require('jquery');
    require('jquery.cookie');

//    var batUtil = require('bat-ria/util');

    var u = require('underscore');

    var RELATION_REDIRECT_MAP = {
        'user_customer': '#/user/customer/list~user_company_id=<%- user_company_id %>'
    };

//    function getKey(propertyName, parentKey) {
//        return parentKey ? parentKey + '.' + propertyName : propertyName;
//    }

    ajax.hooks.serializeData = function (prefix, data, contentType) {
        // json格式发送请求时，直接stringify
        if ('application/json' === contentType) {
            return JSON.stringify(data);
        }
        return $.param(data || {});
    };

    ajax.hooks.beforeSend = function (xhr, options) {
        //xhr.setRequestHeader('X-Request-Origin', encodeURIComponent(window.location.href));
//        xhr.setRequestHeader('X-Request-By', 'ERApplication');
        // $.cookie('bce-user-info') && xhr.setRequestHeader('csrftoken', $.cookie('bce-user-info'));
        xhr.setRequestHeader('X-CSRF-Token', $('meta[name=_csrf]').attr('content'));
    };

    // 防止在其他地方已被hook过
    var originBeforeRequestHook = sio.hooks.beforeRequest;

    sio.hooks.beforeRequest = function (options) {

        originBeforeRequestHook && originBeforeRequestHook(options);

    };

    sio.hooks.beforeSuccess = function (data, options) {
        return data;
    };
    sio.hooks.beforeFailure = function (xhr) {
        // var text = xhr.responseText;
        return null; // use DEFAULT_SERVER_ERROR
    };

    sio.hooks.buildRedirectURL = function (redirect) {
        var url = RELATION_REDIRECT_MAP[redirect.type];
        if (url) {
            url = u.template(url)(redirect);
            return url;
        }
    };

    sio.post = function (url, data, options) {
        var defaultOptions = u.extend({
            method: 'POST'
        }, options);

//        options && options.contentType && (defaultOptions.contentType = options.contentType);

        return this.request(url, data, defaultOptions);
    };

    sio.get = function (url, data, options) {
        var defaultOptions = u.extend({
            method: 'GET'
        }, options);
        return this.request(url, data, defaultOptions);
    };
});

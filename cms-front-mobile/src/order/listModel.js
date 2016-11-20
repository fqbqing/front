/**
 * @file
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var api = require('common/config').api;

    var exports = {};

    var pageNo = 1;

    exports.datasource = {
        orders: function (query) {
            pageNo = 1;
            var param = u.extend({
                pageNo: pageNo,
                pageSize: 15
            }, query);
            return api.listOrder(param).then(function (page) {
                return page.result || page.data;
            });
        },
        phone: function (query) {
            return query.phone || ''
        },
        status: function (query) {
            return query.status || 0;
        },
        loading: false
    };

    exports.listOrder = function () {
        var param = u.extend({
            pageNo: ++pageNo,
            pageSize: 15
        }, this.query);
        return api.listOrder(param).then(function (page) {
            return page.result || page.data;
        });
    };

    return exports;
});


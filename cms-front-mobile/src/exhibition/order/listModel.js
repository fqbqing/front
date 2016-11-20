/**
 * @file 
 * @author ()
 */

define(function (require) {
    var u = require('underscore');
    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        api: api,
        listExtraData: function (query) {
            var data = {};
            if (typeof query.claimed !== 'undefined') {
                data.claimed = query.claimed;
            }
            if (typeof query.exhibition_id !== 'undefined') {
                data.exhibition_id = query.exhibition_id;
            }
            return data;
        }
    };

    /**
     * 获取客户的最近一条追踪记录
     * @param {number} id 客户id
     * @return {Promise}
     */
    exports.getLastestCustomerTrack = function (id) {
        return api.getLastestCustomerTrack({
            customer_id: id
        });
    };

    return exports;

});

/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        api: api,
        listExtraData: function (query) {
            var data = {};
            if (typeof query.activity_id !== 'undefined') {
                data.activity_id = query.activity_id;
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

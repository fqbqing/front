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
            if (typeof query.voucher_id !== 'undefined') {
                data.voucher_id = query.voucher_id;
            }
            if (typeof query.activity_id !== 'undefined') {
                data.activity_id = query.activity_id;
            }
            if (typeof query.id !== 'undefined') {
                data.activity_id = query.id;
            }
            if (typeof query.claimed !== 'undefined') {
                data.claimed = query.claimed;
            }
            return data;
        }
    };

    return exports;
});


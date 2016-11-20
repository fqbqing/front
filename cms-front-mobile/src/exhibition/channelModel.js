/**
 * @file 
 * @author ()
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        api: api,
        listExtraData: function (query) {
            return {
                'exhibition_coupon_activity_id': query.exhibition_id
            };
        }
    };

    return exports;



});

/**
 * @file 
 * @author ()
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        exhibition: function (query) {
            return api.getExhibitionById({
                id: query.exhibition_id
            });
        },
        statOrder: function (query) {
            return api.statExhibitionOrder({
                exhibition_coupon_activity_id: query.exhibition_id
            });
        }

    };

    exports.getQRCode = function () {
        return api.getExhibitionShareQRCodeImage({
            id: this.query.exhibition_id
        });
    };

    return exports;
});

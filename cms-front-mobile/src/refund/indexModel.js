/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        refund: function (query) {
            return api.getRefundById({
                id: query.id
            });
        }
    };

    exports.update = function (sign) {
        return api.updageRefundSignature({
            id: this.query.id,
            sign: sign
        });
    };

    return exports;
});

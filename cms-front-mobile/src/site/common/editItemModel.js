/**
 * @file 
 * @author ()
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        keywords: function (query) {
            return query.keywords ? query.keywords : ''
        }
    };

    return exports;

});

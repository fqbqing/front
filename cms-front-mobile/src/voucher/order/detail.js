/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '订单详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.events = {

    };

    return exports;
});

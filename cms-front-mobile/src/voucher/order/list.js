/**
 * @file 
 * @author ()
 */

define(function (require) {

    var u = require('underscore');
    var exports = {
        title: '优惠券订单'
    };

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {

    };

    return exports;
});

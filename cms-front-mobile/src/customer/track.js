/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '今日跟进'
    };

    exports.view = require('./trackView');

    exports.model = require('./trackModel');

    exports.events = {

    };

    return exports;
});

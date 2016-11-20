/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {
        title: '客户管理'
    };

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {
    };

    return exports;
});

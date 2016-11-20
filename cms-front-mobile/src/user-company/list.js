/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {
        'view:finish': function (value) {
            this.emit('finish', value);
        }
    };

    return exports;
});

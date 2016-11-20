/**
 * @file 
 * @author ()
 */

define(function (require) {

    var exports = {};

    exports.view = require('./editItemView');

    exports.model = require('./editItemModel');

    exports.events = {
        'view:finish': function (value) {
            this.emit('finish', value);
        }
    };

    return exports;
});

/**
 * @file 
 * @author ()
 */

define(function (require) {

    var api = require('common/config').api;

    var exports = {};

    exports.datasource = {
        activityTypes: function(){
            return api.activityTypes();
        }
    };

    return exports;

});

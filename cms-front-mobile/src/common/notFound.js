/**
 * @file 
 * @author ()
 */

define(function (require) {

    var config = {};

    config.view = require('./notFoundView');

    config.model = require('./notFoundModel');

    config.events = {
        'complete': function () {
        }
    };

    return config;

});

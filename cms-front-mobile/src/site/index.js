/**
 * @file 
 * @author ()
 */

define(function (require) {

    var config = {
        title: '营销管理系统'
    };

    config.view = require('./indexView');

    config.model = require('./indexModel');

    config.events = {
    };

    return config;
});

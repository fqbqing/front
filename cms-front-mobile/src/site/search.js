/**
 * @file 
 * @author ()
 */

define(function (require) {

    var config = {
        title: '搜索结果'
    };

    config.view = require('./searchView');

    config.model = require('./searchModel');

    config.events = {
    };

    return config;
});

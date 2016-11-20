/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {
        title: '活动详情'
    };

    exports.view = require('./detailView');

    exports.model = require('./detailModel');

    exports.events = {
    };

    return exports;
});


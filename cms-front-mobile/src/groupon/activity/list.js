/**
 * @file 
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {

    var exports = {
        title: '团购列表'
    };

    exports.view = require('./listView');

    exports.model = require('./listModel');

    exports.events = {
        'view:search': function (params) {
            var me = this;
            this.router.reset('/groupon/activity/list', params, {
                noCache: true
            });
        }
    };

    return exports;
});


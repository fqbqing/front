/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./index.tpl.html');

    function parseAwardType(path) {
        return path.match(/^\/award\/(\w+)/)[1];
    }

    exports.route = {
        data: function (transition) {
            var me = this;
        }
    };

    exports.datasource = {
        awardType: function (route) {
            return parseAwardType(route.path);
        }
    };

    exports.vuex = {
        getters: {
        },
        actions: {
        }
    };

    exports.attached = function () {
        $.initScrollFix();
    };

    exports.ready = function () {
    };

    return exports;
});
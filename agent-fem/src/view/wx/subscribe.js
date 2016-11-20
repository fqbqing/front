/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./subscribe.tpl.html');

    exports.route = {
        data: function (transition) {
            transition.next();
        }
    };

    exports.datasource = {
    };

    exports.vuex = {
        getters: {
        },
        actions: {
        }
    };

    exports.methods = {
        backPressed: function () {
            window.history.back();
        }
    };

    exports.data = function () {
        return {
            subscribeImage: require.toUrl('./img/qr.png')
        };
    };

    exports.components = {
    };

    exports.ready = function () {
    };

    return exports;
});
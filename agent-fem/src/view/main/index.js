/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var action = require('vuex/actions');
    var exports = {};

    exports.template = require('./index.tpl.html');

    exports.route = {
        data: function (transition) {
        }
    };

    exports.datasource = {
        statistics: function () {
            return this.$api.statistics();
        }
    };

    exports.vuex = {
        getters: {
            user: function (state) {
                return state.user.value;
            }
        },
        actions: {
        }
    };

    exports.ready = function () {
    };

    return exports;
});
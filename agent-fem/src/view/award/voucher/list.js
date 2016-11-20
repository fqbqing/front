/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        }
    };

    exports.vuex = {
        getters: {
            listData: function (state) {
                return state.listview.data;
            },
            page: function (state) {
                return state.listview.page;
            }
        },
        actions: {
        }
    };

    exports.methods = {
    };

    exports.data = function () {
        return {
        };
    };

    exports.components = {
    };

    exports.ready = function () {
    };

    return exports;
});
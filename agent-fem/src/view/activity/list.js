/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var $ = require('zepto');
    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        },
        canReuse: false
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

    exports.data = function () {
        var me = this;
        var query = {
            type: 2
        };
        if (me.$route.query.organizationId) {
            query.organizationId = me.$route.query.organizationId;
        }
        return {
            query: query
        };
    };

    exports.methods = {
        isExpired: function (time) {
            time = +time;
            if (time < 1000000000000) {
                time *= 1000;
            }
            return time < (new Date()).getTime();
        }
    };

    exports.components = {
    };

    exports.attached = function () {
        $.initScrollFix();
    };

    exports.ready = function () {

    };

    return exports;
});
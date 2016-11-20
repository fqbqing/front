/**
 * Created by lifayu on 16/7/11.
 */
define(function (require) {

    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./index.tpl.html');

    exports.route = {
        data: function (transition) {
            transition.next();
        }
    };

    exports.datasource = {
        statistics: function () {
            return this.$api.statistics();
        }
    };

    exports.vuex = {
        getters: {
            listData: function (state) {
                return state.listview.data;
            },
            user: function (state) {
                return state.user.value;
            }
        },
        actions: {
            logoutUser: action.logout
        }
    };

    exports.methods = {
        logout: function () {
            var me = this;
            $.confirm('您确定要退出登录吗?', function () {
                me.logoutUser().then(function () {
                    me.$router.replace('/login');
                });
            });
        }
    };

    exports.data = function () {
        return {
        };
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
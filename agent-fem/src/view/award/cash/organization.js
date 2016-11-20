/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./organization.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        },
        canReuse: false
    };

    exports.datasource = {
        stat: function () {
            return this.$api.cashAward();
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
        withdraw: function (oid) {
            this.$router.go({
                path: '/award/cash/withdraw',
                query: {
                    organizationId: oid
                }
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
        $.initScroller({
            type: 'auto'
        });
    };

    exports.ready = function () {
    };

    return exports;
});
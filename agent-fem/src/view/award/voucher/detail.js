/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');

    var exports = {};

    exports.template = require('./detail.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        }
    };

    exports.datasource = {
        order: function (route) {
            return this.$api.getVoucherOrderById({
                orderId: route.params.orderId
            });
        }
    };

    exports.vuex = {
        getters: {
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

    exports.ready = function () {
    };

    return exports;
});
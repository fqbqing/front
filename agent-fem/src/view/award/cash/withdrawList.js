/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');
    var consts = require('common/constants');

    var exports = {};

    exports.template = require('./withdrawlist.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
            transition.next({
                curStatus: '',
                FILTER_STATUS: [{
                    text: '全部',
                    value: ''
                }, {
                    text: '申请中',
                    value: consts.WITHDRAWING
                }, {
                    text: '已提现',
                    value: consts.WITHDREW
                }, {
                    text: '已驳回',
                    value: consts.WITHDRAW_CANCELED
                }]
            });
        }
    };

    exports.datasource = {
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
        filterByStatus: function (status) {
            this.curStatus = status;
            this.$refs.listview.search({
                status: status
            });
        }
    };

    exports.components = {
    };

    exports.ready = function () {
    };

    return exports;
});
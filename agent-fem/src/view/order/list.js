/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');
    var $ = require('zepto');
    var consts = require('common/constants');

    var exports = {};

    exports.template = require('./list.tpl.html');

    exports.route = {
        data: function (transition) {
            var me = this;
        }
    };

    exports.datasource = {
        curStatus: '',
        FILTER_STATUS: [{
            text: '全部',
            value: ''
        }, {
            text: '审核中',
            value: consts.AWARD_STATUS_NOT_AUDIT
        }, {
            text: '审核通过',
            value: consts.AWARD_STATUS_AUDITED
        }, {
            text: '已驳回',
            value: consts.AWARD_STATUS_REFUSED
        }]
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
        },
        showOrder: function (order) {
            this.order = order;
            this.$nextTick(function () {
                $.openPanel('.order-list-panel');
            });
        }
    };

    exports.data = function () {
        return {
            order: null
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
/**
 * Created by lifayu on 16/7/13.
 */
define(function (require) {
    var action = require('vuex/actions');
    var utils = require('utils');
    var $ = require('zepto');

    var exports = {};

    exports.template = require('./withdraw.tpl.html');

    exports.route = {
        data: function (transition) {
            transition.next({
                amount: '',
                remark: ''
            });
        }
    };

    exports.datasource = {
        stat: function (route) {
            return this.$api.cashAward({
                organizationId: route.query.organizationId
            });
        },
        organization: function (route) {
            return this.$api.getOrganizationById({
                organizationId: route.query.organizationId
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
        apply: function () {
            var me = this;
            if (!utils.isAmountValidate(this.amount)) {
                $.toast('金额不合法');
                return;
            }
            if (this.stat.toWithdraw/100 < +this.amount) {
                $.toast('金额不足, 您最多只能提现' + this.stat.toWithdraw/100 + '元');
                return;
            }
            this.$api.applyCashWithdraw({
                organizationId: this.organization.id,
                amount: this.amount * 100,
                remark: this.remark
            }).then(function () {
                $.toast('申请提现成功');
                me.$router.replace('/award/cash/withdraw-list');
            });
        }
    };

    exports.ready = function () {
    };

    return exports;
});
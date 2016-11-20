/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./../config');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationWeixinpayDetailModel() {
        BaseModel.apply(this, arguments);
    }
    OrganizationWeixinpayDetailModel.prototype.updateAccountStatus = function () {
        return api.updateAccountStatus({
            type: config.WEIXIN_PAY_ACCOUNT,
            status: this.get('payAccount').account.status == config.PAY_ACCOUNT_ENABLE ? config.PAY_ACCOUNT_DISABLE : config.PAY_ACCOUNT_ENABLE
        });
    };

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayDetailModel.prototype.datasource = {
        payAccount: function (model) {
            return api.getPayAccount({
                type: config.WEIXIN_PAY_ACCOUNT
            });
        },
        weixinApplyInfo: function (model) {
            return api.getWeixinApplyInfo().then(function (data) {
                model.set('opening', !!data);
                return data;
            });
        }
    };


    // return模块
    require('er/util').inherits(OrganizationWeixinpayDetailModel, BaseModel);
    return OrganizationWeixinpayDetailModel;
});

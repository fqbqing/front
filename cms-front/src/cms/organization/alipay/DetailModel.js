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
    function OrganizationAlipayDetailModel() {
        BaseModel.apply(this, arguments);
    }


    OrganizationAlipayDetailModel.prototype.updateAccountStatus = function () {
        return api.updateAccountStatus({
            type: config.ALI_PAY_ACCOUNT,
            status: this.get('payAccount').account.status == config.PAY_ACCOUNT_ENABLE ? config.PAY_ACCOUNT_DISABLE : config.PAY_ACCOUNT_ENABLE
        });
    };

    /**
     * @inheritDoc
     */
    OrganizationAlipayDetailModel.prototype.datasource = {
        payAccount: function (model) {
            return api.getPayAccount({
                type: config.ALI_PAY_ACCOUNT
            });
        }
    };


    // return模块
    require('er/util').inherits(OrganizationAlipayDetailModel, BaseModel);
    return OrganizationAlipayDetailModel;
});

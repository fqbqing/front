/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./config');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationPayModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    OrganizationPayModel.prototype.datasource = {
        aliPayAccount: function (model) {
            return api.getPayAccount({
                type: config.ALI_PAY_ACCOUNT
            });
        },
        weixinPayAccount: function (model) {
            return api.getPayAccount({
                type: config.WEIXIN_PAY_ACCOUNT
            });
        },
        weixinApplyInfo: function (model) {
            return api.getWeixinApplyInfo();
        }
    };

    OrganizationPayModel.prototype.toggleService = function (e) {
        return api.enableService({
            status: e.status
        });
    };
    OrganizationPayModel.prototype.testPay = function () {
        return api.testPay();
    };
    // return模块
    require('er/util').inherits(OrganizationPayModel, BaseModel);
    return OrganizationPayModel;
});

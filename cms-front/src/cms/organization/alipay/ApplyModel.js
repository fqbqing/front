/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./../config');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationAlipayModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
         this.formRequester = api.getPayAccount;

        // 表单提交请求器 (*)
         this.submitRequester = api.ennableAlipay;
    }


    /**
     * @inheritDoc
     */
    OrganizationAlipayModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    OrganizationAlipayModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id'),
            type: config.ALI_PAY_ACCOUNT
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationAlipayModel.prototype.getExtraData = function () {
        return {};
    };

    // return模块
    require('er/util').inherits(OrganizationAlipayModel, FormModel);
    return OrganizationAlipayModel;
});

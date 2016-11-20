/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationWeixinpayApplyModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getWeixinApplyInfo;

        // 表单提交请求器 (*)
         this.submitRequester = api.ennableWeixinpay;
    }


    /**
     * @inheritDoc
     */
    OrganizationWeixinpayApplyModel.prototype.datasource = {
    };


    /**
     * @inheritDoc
     */
    OrganizationWeixinpayApplyModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationWeixinpayApplyModel.prototype.getExtraData = function () {

    };

    // return模块
    require('er/util').inherits(OrganizationWeixinpayApplyModel, FormModel);
    return OrganizationWeixinpayApplyModel;
});

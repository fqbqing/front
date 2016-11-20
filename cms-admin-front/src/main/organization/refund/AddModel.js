/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var user = require('bat-ria/system/user');
    var utils = require('common/utils');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationRefundAddModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.getRefundInfo;

        // 表单提交请求器 (*)
        this.submitRequester = api.addRefund;
    }


    /**
     * @inheritDoc
     */
    OrganizationRefundAddModel.prototype.datasource = {
        visitor_name: function() {
            var visitor = user.visitor;
            return visitor ? visitor.name : '';
        }
    };


    /**
     * @inheritDoc
     */
    OrganizationRefundAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationRefundAddModel.prototype.getExtraData = function () {
        return {
            organization_id: this.get('organization_id')
        };
    };

    OrganizationRefundAddModel.prototype.filterData = function(data) {
        data.amount = utils.roundAmount(data.amount);
        return data;
    };

    // return模块
    require('er/util').inherits(OrganizationRefundAddModel, FormModel);
    return OrganizationRefundAddModel;
});

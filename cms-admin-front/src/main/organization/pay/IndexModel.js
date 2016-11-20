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
    function OrganizationPayIndexModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.getWeixinApplyInfo;

        // 表单提交请求器 (*)
         this.submitRequester = api.updateWeixinAccount;
    }


    /**
     * @inheritDoc
     */
    OrganizationPayIndexModel.prototype.datasource = {
        aliPayAccount: function (model) {
            return api.getPayAccount({
                organization_id: model.get('organization_id'),
                type: 1
            });
        },
        weixinPayAccount: function (model) {
            return api.getPayAccount({
                organization_id: model.get('organization_id'),
                type: 2
            });
        },
        weixinApplyInfo: function (model) {
            return api.getWeixinApplyInfo({
                organization_id: model.get('organization_id')
            }).then(function (data) {
                model.set('opening',!!data);
                return data;
            });
        }
    };


    /**
     * @inheritDoc
     */
    OrganizationPayIndexModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationPayIndexModel.prototype.getExtraData = function () {
        return {
            organization_id: this.get('organization_id')
        };
    };

    // return模块
    require('er/util').inherits(OrganizationPayIndexModel, FormModel);
    return OrganizationPayIndexModel;
});

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
    function OrganizationInitModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;

        // 表单提交请求器 (*)
        this.submitRequester = api.initOrganization;
    }


    /**
     * @inheritDoc
     */
    OrganizationInitModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    OrganizationInitModel.prototype.getDefaultArgs = function () {
        return {
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationInitModel.prototype.getExtraData = function () {
        return {};
    };

    // return模块
    require('er/util').inherits(OrganizationInitModel, FormModel);
    return OrganizationInitModel;
});

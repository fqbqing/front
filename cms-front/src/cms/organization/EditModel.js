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
    function OrganizationEditModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
         this.formRequester = api.getOrganization;

        // 表单提交请求器 (*)
         this.submitRequester = api.updateOrganization;
    }


    /**
     * @inheritDoc
     */
    OrganizationEditModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    OrganizationEditModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationEditModel.prototype.getExtraData = function () {
        return {
            id: this.get('formData').id
        };
    };
    OrganizationEditModel.prototype.filterData = function(data) {
        data.show_public_customers = data.show_public_customers.toString();
        data.agent_spread = data.agent_spread.join(',');
        return data;
    };
    // return模块
    require('er/util').inherits(OrganizationEditModel, FormModel);
    return OrganizationEditModel;
});

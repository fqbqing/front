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
        this.formRequester = api.getOrganizationById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateOrganization;
    }


    /**
     * @inheritDoc
     */
    OrganizationEditModel.prototype.datasource = null;


    OrganizationEditModel.prototype.updateOrganizationBrands = function (e) {
        return api.updateOrganizationBrands({
            id: this.get('formData').id,
            brandIds: e.brandIds

        })
    };

    /**
     * @inheritDoc
     */
    OrganizationEditModel.prototype.getDefaultArgs = function () {
        return {
            group_id: this.get('organization_id')
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
        data.show_public_customers = data.show_public_customers.join('');
        return data;
    };
    // return模块
    require('er/util').inherits(OrganizationEditModel, FormModel);
    return OrganizationEditModel;
});

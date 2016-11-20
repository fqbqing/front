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
    function OrganizationRoleAddModel() {
        FormModel.apply(this, arguments);

        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getOrganizationRoleById;
            // 表单提交请求器 (*)
            this.submitRequester = api.updateOrganizationRole;
        }
        else{
            // 表单提交请求器 (*)
            this.submitRequester = api.addOrganizationRole;
        }

    }


    /**
     * @inheritDoc
     */
    OrganizationRoleAddModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    OrganizationRoleAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationRoleAddModel.prototype.getExtraData = function () {
        var param = {};
        if(this.get('id')){
            param.id = this.get('id');
        }

        return param;


    };
    OrganizationRoleAddModel.prototype.filterData = function(data){
        data.type = data.type.join('');
        return data;
    }


    // return模块
    require('er/util').inherits(OrganizationRoleAddModel, FormModel);
    return OrganizationRoleAddModel;
});

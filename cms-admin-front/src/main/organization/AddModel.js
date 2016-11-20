/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var cons = require('common/constants');
    var utils = require('common/utils');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationAddModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;

        // 表单提交请求器 (*)
        this.submitRequester = api.addOrganization;
    }
    var me = this;

    /**
     * @inheritDoc
     */
    OrganizationAddModel.prototype.datasource = {
        levelList: function() {
            return api.listLevel().then(function (page) {
                return page.data || page.result;
            });
        }
    };


    /**
     * @inheritDoc
     */
    OrganizationAddModel.prototype.getDefaultArgs = function () {
        return {
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationAddModel.prototype.getExtraData = function () {
        return {};
    };

    OrganizationAddModel.prototype.filterData = function(data) {
        data.level_expire_time = moment().add(data.level_expire_time, 'months').unix();
        data.show_public_customers = data.show_public_customers.join('');
        data.level_id = data.level_id.join('');
        return data;
    };
    // return模块
    require('er/util').inherits(OrganizationAddModel, FormModel);
    return OrganizationAddModel;
});

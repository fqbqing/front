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
    var moment = require('moment');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationLevelEditModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getOrganizationById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateOrganizationLevel;
    }


    /**
     * @inheritDoc
     */
    OrganizationLevelEditModel.prototype.datasource = {
        levelList: function() {
            return api.listLevel().then(function (page) {
                return page.data || page.result;
            });
        }

    };

    /**
     * @inheritDoc
     */
    OrganizationLevelEditModel.prototype.getDefaultArgs = function () {
        return {
            group_id: this.get('organization_id')
        };
    };

    /**
     * @inheritDoc
     */
    OrganizationLevelEditModel.prototype.getExtraData = function () {
        return {
            id: this.get('formData').id
        };
    };
    OrganizationLevelEditModel.prototype.filterData = function(data) {
        data.level_expire_time = moment(data.level_expire_time).unix();
        data.level_id = data.level_id.join('');
        return data;
    };
    // return模块
    require('er/util').inherits(OrganizationLevelEditModel, FormModel);
    return OrganizationLevelEditModel;
});

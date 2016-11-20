/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrganizationStaffListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listUserCompany;
    }


    /**
     * @inheritDoc
     */
    OrganizationStaffListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // OrganizationStaffListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationStaffListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    OrganizationStaffListModel.prototype.getExtraQuery = function () {
        return {
            group_id: this.get('organization_id')
        };
    };

    // return模块
    require('er/util').inherits(OrganizationStaffListModel, ListModel);
    return OrganizationStaffListModel;
});

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
    function OrganizationCustomerListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listCustomer;
    }


    /**
     * @inheritDoc
     */
    OrganizationCustomerListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // OrganizationCustomerListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrganizationCustomerListModel.prototype.defaultArgs = {
        order: 'desc',
        orderBy: 'id',
        pageSize: 15
    };

    OrganizationCustomerListModel.prototype.getExtraQuery = function () {
        var param = {
            organization_id: this.get('organization_id')
        };

        if (this.get('user_company_id')) {
            param.user_company_id = this.get('user_company_id');
        }
        return param;
    };

    OrganizationCustomerListModel.prototype.filterQuery = function (query) {
        return query;
    };
    // return模块
    require('er/util').inherits(OrganizationCustomerListModel, ListModel);
    return OrganizationCustomerListModel;
});

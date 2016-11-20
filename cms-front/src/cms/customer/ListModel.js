/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var constants = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function CustomerListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listCustomer;
    }


    /**
     * @inheritDoc
     */
    CustomerListModel.prototype.datasource = {
        owner_status: 0,
        rating: 0,
        customer_rating: function () {
            return constants.CUSTOMER_RATING_LIST;
        }

    };

    /**
     * @inheritDoc
     */
    // CustomerListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    CustomerListModel.prototype.defaultArgs = {
        order: 'desc',
        orderBy: 'id',
        pageSize: 15
    };

    CustomerListModel.prototype.distribute = function (e) {
        var me = this;
        var data = {
            id: e.id,
            user_company_id: e.user_company_id
        };
        if(!e.cur_user_company_id) {
            //无归属分配
            return api.distributeCustomerPublic(data);
        }else {
            //有归属非配
            return api.distributeCustomer(data);
        }
    };

    // return模块
    require('er/util').inherits(CustomerListModel, ListModel);
    return CustomerListModel;
});

/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var utils = require('common/utils');
    var cons = require('common/constants');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrderListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listOrder;

    }


    /**
     * @inheritDoc
     */
    OrderListModel.prototype.datasource = {
        orderStatus: function () {
            return cons.GOOD_ORDER_STATUS_LIST;
        }
    };

    /**
     * @inheritDoc
     */
    // OrderListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrderListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    /**
     * 默认查询参数
     *
     * 参考{@link ListModel#defaultArgs}属性的说明
     *
     * @return {Object}
     * @protected
     */
    OrderListModel.prototype.prepareQuery = function (query) {
        if (query.status) {
            query.status = query.status.split(',');
        }
        return query;
    };

    OrderListModel.prototype.deleteOrder = function (ids) {
        return api.deleteOrder({
            id: ids
        });
    };

    // return模块
    require('er/util').inherits(OrderListModel, ListModel);
    return OrderListModel;
});

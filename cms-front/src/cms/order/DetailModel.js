/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
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
    function OrderDetailModel() {
        BaseModel.apply(this, arguments);
    }

    /**
     * @inheritDoc
     */
    OrderDetailModel.prototype.datasource = {
        orderInfo: function (model) {
            return  api.getOrderById({
                order_id: model.get('order_id')
            });
        },
        orderStatus: function () {
            return  cons.GOOD_ORDER_STATUS_LIST;
        }
    };
    OrderDetailModel.prototype.editOrder = function (e) {
        return api.editOrder(e);
    };

    // return模块
    require('er/util').inherits(OrderDetailModel, BaseModel);
    return OrderDetailModel;
});

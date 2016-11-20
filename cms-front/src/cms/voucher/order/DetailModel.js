/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherOrderDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    VoucherOrderDetailModel.prototype.datasource = {
        data: [{
            name: 'order',
            retrieve: function (model) {
                return api.getVoucherOrderById({
                    id: model.get('id')
                });
            }
        }, {
            name: 'voucher_orders',
            retrieve: function (model) {
                var order = model.get('order');
                return api.voucherOrderList({
                    activity_id: order.activity.id,
                    customer_id: order.customer.id,
                    pageSize: 100
                }).then(function (pager) {
                    var data = pager.data || pager.result;

                    return u.reject(data, function (item) {
                        return item.id === order.id;
                    });
                });
            }
        }]
    };


    // return模块
    require('er/util').inherits(VoucherOrderDetailModel, BaseModel);
    return VoucherOrderDetailModel;
});

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
    var $ = require('jquery');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherOrderListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.voucherOrderList;
    }


    /**
     * @inheritDoc
     */
    VoucherOrderListModel.prototype.datasource = {
        voucherOrderStatus: function (){
            return constants.ORDER_STATUS_LIST;
        },
        exportUrl: function (model) {
            var param = {
                activity_id: model.get('activity_id') ? model.get('activity_id') : ''
                //exclude: model.get('exclude') ? model.get('exclude') : ''
            };
            if (model.get('status')) {
                param.status = model.get('status');
            }
            if (model.get('phone')) {
                param.phone = model.get('phone');
            }
            if(model.get('category')){
                param.category = model.get('category');
            }
            return $.param(param);
        }
    };

    VoucherOrderListModel.prototype.voucherOrderCheckSale = function (e) {
        var param = {
            cn: e.cn
        };
        if (this.get('category')) {
            param.category = this.get('category');
        }
        return api.voucherOrderCheckSale(param);
    };

    VoucherOrderListModel.prototype.refundOnline = function (order_ids) {
        return api.refundOnline({
            order_ids: order_ids
        });
    };

    VoucherOrderListModel.prototype.refundOffline = function (order_id) {
        return api.refundOffline({
            order_id: order_id
        });
    };
    /**
     * @inheritDoc
     */
    // VoucherOrderListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    VoucherOrderListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    VoucherOrderListModel.prototype.getExtraQuery = function () {
        var query = {};
        var voucher_id = this.get('voucher_id');
        if (voucher_id) {
            query.voucher_id = voucher_id;
        }
        var activity_id = this.get('activity_id');
        if (activity_id) {
            query.activity_id = activity_id;
        }
        return query;
    };

    VoucherOrderListModel.prototype.prepareQuery = function (query) {
        if (query.status) {
            query.status = query.status.split(',');
        }
        return query;
    };


    // return模块
    require('er/util').inherits(VoucherOrderListModel, ListModel);
    return VoucherOrderListModel;
});

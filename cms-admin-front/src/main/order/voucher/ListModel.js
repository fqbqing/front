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
    function OrderVoucherListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.voucherOrderList;

    }


    /**
     * @inheritDoc
     */
    OrderVoucherListModel.prototype.datasource = {
        voucherOrderStatus: function (){
            return constants.VOUCHER_ORDER_STATUS;
        },
        vouchers: function (model){
            if(model.get('activity_id')){
                return api.getVoucherActivityById({
                    id: model.get('activity_id')
                }).then(function (data) {
                    return data.vouchers;
                });
            }
        },
        exportUrl: function (model) {
            var param = {
                activity_id: model.get('activity_id') ? model.get('activity_id') : ''
            };
            if (model.get('status')) {
                param.status = model.get('status').split(',');
            }
            if (model.get('phone')) {
                param.phone = model.get('phone');
            }
            if(model.get('voucher_id')){
                param.voucher_id = model.get('voucher_id');
            }
            return $.param(param);
        }
    };

    /**
     * @inheritDoc
     */
    // OrderVoucherListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrderVoucherListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    OrderVoucherListModel.prototype.getExtraQuery = function () {
        var param = {};
        if (this.get('activity_id')) {
            param.activity_id = this.get('activity_id');
        }
        return param;
    };

    OrderVoucherListModel.prototype.prepareQuery = function (query) {
        if (query.status) {
            query.status = query.status.split(',');
        }
        return query;
    };

    // return模块
    require('er/util').inherits(OrderVoucherListModel, ListModel);
    return OrderVoucherListModel;
});

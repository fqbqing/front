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
    var $ = require('jquery');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrderTuanListModel() {
        ListModel.apply(this, arguments);
        // 列表请求器 (*)
        this.listRequester = api.listTuanOrder;

}

    /**
     * @inheritDoc
     */
    OrderTuanListModel.prototype.datasource = {
        tuanOrderStatus: function() {
            return cons.TUAN_ORDER_STATUS_LIST;
        },
        tuanInfo: function (model) {
            if (model.get('tuan_id')) {
                return api.getTuanById({
                    id: model.get('tuan_id')
                });
            }
        },
        //tuanArr: function() {
        //    return api.tuanTitles();
        //},
        exportUrl: function (model) {
            var param = {
                tuan_id: model.get('tuan_id') ? model.get('tuan_id') : '',
                status: model.get('status') ? model.get('status').split(',') : [],
                exclude: model.get('exclude') ? model.get('exclude') : ''
            };
            if (model.get('phone')) {
                param.phone = model.get('phone');
            }
            return $.param(param);
        }
    };

    /**
     * @inheritDoc
     */
    // OrderTuanListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrderTuanListModel.prototype.defaultArgs = {
        tuan_id : '',  //团购ID
        status: '' , //筛选的订单状态
        pageNo : 1,
        pageSize : 15
    };

    OrderTuanListModel.prototype.getExtraQuery = function () {
        var param = {};
        if (this.get('claimed')) {
            param.claimed = this.get('claimed');
        }
        return param;

    };

    /**
     * 默认查询参数
     *
     * 参考{@link ListModel#defaultArgs}属性的说明
     *
     * @return {Object}
     * @protected
     */
    OrderTuanListModel.prototype.prepareQuery = function (query) {
        if (query.status) {
            query.status = query.status.split(',');
        }
        return query;
    };

   /* OrderTuanListModel.prototype.deleteTuanOrder = function (ids) {
        return api.deleteTuanOrder({
            id: ids
        });
    };*/
     OrderTuanListModel.prototype.searchTuanOrder = function (obj) {
        return api.searchTuanOrder({
            phone: obj.phone
        });
    };
    OrderTuanListModel.prototype.checkSale = function (obj) {
        return api.checkTuanOrder({
            cn: obj.cn
        });
    };
    OrderTuanListModel.prototype.refund = function (obj) {
        return api.refundTuanOrder({
            order_id: obj.order_id
        });
    };

    // return模块
    require('er/util').inherits(OrderTuanListModel, ListModel);
    return OrderTuanListModel;
});

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
    function OrderExihibitionListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)

        this.listRequester = api.listExhibitionOrder;
    }


    /**
     * @inheritDoc
     */
    OrderExihibitionListModel.prototype.datasource = {
        exhibitionStatus: function() {
            return cons.EXHIBITION_STATUS;
        },
        exhibitionInfo: function (model) {
            if (model.get('exhibition_coupon_activity_id')) {
                return api.getExhibitionById({
                    id: model.get('exhibition_coupon_activity_id')
                });
            }
        },
    };

    /**
     * @inheritDoc
     */
    // OrderExihibitionListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrderExihibitionListModel.prototype.defaultArgs = {
        exhibition_coupon_activity_id : '',  // 车展ID
        status: '' , //筛选的订单状态
        order: 'desc',
        pageSize: 15
    };
    OrderExihibitionListModel.prototype.getExtraQuery = function () {
        var ret = {};
        if (this.get('exhibition_coupon_activity_id')) {
            ret.exhibition_coupon_activity_id = this.get('exhibition_coupon_activity_id');
        }
        return ret;
    };

    // return模块
    require('er/util').inherits(OrderExihibitionListModel, ListModel);
    return OrderExihibitionListModel;
});

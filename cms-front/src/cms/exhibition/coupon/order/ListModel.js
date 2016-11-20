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
    var constants = require('common/constants');
    var $ = require('jquery');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function ExhibitionCouponOrderListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.listExhibitionOrder;
    }


    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderListModel.prototype.datasource = {
        exhibitionStatus: function() {
            return constants.EXHIBITION_STATUS_LIST;
        }
    };

    /**
     * @inheritDoc
     */
    // ExhibitionCouponOrderListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderListModel.prototype.defaultArgs = {
        exhibition_id : '',  //车展ID
        status: '' , //筛选的订单状态
        order: 'desc',
        pageSize: 15
    };
    ExhibitionCouponOrderListModel.prototype.getExtraQuery = function () {
        var param = {};
        if (this.get('claimed')) {
            param.claimed = this.get('claimed');
        }
        return param;
    };

    // return模块
    require('er/util').inherits(ExhibitionCouponOrderListModel, ListModel);
    return ExhibitionCouponOrderListModel;
});

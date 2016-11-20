/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var  consts = require('common/constants');
    var $ = require('jquery');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function OrderGrouponListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.grouponSignupList;
    }


    /**
     * @inheritDoc
     */
    OrderGrouponListModel.prototype.datasource = {
        grouponStatus: function() {
            return consts.VOUCHER_ORDER_STATUS;
        },
        groupon: function (model) {
            if (model.get('activity_id')) {
                return api.getGrouponById({
                    id: model.get('activity_id')
                });
            }
            return null;
        },
        exportUrl: function (model) {
            var param = {
                activity_id: model.get('activity_id') ? model.get('activity_id') : '',
                order_status: model.get('order_status') ? model.get('order_status') : ''
            };
            if(model.get('phone')){
                param.phone = model.get('phone');
            }
            if(model.get('exclude')){
                param.exclude = model.get('exclude');
            }
            return $.param(param);
        }
    };

    /**
     * @inheritDoc
     */
    // OrderGrouponListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    OrderGrouponListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    // return模块
    require('er/util').inherits(OrderGrouponListModel, ListModel);
    return OrderGrouponListModel;
});

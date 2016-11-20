/**
 * @file [Please Input File Description]
 * @author lifayu(lifayu@babamaiche.com)
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var  constants = require('common/constants');
    var $ = require('jquery');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function GrouponSignupListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listGrouponSignup;
    }


    /**
     * @inheritDoc
     */
    GrouponSignupListModel.prototype.datasource = {
        grouponStatus: function() {
            return constants.ORDER_STATUS_LIST;
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
                order_status: model.get('order_status') ? model.get('order_status') : '',
                exclude: model.get('exclude') ? model.get('exclude') : ''
            };
            if (model.get('phone')) {
                param.phone = model.get('phone');
            }
            return $.param(param);
        }
    };

    GrouponSignupListModel.prototype.checkSale = function (cn) {
        return api.voucherOrderCheckSale({
            cn: cn
        });
    };
    GrouponSignupListModel.prototype.makeDeal = function (e) {
        return api.voucherOrderMakeDeal({
            id: e.id
        });
    };


    GrouponSignupListModel.prototype.refundOnline = function (order_ids) {
        return api.refundOnline({
            order_ids: order_ids
        });
    };

    GrouponSignupListModel.prototype.refundOffline = function (order_id) {
        return api.refundOffline({
            order_id: order_id
        });
    };

    /**
     * @inheritDoc
     */
    // GrouponSignupListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    GrouponSignupListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };


    // return模块
    require('er/util').inherits(GrouponSignupListModel, ListModel);
    return GrouponSignupListModel;
});

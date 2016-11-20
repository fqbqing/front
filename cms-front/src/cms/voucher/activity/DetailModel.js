/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var constants = require('common/constants');
    var user = require('bat-ria/system/user');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherActivityDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    VoucherActivityDetailModel.prototype.datasource = {
        voucher_activity: function (model) {
            return api.getVoucherActivityById({
                id: model.get('id')
            });
        },
        voucher_order_status: function () {
            return constants.ORDER_STATUS_LIST;
        },
        channels: function (model) {
            return api.voucherChannelStatistics({
                id: model.get('id')
            });
        },
        activity_statistics: function (model) {
            return api.voucherClaimedStatistics({
                id: model.get('id')
            });
        },
        shareLink: function (model) {
            return constants.C_URL + '/activity/coupon/'+model.get('id')+'.html?source=' + user.visitor.source;
        },
        constants: function () {
            return constants;
        }
    };
    VoucherActivityDetailModel.prototype.voucherChannelStatistics = function (e) {
        return api.voucherChannelStatistics({
            id: this.get('id'),
            status: e.status
        });
    };


    // return模块
    require('er/util').inherits(VoucherActivityDetailModel, BaseModel);
    return VoucherActivityDetailModel;
});

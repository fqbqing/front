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

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function ExhibitionCouponActivityDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityDetailModel.prototype.datasource = {
        exhibition: function (model) {
            return api.getExhibitionById({
                id: model.get('exhibition_id')
            });
        },
        exibihitionStatus: function () {
            return constants.EXHIBITION_STATUS_LIST;
        },
        statOrder: function (model) {
            return api.statExhibitionOrder({
                exhibition_coupon_activity_id: model.get('exhibition_id')
            });
        },
        channels: function (model) {
            return api.statExhibitionChannel({
                exhibition_coupon_activity_id: model.get('exhibition_id')
            })
        }
    };

    ExhibitionCouponActivityDetailModel.prototype.statExhibitionChannel = function (e) {
        return api.statExhibitionChannel({
            exhibition_coupon_activity_id: e.exhibition_coupon_activity_id,
            status: e.status

        });
    };
    // return模块
    require('er/util').inherits(ExhibitionCouponActivityDetailModel, BaseModel);
    return ExhibitionCouponActivityDetailModel;
});

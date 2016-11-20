/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function ExhibitionCouponOrderDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    ExhibitionCouponOrderDetailModel.prototype.datasource = {
        orderInfo: function (model) {
            return  api.getExhibitionOrderById({
                order_id: model.get('order_id')
            });
        }
    };


    // return模块
    require('er/util').inherits(ExhibitionCouponOrderDetailModel, BaseModel);
    return ExhibitionCouponOrderDetailModel;
});

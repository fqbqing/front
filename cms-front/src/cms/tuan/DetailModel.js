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
    function TuanDetailModel() {
        BaseModel.apply(this, arguments);
    }


    /**
     * @inheritDoc
     */
    TuanDetailModel.prototype.datasource = {
        tuan: function (model) {
            return api.getTuanById({
                id: model.get('tuan_id')
            });
        },
        tuanOrderStatus: function () {
            return constants.TUAN_ORDER_STATUS_LIST;
        },
        statOrder: function (model) {
            return api.statTuanOrder({
                tuan_id: model.get('tuan_id')
            });
        },
        statIntention: function (model) {
            return api.statTuanOrderIntention({
                tuan_id: model.get('tuan_id')
            });
        },
        statDealModel: function (model) {
            return api.statTuanDealModel({
                tuan_id: model.get('tuan_id')
            });
        },
        channels: function (model) {
            return api.statTuanChannel({
                tuan_id: model.get('tuan_id')
            });
        },
        shareLink: function (model) {
            return constants.C_URL + '/tuan/index?tuanId='+ model.get('tuan_id') +'&source=' + user.visitor.source;
        },
        constants: function () {
            return constants;
        }
    };

    TuanDetailModel.prototype.statTuanChannel = function (e) {
        return api.statTuanChannel({
            tuan_id: e.tuan_id,
            status: e.status

        });
    };



    // return模块
    require('er/util').inherits(TuanDetailModel, BaseModel);
    return TuanDetailModel;
});

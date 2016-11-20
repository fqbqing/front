/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function ExhibitionCouponActivityListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listExhibition;
    }


    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // ExhibitionCouponActivityListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    ExhibitionCouponActivityListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };
    ExhibitionCouponActivityListModel.prototype.shareExhibitionQrcode = function (e) {
        return api.shareExhibitionQrcode({
            id: e.id
        });
    };

    // return模块
    require('er/util').inherits(ExhibitionCouponActivityListModel, ListModel);
    return ExhibitionCouponActivityListModel;
});

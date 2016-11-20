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
    function VoucherActivityListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.listVoucherActivity;
    }


    /**
     * @inheritDoc
     */
    VoucherActivityListModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // VoucherActivityListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    VoucherActivityListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15
    };

    VoucherActivityListModel.prototype.deleteVoucherActivity = function (ids) {
        return api.deleteVoucherActivity({
            id: ids
        });
    };
    VoucherActivityListModel.prototype.commitVoucherActivity = function (e) {
        return api.commitVoucherActivity({
            id: e.id,
            status: e.status
        });
    };

    // return模块
    require('er/util').inherits(VoucherActivityListModel, ListModel);
    return VoucherActivityListModel;
});

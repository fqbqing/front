/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var ListModel = require('bat-ria/mvc/ListModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./config');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherListModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
        this.listRequester = api.voucherList;

    }


    /**
     * @inheritDoc
     */
    VoucherListModel.prototype.datasource = {
    };

    /**
     * @inheritDoc
     */
    // VoucherListModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    VoucherListModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 15,
        type: config.VOUCHER_TYPE_COMMON
    };
    VoucherListModel.prototype.deleteVoucher = function (ids) {
        return api.deleteVoucher({
            id: ids
        });
    };


    // return模块
    require('er/util').inherits(VoucherListModel, ListModel);
    return VoucherListModel;
});

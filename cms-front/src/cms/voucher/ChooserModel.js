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
    function VoucherChooserModel() {
        ListModel.apply(this, arguments);

        // 列表请求器 (*)
         this.listRequester = api.voucherList;
    }


    /**
     * @inheritDoc
     */
    VoucherChooserModel.prototype.datasource = null;

    /**
     * @inheritDoc
     */
    // VoucherChooserModel.prototype.defaultTimeRange = batUtil.getTimeRange();

    /**
     * @inheritDoc
     */
    VoucherChooserModel.prototype.defaultArgs = {
        order: 'desc',
        pageSize: 10
    };


    // return模块
    require('er/util').inherits(VoucherChooserModel, ListModel);
    return VoucherChooserModel;
});

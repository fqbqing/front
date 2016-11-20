/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherDetailModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
         this.formRequester = api.getVoucherById;

        // 表单提交请求器 (*)
        // this.submitRequester = api.someUpdate;
    }


    /**
     * @inheritDoc
     */
    VoucherDetailModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    VoucherDetailModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherDetailModel.prototype.getExtraData = function () {
        return {};
    };

    // return模块
    require('er/util').inherits(VoucherDetailModel, FormModel);
    return VoucherDetailModel;
});

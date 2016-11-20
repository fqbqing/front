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
    function VoucherActivityEditBaseModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getVoucherActivityById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateVoucherActivity;
    }


    /**
     * @inheritDoc
     */
    VoucherActivityEditBaseModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/voucher_activity_1.png');
        }
    };


    /**
     * @inheritDoc
     */
    VoucherActivityEditBaseModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditBaseModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            stage: 'base',
            share_image_url: this.get('formData').share_image_url,
            page_title: ''
        };
    };

    VoucherActivityEditBaseModel.prototype.filterData = function(data) {
        return data;
    };

    // return模块
    require('er/util').inherits(VoucherActivityEditBaseModel, FormModel);
    return VoucherActivityEditBaseModel;
});

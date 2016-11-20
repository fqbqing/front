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
    function VoucherActivityAddModel() {
        FormModel.apply(this, arguments);
        // 表单提交请求器 (*)
        this.submitRequester = api.addVoucherActivity;
    }


    /**
     * @inheritDoc
     */
    VoucherActivityAddModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/voucher_activity_1.png');
        }
    };


    /**
     * @inheritDoc
     */
    VoucherActivityAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityAddModel.prototype.getExtraData = function () {
        return {
            stage: 'base',
            share_image_url: this.get('formData').share_image_url,
            page_title: ''
        };
    };

    // return模块
    require('er/util').inherits(VoucherActivityAddModel, FormModel);
    return VoucherActivityAddModel;
});

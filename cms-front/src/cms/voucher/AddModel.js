/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var utils = require('common/utils');
    var config = require('./config');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherAddModel() {
        FormModel.apply(this, arguments);

        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getVoucherById;
            // 表单提交请求器 (*)
            this.submitRequester = api.updateVoucher;
        }
        else {
            // 表单提交请求器 (*)
            this.submitRequester = api.addVoucher;
        }

    }


    /**
     * @inheritDoc
     */
    VoucherAddModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/voucher.png');
        },
        config: function () {
            return config;
        }
    };


    /**
     * @inheritDoc
     */
    VoucherAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherAddModel.prototype.getExtraData = function () {
        var param = {
            image_url: this.get('formData').image_url
        };
        if(this.get('id')) {
            param.id = this.get('id');
        }
        return param;
    };

    VoucherAddModel.prototype.filterData = function (data) {
        if(data.type){
            data.type = data.type[0];
        }
        if (data.islimited && data.islimited.join('') == config.LIMITED_YES) {
            data.start_time = moment(data.start_time).unix();
            data.end_time = moment(data.end_time).add(1, 'days').unix() - 1;
        }
        else {
            data.start_time = 0;
            data.end_time = 0;
        }
        data.amount = utils.roundAmount(data.amount);
        if(!data.count) {
            data.count = -1;
        }

        delete data.ispay;
        delete data.islimited;
        return data;
    };


    // return模块
    require('er/util').inherits(VoucherAddModel, FormModel);
    return VoucherAddModel;
});

/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var moment = require('moment');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherActivityEditSetModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getVoucherActivityById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateVoucherActivity;
    }


    /**
     * @inheritDoc
     */
    VoucherActivityEditSetModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/voucher_activity_3.png');

        }
    };


    /**
     * @inheritDoc
     */
    VoucherActivityEditSetModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditSetModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            stage: 'rule'
        };
    };


    VoucherActivityEditSetModel.prototype.filterData = function(data) {
        data.start_time = moment(data.start_time).unix();
        data.end_time = moment(data.end_time).unix();
        return data;
    };


    // return模块
    require('er/util').inherits(VoucherActivityEditSetModel, FormModel);
    return VoucherActivityEditSetModel;
});

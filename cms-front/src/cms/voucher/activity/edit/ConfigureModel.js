/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var u = require('underscore');


    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function VoucherActivityEditConfigureModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
         this.formRequester = api.getVoucherActivityById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateVoucherActivity;

    }


    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/voucher_activity_4.png');
        }
    };


    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    VoucherActivityEditConfigureModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            stage: 'voucher'
        };
    };

    VoucherActivityEditConfigureModel.prototype.filterData = function(data) {

        //data.vouchers = [];
        //if (data.voucher_id) {
        //    if (typeof data.voucher_id != 'object') {
        //        var voucher_id = data.voucher_id;
        //        data.voucher_id = [];
        //        data.voucher_id.push(voucher_id);
        //    }
        //    u.each(data.voucher_id,function(item){
        //        data.vouchers.push({
        //            voucher_id: item
        //        })
        //    });
        //    delete data.voucher_id;
        //}
        var vouchers = u.map(data.vouchers, function (voucher) {
            return {
                voucher_id: voucher.id
            };
        });

        data.vouchers = JSON.stringify(vouchers);
        return data;
    };

    // return模块
    require('er/util').inherits(VoucherActivityEditConfigureModel, FormModel);
    return VoucherActivityEditConfigureModel;
});

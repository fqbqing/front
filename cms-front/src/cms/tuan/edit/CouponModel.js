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

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function TuanEditCouponModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        this.formRequester = api.getTuanById;

        // 表单提交请求器 (*)
        this.submitRequester = api.updateTuan;
    }


    /**
     * @inheritDoc
     */
    TuanEditCouponModel.prototype.datasource = {
        exampleImg:  function(){
            return require.toUrl('common/img/example-5.png');
        }
    };


    /**
     * @inheritDoc
     */
    TuanEditCouponModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    TuanEditCouponModel.prototype.getExtraData = function () {
        return {
            id: this.get('id'),
            type: 'coupon'
        };
    };
    TuanEditCouponModel.prototype.filterData = function(data) {
        delete data.refund;
        data.amount = utils.roundAmount(data.amount);
        return data;
    };
    // return模块
    require('er/util').inherits(TuanEditCouponModel, FormModel);
    return TuanEditCouponModel;
});

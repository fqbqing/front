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
    function OrderTuanCheckModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;
        // 表单提交请求器 (*)
        // this.submitRequester = api.someUpdate;
        if (this.get('checkType') === 'deal') {
            this.submitRequester = api.dealTuanOrder;
        }
        else if (this.get('checkType') === 'checkSale') {
            this.submitRequester = api.checkTuanOrder;
        }
    }

    /**
     * @inheritDoc
     */
    OrderTuanCheckModel.prototype.datasource = {
        order: function (model) {
            return api.getTuanOrderById({
                order_id: model.get('orderId')
            })
        }
    };


    /**
     * @inheritDoc
     */
    OrderTuanCheckModel.prototype.getDefaultArgs = function () {
        return {
        };
    };

    /**
     * @inheritDoc
     */
    OrderTuanCheckModel.prototype.getExtraData = function () {
        return {};
    };

    OrderTuanCheckModel.prototype.filterData = function(data) {
        data.deal_model = data.deal_model.join(',');
        data.order_id = this.get('orderId');
        return data;
    };

    // return模块
    require('er/util').inherits(OrderTuanCheckModel, FormModel);
    return OrderTuanCheckModel;
});

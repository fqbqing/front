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
    function ActivityAddModel() {
        FormModel.apply(this, arguments);

        if (this.get('id')) {
            // 表单数据请求器
            this.formRequester = api.getActivityById;

            // 表单提交请求器 (*)
            this.submitRequester = api.updateActivity;
        }
        else {
            // 表单提交请求器 (*)
            this.submitRequester = api.addActivity;
        }
    }


    /**
     * @inheritDoc
     */
    ActivityAddModel.prototype.datasource = {

    };


    /**
     * @inheritDoc
     */
    ActivityAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    ActivityAddModel.prototype.getExtraData = function () {
        var data = {
            image_default_id: this.get('formData').image_default_id
        };
        if (this.get('id')) {
            data.id = this.get('id');
        }
        return data;
    };

    ActivityAddModel.prototype.filterData = function(data) {
        var price_strategy = [];
        price_strategy.push({
            "target": "price",
            "operator": data.amountType,
            "param": data.amount * 100,
            "newField": "amount"
        });
        price_strategy.push({
            "target": "price",
            "operator": data.depositType,
            "param": data.deposit * 100,
            "newField": "deposit"
        });
        data.price_strategy = JSON.stringify(price_strategy);
        delete data.deposit;
        delete data.depositType;
        delete data.amount;
        delete data.amountType;

        return data;
    };

    // return模块
    require('er/util').inherits(ActivityAddModel, FormModel);
    return ActivityAddModel;
});

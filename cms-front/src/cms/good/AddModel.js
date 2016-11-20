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
    function GoodAddModel() {
        FormModel.apply(this, arguments);

        if (this.get('id')) {
            // 表单数据请求器
            this.formRequester = api.getGoodById;

            // 表单提交请求器 (*)
            this.submitRequester = api.updateGood;
        }
        else {
            // 表单提交请求器 (*)
            this.submitRequester = api.addGood;
        }
    }


    /**
     * @inheritDoc
     */
    GoodAddModel.prototype.datasource = {
        //categories: function (model) {
        //    return api.listCategory();
        //},
        editorOptions: function () {
            return require('common/ueditorConfig').editorOptions;
        }
    };


    /**
     * @inheritDoc
     */
    GoodAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    GoodAddModel.prototype.filterData = function(data) {
        data.marketable = data.marketable.join(',');
        data.market_price = data.market_price * 100;
        data.low_price = data.low_price * 100;
        data.high_price = data.high_price * 100;
        return data;
    };

    /**
     * @inheritDoc
     */
    GoodAddModel.prototype.getExtraData = function () {
        var data = {};
        if (this.get('id')) {
            data.id = this.get('id');
        }
        return data;
    };

    // return模块
    require('er/util').inherits(GoodAddModel, FormModel);
    return GoodAddModel;
});

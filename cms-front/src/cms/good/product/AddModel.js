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
    function GoodProductAddModel() {
        FormModel.apply(this, arguments);

        // 表单数据请求器
        // this.formRequester = api.someDetail;

        // 表单提交请求器 (*)
         this.submitRequester = api.addProduct;
    }


    /**
     * @inheritDoc
     */
    GoodProductAddModel.prototype.datasource = {
        good: function (model) {
            var good_id = model.get('good_id');
            if (good_id) {
                return api.getGoodById({
                    id: good_id
                });
            }
            return {};
        }
    };


    /**
     * @inheritDoc
     */
    GoodProductAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    GoodProductAddModel.prototype.getExtraData = function () {
        return {};
    };
    GoodProductAddModel.prototype.filterData = function(data) {
        data.price = data.price * 100;
        return data;
    };
    GoodProductAddModel.prototype.getSpecValues = function (specid) {
        return api.listSpecificationValues({
            specification_id: specid
        });
    };

    // return模块
    require('er/util').inherits(GoodProductAddModel, FormModel);
    return GoodProductAddModel;
});

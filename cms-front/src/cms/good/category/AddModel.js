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
    function GoodCategoryAddModel() {
        FormModel.apply(this, arguments);

        if (this.get('id')) {
            // 表单数据请求器
            this.formRequester = api.getCategoryById;

            // 表单提交请求器 (*)
            this.submitRequester = api.updateCategory;
        }
        else {
            this.submitRequester = api.addCategory;
        }
    }


    /**
     * @inheritDoc
     */
    GoodCategoryAddModel.prototype.datasource = null;


    /**
     * @inheritDoc
     */
    GoodCategoryAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    GoodCategoryAddModel.prototype.getExtraData = function () {
        var data = {
            image_id: this.get('image_id') || this.get('formData').image_id
        };
        if (this.get('id')) {
            data.id = this.get('id');
            data.parent_id = this.get('formData').parent_id;
        }
        else {
            data.parent_id = this.get('parent_id') || 0;
        }
        return data;
    };

    // return模块
    require('er/util').inherits(GoodCategoryAddModel, FormModel);
    return GoodCategoryAddModel;
});

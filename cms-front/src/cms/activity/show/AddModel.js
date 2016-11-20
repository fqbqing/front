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
    function ActivityShowAddModel() {
        FormModel.apply(this, arguments);

        if (this.get('id')) {
            // 表单数据请求器
            this.formRequester = api.getActivityShowById;

            // 表单提交请求器 (*)
            this.submitRequester = api.updateActivityShow;
        }
        else {
            // 表单提交请求器 (*)
            this.submitRequester = api.addActivityShow;
        }
    }


    /**
     * @inheritDoc
     */
    ActivityShowAddModel.prototype.datasource = {

    };


    /**
     * @inheritDoc
     */
    ActivityShowAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */

    ActivityShowAddModel.prototype.getExtraData = function () {
        var data = {};
        if (this.get('id')) {
            data.image = this.get('formData').activity.image_default_id;
            data.activity_id = this.get('formData').activity.id;
            data.id = this.get('formData').id;
        }else{
            data.image = this.get('image');
            data.activity_id = this.get('activity_id');
        }
        return data;
    }
    // return模块
    require('er/util').inherits(ActivityShowAddModel, FormModel);
    return ActivityShowAddModel;
});

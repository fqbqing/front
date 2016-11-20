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
    function StaffGroupAddModel() {
        FormModel.apply(this, arguments);
        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getStaffGroupById;
            // 表单提交请求器 (*)
            this.submitRequester = api.editStaffGroup;
        }
        else{
            // 表单提交请求器 (*)
            this.submitRequester = api.addStaffGroup;
        }
    }


    /**
     * @inheritDoc
     */
    StaffGroupAddModel.prototype.datasource = {
        //userGroup: function (model) {
        //    return api.listStaffGroup({
        //        pageNo: 1,
        //        pageSize: 10000
        //    }).then(function (page) {
        //        return page.data;
        //    });
        //}
    };


    /**
     * @inheritDoc
     */
    StaffGroupAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    /**
     * @inheritDoc
     */
    StaffGroupAddModel.prototype.getExtraData = function () {
        var data = {};
        if(this.get('id')){
            data.id = this.get('id');
        }
        else{
            data.parent_id = this.get('selectedGroup').id
        }
        return data;
    };

    // return模块
    require('er/util').inherits(StaffGroupAddModel, FormModel);
    return StaffGroupAddModel;
});

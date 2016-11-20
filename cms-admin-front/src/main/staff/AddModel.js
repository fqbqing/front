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
    function StaffAddModel() {
        FormModel.apply(this, arguments);

        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getStaffById;
            // 表单提交请求器 (*)
            this.submitRequester = api.editStaff;
        }
        else{
            // 表单提交请求器 (*)
            this.submitRequester = api.addStaff;
        }
    }


    /**
     * @inheritDoc
     */
    StaffAddModel.prototype.datasource = {
        inCharge:function () {
            return [
                {
                    id: 1,
                    name: '是'
                },
                {
                    id: 0,
                    name: '否'
                }
            ]
        }
    };


    /**
     * @inheritDoc
     */
    StaffAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };

    StaffAddModel.prototype.filterData = function(data) {
        if(!this.get('id')){
            data.staff_group_id = this.get('selectedGroup').id;
        }
        else {
            data.id = this.get('id');
        }
        data.in_charge = data.in_charge.join(',');
        return data;
    };

    /**
     * @inheritDoc
     */
    StaffAddModel.prototype.getExtraData = function () {
        return {};
    };

    // return模块
    require('er/util').inherits(StaffAddModel, FormModel);
    return StaffAddModel;
});

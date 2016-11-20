/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var FormModel = require('bat-ria/mvc/FormModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');
    var config = require('./config');
    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function AccessUserAddModel() {
        FormModel.apply(this, arguments);
        if(this.get('id')){
            // 表单数据请求器
            this.formRequester = api.getUserById;
            // 表单提交请求器 (*)
            this.submitRequester = api.editAccessUser;
        }else{
            // 表单提交请求器 (*)
            this.submitRequester = api.addAccessUser;
        }
    }


    /**
     * @inheritDoc
     */
    AccessUserAddModel.prototype.datasource = {
        userGroup: function () {
            //return api.userGroup();
            return  api.listAccessGroup({
                pageNo: 1,
                pageSize: 10000
            }).then(function (page) {
                return page.data;
            });
        },
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
    AccessUserAddModel.prototype.getDefaultArgs = function () {
        return {
            id: this.get('id')
        };
    };
    AccessUserAddModel.prototype.filterData = function(data) {
        if(!this.get('id')){
            data.group_id = this.get('selectedGroup').id;
        }
        else {
            data.id = this.get('id');
        }
        data.in_charge = data.in_charge.join(',');
        return data;
    };

    // return模块
    require('er/util').inherits(AccessUserAddModel, FormModel);
    return AccessUserAddModel;
});

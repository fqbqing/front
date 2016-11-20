/**
 * @file [Please Input File Description]
 * @author ()
 */

define(function (require) {
    var BaseModel = require('bat-ria/mvc/BaseModel');
    var datasource = require('er/datasource');
    var api = require('common/config').api;
    var batUtil = require('bat-ria/util');

    var u = require('underscore');

    /**
     * [Please Input Model Description]
     *
     * @constructor
     */
    function StaffRoleDistributeGroupModel() {
        BaseModel.apply(this, arguments);
    }

    function adaptData(data) {
        var page = data;
        page.tableData = page.result || page.data;
        delete page.result;
        delete page.data;
        return page;
    }

    /**
     * @inheritDoc
     */
    StaffRoleDistributeGroupModel.prototype.datasource = {
        roles: function (model) {
            return api.getStaffGroupRoles({
                id: model.get('id')
            }).then(function (data) {
                var arr = [];
                u.each(data, function (name, id) {
                    arr.push({
                        id: id,
                        name: name
                    });
                });
                return arr;
            });
        },
        listPage: {
            retrieve: function (model) {
                return api.listStaffRole({
                    pageNo: 1,
                    pageSize: 100
                }).then(adaptData);
            },
            dump: true
        },
        group: function (model) {
            return api.getStaffGroupById({
                id: model.get('id')
            }).then(function (data) {
                return data;
            });
        }
    };

    StaffRoleDistributeGroupModel.prototype.saveRole = function () {
        var roles = this.get('roles');
        return api.updateStaffGroupRoles({
            id: this.get('id'),
            roleIds: u.pluck(roles, 'id').join(',')
        });
    };

    // return模块
    require('er/util').inherits(StaffRoleDistributeGroupModel, BaseModel);
    return StaffRoleDistributeGroupModel;
});

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
    function StaffRoleDistributeUserModel() {
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
    StaffRoleDistributeUserModel.prototype.datasource = {
        roles: function (model) {
            return api.getStaffRoles({
                id: model.get('id')
            }).then(function (data) {
                var ret = {};
                u.each(data, function (list, key) {
                    var arr = [];
                    u.each(list, function (name, id) {
                        arr.push({
                            id: id,
                            name: name
                        });
                    });
                    ret[key] = arr;
                });
                return ret;
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
        user: function (model) {
            return api.getStaffById({
                id: model.get('id')
            }).then(function (data) {
                return data;
            });
        }
    };

    StaffRoleDistributeUserModel.prototype.saveRole = function () {
        var roles = this.get('roles').staff;
        return api.updateStaffRoles({
            id: this.get('id'),
            roleIds: u.pluck(roles, 'id').join(',')
        });
    };

    // return模块
    require('er/util').inherits(StaffRoleDistributeUserModel, BaseModel);
    return StaffRoleDistributeUserModel;
});

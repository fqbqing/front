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
    function AccessGroupRoleModel() {
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
    AccessGroupRoleModel.prototype.datasource = {
        roles: function (model) {
            return api.getUserGroupRoles({
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
                return api.listRole({
                    pageNo: 1,
                    pageSize: 10
                }).then(adaptData);
            },
            dump: true
        },
        group: function (model) {
            return api.getAccessGroupById({
                id: model.get('id')
            }).then(function (data) {
                return data;
            });
        }
    };

    AccessGroupRoleModel.prototype.saveRole = function () {
        var roles = this.get('roles');
        return api.updateUserGroupRoles({
            id: this.get('id'),
            roleIds: u.pluck(roles, 'id').join(',')
        });
    };

    AccessGroupRoleModel.prototype.getRoleList = function (query) {
        return api.listRole(query);
    };


    // return模块
    require('er/util').inherits(AccessGroupRoleModel, BaseModel);
    return AccessGroupRoleModel;
});
